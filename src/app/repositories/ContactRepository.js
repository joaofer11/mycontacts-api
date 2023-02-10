const db = require('../../database')

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    
    const rows = await db.query(`
      SELECT *, BIN_TO_UUID(id) AS id
      FROM contacts ORDER BY name ${direction}
    `)
    
    return rows
  }
  
  async findById(id) {
    const [row] = await db.query(`
      SELECT *, BIN_TO_UUID(id) AS id 
      FROM contacts
      WHERE id = UUID_TO_BIN(?)
    `,
      [id]
    )
    
    return row
  }
  
  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT *, BIN_TO_UUID(id) AS id
      FROM contacts
      WHERE email = ?
    `,
      [email]
    )
    
    return row
  }
  
  async create({ name, email, phone, category_id }) {
    const [, rows] = await db.query(`
      INSERT INTO contacts (name, email, phone, category_id) 
      VALUES (?, ?, ?, ?);
      SELECT BIN_TO_UUID(id) AS id FROM contacts ORDER BY id DESC LIMIT 1
    `,
      [name, email, phone, category_id ?? null]
    )
    
    return {
      id: rows[0].id,
      name,
      email,
      phone,
      category_id,
    }
  }
  
  async update(id, data) {
    const { name, email, phone, category_id } = data
    
    db.query(`
      UPDATE contacts SET
      name = ?,
      email = ?,
      phone = ?,
      category_id = ?
      WHERE id = UUID_TO_BIN(?)
    `,
      [name, email, phone, category_id, id]
    )
    
    return {
      id,
      name,
      email,
      phone,
      category_id
    }
  }
  
  delete(id) {
    db.query('DELETE FROM contacts WHERE id = UUID_TO_BIN(?)', [id])
  }
}

exports.ContactRepository = new ContactRepository()
