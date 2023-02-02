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

  async store(req, res) {
    // Create a new record
    
    const { name, email, phone } = req.body
    
    if (!name) {
      res.status(400).json({ error: "Name is required" })
      return
    }
    
    const isContactAlreadyExists = await ContactRepository.findByEmail(email)
    
    if (isContactAlreadyExists) {
      res.status(400).json({ error: "This contact already exists" })
      return
    }
    
    const contact = await ContactRepository.create({ name, email, phone })
    
    res.status(201).json(contact)
  }

  update() {
    // Edit a existing record
  }

  async delete(req, res) {
    // Delete a existing record
    
    const { id } = req.params
    
    const contact = await ContactRepository.findById(id)
    
    console.log(contact)
    
    if (!contact) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    
    ContactRepository.delete(id)
    res.sendStatus(202)
  }
}

exports.ContactController = new ContactController()

