const db = require('../../database')

const { v4 } = require('uuid')

let contacts = [
  {
    id: v4(),
    name: 'João',
    email: 'joaofer@gmail.com',
    phone: '838288228',
    category_id: v4()
  }
]

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    
    const { rows } = await db.query(`
      SELECT *, BIN_TO_UUID(id) AS id
      FROM contacts ORDER BY name ${direction}
    `)
    
    return rows
  }
  
  async findById(id) {
    const { rows } = await db.query(`
      SELECT *, BIN_TO_UUID(id) AS id 
      FROM contacts
      WHERE id = UUID_TO_BIN(?)
    `,
      [id]
    )
    
    return rows[0]
  }
  
  async findByEmail(email) {
    const { rows } = await db.query(`
      SELECT *, BIN_TO_UUID(id) AS id
      FROM contacts
      WHERE email = ?
    `,
      [email]
    )
    
    return rows[0]
  }
  
  async create({ name, email, phone, category_id }) {
    const { rows } = await db.query(`
      INSERT INTO contacts (name, email, phone, category_id) 
      VALUES (?, ?, ?, ?);
      SELECT BIN_TO_UUID(id) AS id FROM contacts ORDER BY id DESC LIMIT 1
    `,
      [name, email, phone, category_id ?? null]
    )
    
    return {
      id: rows[1][0].id,
      name,
      email,
      phone,
      category_id,
    }
  }
  
  delete(id) {
    contacts = contacts.filter(contact => contact.id !== id)
  }
}

exports.ContactRepository = new ContactRepository()
