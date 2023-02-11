require('express-async-errors')
const express = require('express')
const { router } = require('./router')

const server = express()

server.use(express.json())
server.use(router)
server.use((error, req, res, _) => {
  console.log(error)
  res.sendStatus(500)
})

server.listen(3000, () => console.log('Server started at http://localhost:3000'))
