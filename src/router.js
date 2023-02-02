const { Router } = require('express')
const { ContactController } = require('./app/controllers/ContactController')

const router = Router()

/*
 *  get /contacts
 *  get /contacts/:id
 *  post /contacts
 *  delete /contacts/:id
*/

router.get('/contacts', ContactController.index)

exports.router = router
