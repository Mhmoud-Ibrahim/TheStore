import mongoose from "mongoose";
 const ProductSchema = new mongoose.Schema({
    title:String,
    price:Number,
    count:Number,
 })

 const ProductModel = mongoose.model('products',ProductSchema)
 export default ProductModel;