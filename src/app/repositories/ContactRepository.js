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
  findAll() {
    return new Promise(resolve => {
      resolve(contacts)
    })
  }
  
  findById(id) {
    return new Promise(resolve => {
      resolve(contacts.find(contact => contact.id === id))
    })
  }
  
  findByEmail(email) {
    return new Promise(resolve => {
      resolve(contacts.find(contact => contact.email === email))
    })
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
