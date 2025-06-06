const express = require("express");
const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const router = express.Router();

router.get("/new-products", async (req, res)=> {
    const products = await getNewProducts();
    res.send(products);
})

router.get("/featured-products", async (req, res)=> {
    const featuredProducts = await getFeaturedProducts();
    res.send(featuredProducts);
})

router.get("/categories", async (req, res)=> {
    const categories = await getCategories();
    res.send(categories);
})
module.exports = router;