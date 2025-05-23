const mongoose = require("mongoose");
const withlistSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users'},
    productId:Array(String),
});

const Withlist = mongoose.model("withlists",withlistSchema);
module.exports = Withlist;