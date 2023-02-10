const { CategoryRepository } = require('../repositories/CategoryRepository')

class CategoryController {
  
  async index(req, res) {
    const categories = await CategoryRepository.findAll()
    
    res.status(200).json(categories)
  }
  
  async store(req, res) {
    const { name } = req.body
    
    if (!name) {
      res.status(400).json({ error: 'Name is required' })
      return
    }
    
    const createdCategory = await CategoryRepository.create(name)
    
    res.status(200).json(createdCategory)
  }
}

exports.CategoryController = new CategoryController()