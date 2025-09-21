const express = require('express')
const joi = require('joi');

const router = express.Router();

//router => methods : GET POST PUT PATCH DELETE 

const products = [{ 
id: 1,
title: "t-shirt",
price: 800,
description: "Made of cotton 100%"
},
{
 id: 2,
title: "dress",
price: 1800,
description: "Made of cotton 100%"
}
]


//get all products => url => http://localhost:8000/api/v1/products
router.get('/', (req,res)=> {
    res.status(200).json(products)

});

//get single product details
router.get('/:id',(req, res)=>{
    const product = products.find(b=> b.id === parseInt(req.params.id))
    if(product){
        res.status(200).json({message: 'success', product})
    }else {
        res.status(404).json({message: 'the product not found'})
    }
});



//create new product
router.post('/', (req, res)=> {
    const schema = joi.object({
title: joi.string().trim().min(3).max(100).required(),
description: joi.string().trim().min(10).max(200).required(),
price : joi.number().min(0).required()

    }) //handling error
const {error}  = schema.validate(req.body);
if (error){
    return res.status(400).json({message : " error validation", error})
}
    const product = {
    id: products.length + 1,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
    
    }
    products.push(product);
    res.status(201).json({ message: 'the product added successfully', product})
})

//params
//route for update product info
router.put('/:id', (req, res)=> {
 const schema = joi.object({
title: joi.string().trim().min(3).max(100),
description: joi.string().trim().min(10).max(200),
price : joi.number().min(0)
 }) 
const {error}  = schema.validate(req.body);
if (error){
    return res.status(400).json({message : " error validation", error})
}
const product = products.find(b=> b.id === parseInt(req.params.id), { new: true });

const updated = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
}


if (product){
    res.status(200).json({message: 'product updated successfully', updated})
}else {
    res.status(404).json({message : 'product not found'})
}
});


//route for delete single product
router.delete('/:id', (req, res)=>{

const product = products.find(b=> b.id === parseInt(req.params.id) );

if (product){
    res.status(200).json({message: 'product deleted successfully'})
}else {
    res.status(404).json({message : 'product not found'})
}
})







module.exports = router;


//object user // appp from express 

//get
//get single user
///update user info 
//delete single user

