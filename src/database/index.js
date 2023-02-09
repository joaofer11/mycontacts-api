const mysql = require('mysql2/promise')

const client = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '825572j',
  database: 'mycontacts',
  multipleStatements: true,
})

const query = async (statement, values) => {
  const [rows] = await client.query(statement, values)
  return { rows }
}

module.exports = { query }