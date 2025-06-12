const Wishlist = require("./../db/wishlist");

async function addToWishlist(userId, productId) {
    const withlist = new Wishlist({
        userId: userId,
        productId: productId,
    });
    await withlist.save();
    return withlist.toObject();
}

async function removeFromWishlist(userId, productId) {
    await Wishlist.deleteMany({
        userId: userId,
        productId: productId,
    });
}

async function getWishlist(userId,productId) {
    let wishlists = await Wishlist.find({userId:userId});
    return wishlists.map(x=>x.toObject());
}

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
}

