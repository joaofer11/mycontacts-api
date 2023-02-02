const { uuid } = require('uuidv4')

const contacts = [
  {
    id: uuid(),
    name: 'João',
    email: 'joaofer@gmail.com',
    phone: '838288228',
    category_id: uuid()
  }
]

class ContactRepository {
  findAll() {
    return new Promise(resolve => {
      resolve(contacts)
    })
  }
}

exports.ContactRepository = new ContactRepository()
