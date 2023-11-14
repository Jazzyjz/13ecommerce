const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

  
  router.get('/', async (req, res) => {
    // find all tags
  // be sure to include its associated Product data
    try {
      const tags = await Tag.findAll({
        include: [{ model: Product }],
        through: ProductTag,
      });
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 
  router.get('/:id', async (req, res) => {
     // find a single tag by its `id`
  // be sure to include its associated Product data
    try{
      const requestedTag = await Tag.findOne({
        where: {id: req.params.id}, 
        include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}]
      });
      res.status(200).json(requestedTag);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try{
      const requestedTagPost = await Tag.create({
        tag_name: `${req.body.tag_name}`
      });
      res.status(200).json(requestedTagPost);
    } catch(err){
    res.status(500).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    try{
      const requestedTagUpdate = await Tag.update(
        req.body,{
        where: {id: req.params.id}, 
      });
      (!requestedTagUpdate[0]? res.status(404).json({ message: 'Cant find that id'}): res.status(200).json(requestedTagUpdate))
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try{
      const requestedTagDelete = await Tag.destroy({
        where: {id: req.params.id}, 
      });
      (!requestedTagDelete? res.status(404).json({ message: 'Cant find that id'}): res.status(200).json(requestedTagDelete))
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
