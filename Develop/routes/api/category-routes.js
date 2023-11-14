const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try{
      const requestedCategory = await Category.findOne({
        where: {id: req.params.id}, 
        include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}]
      });
      res.status(200).json(requestedCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try{
      const requestedCategoryPost = await Category.create({
        category_name: `${req.body.category_name}`
      });
      res.status(200).json(requestedCategoryPost);
    } catch(err){
    res.status(500).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    try{
      const requestedCategoryUpdate = await Category.update(
        req.body,{
        where: {id: req.params.id}, 
      });
      (!requestedCategoryUpdate[0]? res.status(404).json({ message: 'Cant find that id'}): res.status(200).json(requestedCategoryUpdate))
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try{
      const requestedCategoryDelete = await Category.destroy({
        where: {id: req.params.id}, 
      });
      (!requestedCategoryDelete? res.status(404).json({ message: 'Cant find that id'}): res.status(200).json(requestedCategoryDelete))
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
