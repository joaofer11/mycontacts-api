const express = require('express')
const { router } = require('./router')

const server = express()
server.use(express.json())

server.use(router)

server.listen(3000, () => console.log('Server started at http://localhost:3000'))
