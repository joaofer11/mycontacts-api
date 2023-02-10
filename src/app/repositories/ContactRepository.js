const db = require('../../database')

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    
    const rows = await db.query(`
      SELECT contacts.*, BIN_TO_UUID(contacts.id) AS id,
      BIN_TO_UUID(contacts.category_id) AS category_id,
      categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}
    `)
    
    return rows
  }
  
  async findById(id) {
    const [row] = await db.query(`
      SELECT contacts.*, BIN_TO_UUID(contacts.id) AS id,
      BIN_TO_UUID(contacts.category_id) AS category_id,
      categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = UUID_TO_BIN(?)
    `,
      [id]
    )
    
    return row
  }
  
  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT contacts.*, BIN_TO_UUID(contacts.id) AS id,
      BIN_TO_UUID(contacts.category_id) AS category_id,
      categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.email = ?
    `,
      [email ?? 'DEFAULT']
    )
    
    return row
  }
  
  async create({ name, email, phone, category_id }) {
    await db.query(`
      INSERT INTO contacts (name, email, phone, category_id) 
      VALUES (?, ?, ?, ?)
    `,
      [name, email, phone, category_id ?? null]
    )
    
    return await this.findByEmail(email)
  }
  
  async update(id, data) {
    const { name, email, phone, category_id } = data
    
    await db.query(`
      UPDATE contacts SET
      name = ?,
      email = ?,
      phone = ?,
      category_id = ?
      WHERE id = UUID_TO_BIN(?)
    `,
      [name, email ?? null, phone ?? null, category_id ?? null, id]
    )
    
    return await this.findById(id)
  }
  
  delete(id) {
    db.query('DELETE FROM contacts WHERE id = UUID_TO_BIN(?)', [id])
  }
}

exports.ContactRepository = new ContactRepository()
