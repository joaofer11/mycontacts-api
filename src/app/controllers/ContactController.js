class ContactController {
  index(req, res) {
    // List all records
    res.send('Sended from contact controller')
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

