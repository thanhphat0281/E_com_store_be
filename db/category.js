const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {type: String, requireed : true},
});

// const Category = mongoose.model("categories",categorySchema);
module.exports = mongoose.model("Category", categorySchema);