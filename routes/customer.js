const express = require("express");
const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const router = express.Router();

router.get("/new-products", async (req, res)=> {
    const products = await getNewProducts();
    res.send(products);
})

router.get("/featured-products", async (req, res)=> {
    const featuredProducts = await getFeaturedProducts();
    res.send(featuredProducts);
})
module.exports = router;