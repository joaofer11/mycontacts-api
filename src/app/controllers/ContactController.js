const { ContactRepository } = require('../repositories/ContactRepository')

class ContactController {
  async index(req, res) {
    // List all records
    
    const contacts = await ContactRepository.findAll()
    
    res.status(200).json(contacts)
  }

  async show(req, res) {
    // List one record
    
    const { id } = req.params
    
    const contact = await ContactRepository.findById(id)
    
    if (!contact) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    
    res.status(200).json(contact)
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

