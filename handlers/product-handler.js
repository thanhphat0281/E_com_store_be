const Product = require("./../db/product");
const mongoose = require('mongoose');

async function addProduct(model) {
    let product = new Product({
        ...model,
    });
    await product.save();
    return product.toObject();
}

async function getProductById(id) {
    let product = await Product.findById(id);
    return product.toObject();
}

async function getProducts() {
    let products = await Product.find();
    return products.map((c) => c.toObject());
}

async function updateProduct(id, model) {
    await Product.findOneAndUpdate({ _id: id }, model);
    return;
}

async function deleteProduct(id) {
    await Product.findByIdAndDelete(id);
    return;
}

async function getNewProducts() {
    let newProducts = await Product.find({
        isNewProduct: true,
    });
    return newProducts.map((x) => x.toObject());
}

async function getFeaturedProducts() {
    let featuredProducts = await Product.find({
        isFeatured: true,
    });
    return featuredProducts.map((x) => x.toObject());
}

async function getProductForListing(
    searchTerm,
    categoryId,
    sortBy,
    sortOrder,
    brandId,
    page,
    pageSize,
) {
    if (!sortBy) {
        sortBy = 'price'
    }
    if (!sortOrder) {
        sortOrder = -1;
    }

    let queryFilter = {}
    console.log(searchTerm)
    if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
        queryFilter.$or = [
            {
                name: { $regex: '.*' + searchTerm + '.*', $options: 'i' },
            },
            {
                shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' },
            }
        ];
        // queryFilter.name = searchTerm;
    }
    if (categoryId) {
        queryFilter.categoryId = new mongoose.Types.ObjectId(categoryId);
        console.log('Be',queryFilter)
    }
    if (brandId) {
        queryFilter.brandId = brandId;
    }

    const products = await Product.find(queryFilter)
        .sort({
            [sortBy]: +sortOrder,
        })
        .skip((+page - 1) * +pageSize)
        .limit(+pageSize);

        console.log('test be',products)

    return products.map((x) => x.toObject());
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
    getNewProducts,
    getFeaturedProducts,
    getProductForListing
}