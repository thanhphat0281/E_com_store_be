const mongoose = require("mongoose");
const { Schema } = mongoose;
const withlistSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users'},
    productId:{ type: Schema.Types.ObjectId, ref: 'products'},
});

const Withlist = mongoose.model("withlists",withlistSchema);
module.exports = Withlist;