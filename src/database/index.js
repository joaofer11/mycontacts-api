const mysql = require('mysql2/promise')

const client = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '825572j',
  database: 'mycontacts'
})

const reachDb = async (query) => {
  const [rows] = await client.query(query)
  console.log(rows)
}

reachDb('SELECT * FROM contacts;')