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
router.get('/contacts/:id', ContactController.show)

exports.router = router
