import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ProductModel from './Models/Product.js'
import CartModel from './Models/cart.js'
dotenv.config
const app = express();
app.use(express.json())
app.use(cors())

// create Product
app.post('/addProduct',(req,res)=>{
    ProductModel.create(req.body)
    .then(product => res.json({message:"new product is add",product}))
    .catch(err => res.json(err))
})
 // get all products
  app.get('/product',(req,res)=>{
    ProductModel.find({})
    .then(products => res.json(products))
    .catch(err => res.json(err))
  }) 
  //delete product 
  app.delete('/deleteproduct/:id',(req,res)=>{
    const id = req.params.id
    ProductModel.findByIdAndDelete({_id:id})
    .then(product => res.json({message:'product is deleted',product}))
    .catch(err => res.json(err))
  })

  //get one product by id 
  app.get('/oneproduct/:id',(req,res)=>{
    const id = req.params.id
    ProductModel.findById({_id:id})
    .then(product => res.json(product))
    .catch(err => res.json(err))
  })
  //update product
  app.put('/update/:id',(req,res)=>{
    const id = req.params.id
    ProductModel.findByIdAndUpdate({_id:id},{
       title :req.body.title,
       price : req.body.price,
       count:req.body.count 
    })
    .then(product => res.json({message:'product is updated successfully',product}))
    .catch(err => res.json(err))
  })
////////////////cart//////////////////
//add to cart
 app.post('/addToCart/:id',(req,res)=>{
  const id = req.params.id
  CartModel
  .then(carts => res.json({message:'product added successfully',carts}))
  .catch(err => res.json(err))
 })

 //get carts
 app.get('/carts',(req,res)=>{
  CartModel.find({})
  .then(carts => res.json(carts))
  .catch(err => res.json(err))
 })

 //delete cart
 app.delete('/deletecart/:id',(req,res)=>{
  const id = req.params.id
  CartModel.findByIdAndDelete({_id:id})
  .then(carts => res.json({message:'cart is deleted',carts}))
  .catch(err => res.json(err))
 })
  // clear cart
  app.delete('/deleteall',(req,res)=>{
    CartModel.deleteMany({})
    .then(carts => res.json({message:'all carts is deleted',carts}))
    .catch(err => res.json(err))
  })


mongoose.connect('mongodb://127.0.0.1:27017/TheStore')
app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is running on port 3000`);
})