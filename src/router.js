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
router.post('/contacts', ContactController.store)
router.get('/contacts/:id', ContactController.show)
router.put('/contacts/:id', ContactController.update)
router.delete('/contacts/:id', ContactController.delete)

exports.router = router
