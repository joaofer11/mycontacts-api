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
  
  create({ name, email, phone }) {
    const newContact = { id: v4(), name, email, phone, category_id: v4() }
    contacts.push(newContact)
    
    return new Promise(resolve => {
      resolve(newContact)
    })
  }
  
  delete(id) {
    contacts = contacts.filter(contact => contact.id !== id)
  }
}

exports.ContactRepository = new ContactRepository()
