import mongoose from "mongoose";

 const CartSchema = new mongoose.Schema({
    title:String,
    price:Number,
    count:Number
 })

 const CartModel = mongoose.model('cart',CartSchema)
 export default CartModel;