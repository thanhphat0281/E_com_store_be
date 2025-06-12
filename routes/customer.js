const express = require("express");
const { 
    getNewProducts, 
    getFeaturedProducts, 
    getProductForListing,
    getProductById 
} = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");
const { getWishlist , addToWishlist } = require("../handlers/wishlist-handler");
const router = express.Router();

router.get("/new-products", async (req, res) => {
    const products = await getNewProducts();
    res.send(products);
})

router.get("/featured-products", async (req, res) => {
    const featuredProducts = await getFeaturedProducts();
    res.send(featuredProducts);
})

router.get("/categories", async (req, res) => {
    const categories = await getCategories();
    res.send(categories);
})

router.get("/brands", async (req, res) => {
    const brands = await getBrands();
    res.send(brands);
})

router.get("/product/:id", async (req, res) => {
    const id = req.params["id"];
    const product= await getProductById(id);
    res.send(product);
})

router.get("/products", async (req, res) => {
    const {
        searchTerm,
        categoryId,
        sortBy,
        sortOrder,
        brandId,
        page,
        pageSize,

    } = req.query
    const products = await getProductForListing(
        searchTerm,
        categoryId,
        sortBy,
        sortOrder,
        brandId,
        page,
        pageSize,
    );
    res.send(products);
})

router.get("/wishlists", async (req,res)=> {
    console.log(req.user);
    const userId = req.user.id;
    const items = await getWishlist(userId);
    res.send(items);
})

router.post("/wishlists/:id", async (req,res)=> {
    console.log(req.user);
    const userId = req.user.id;
    const productId =  req.params.id;
    const item = await addToWishlist(userId, productId);
    res.send(item);
})


module.exports = router;