const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
 
const categoryData = await Category.findAll().catch((err) =>{
  res.json(err)
  });
res.json(categoryData)}
);


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id).then((categoryData)=>{
    res.json(categoryData)
  });

});

router.post('/', async (req, res) => {
  // create a new category
  try{
  const newCategory = await Category.create({
    id:req.body.id,
    category_name: req.body.category_name,
  })
  res.status(200).json(newCategory);
  }
  catch(err) {
  ////*****TO DO: add message */
    res.status(404).json(err);
  
  };
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name,
  },
  {
    where:{
      id: req.params.id
    }
  })
  .then((updateCategory)=>{
    res.json(updateCategory);
  })
  .catch((err)=>{
    res.json(err);
  });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    }
  },
  )
  .then((deletedCategory)=>{
    res.json(deletedCategory);
  })
  .catch((err)=>{
    res.json(err);
  });
});

module.exports = router;
