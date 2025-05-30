const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new mongoose.Schema({
    name:String,
    description: String,
    shortDescription: String,
    price: Number,
    discount: Number,
    images:Array(String),
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories'},
    brandId: { type: Schema.Types.ObjectId, ref: 'brands'},
});

const Products = mongoose.model("products",productSchema);
module.exports = Products;