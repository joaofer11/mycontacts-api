const { ContactRepository } = require('../repositories/ContactRepository')

class ContactController {
  async index(req, res) {
    // List all records
    
    const contacts = await ContactRepository.findAll()
    
    res.status(200).json(contacts)
  }

  show() {
    // List one record
  }

  store() {
    // Create a new record
  }

  update() {
    // Edit a existing record
  }

  delete() {
    // Delete a existing record
  }
}

exports.ContactController = new ContactController()

