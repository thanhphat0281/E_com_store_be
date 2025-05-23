const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:String,
    description: String,
    shotDescription: String,
    purchagePrice: Number,
    sellingPrice: Number,
    images:Array(String),
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories'}
});

const Products = mongoose.model("products",productSchema);
module.exports = Products;