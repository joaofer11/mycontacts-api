const { v4 } = require('uuid')

const contacts = [
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
}

exports.ContactRepository = new ContactRepository()
