const db = require('../../database')

class CategoryRepository {
  async create(name) {
    await db.query(`
      INSERT INTO categories (name)
      VALUES (?)
    `, 
      [name]
    )
    
    const [row] = await db.query(`
      SELECT *, BIN_TO_UUID(id) AS id
      FROM categories
      ORDER BY id DESC LIMIT 1
    `)
    
    return row
  }
}

exports.CategoryRepository = new CategoryRepository()
