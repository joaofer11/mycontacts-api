const { Router } = require('express')

const router = Router()

/*
 *  get /contacts
 *  get /contacts/:id
 *  post /contacts
 *  delete /contacts/:id
*/

router.get('/contacts', (req, res) => {
  res.send('Contacts')
})

exports.router = router
