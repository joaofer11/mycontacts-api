const { Router } = require('express')
const { ContactController } = require('./app/controllers/ContactController')
const { CategoryController } = require('./app/controllers/CategoryController')


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

router.post('/categories', CategoryController.store)

exports.router = router
