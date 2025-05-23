const express = require("express");
const router = express.Router();
const Category = require("./../db/category");
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../handlers/category-handler");

router.post("", async (req, res) => {
    try {
        let model = req.body;

        if (!model?.name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        let result = await addCategory(model);
        res.send(result);
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("", async (req, res) => {
    let result = await getCategories();
    res.send(result);
});

router.get("/:id", async (req, res) => {
    let id = req.params["id"];
    let result = await getCategoryById(id);
    res.send(result);
});


router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params["id"];
    await updateCategory(id, model);
    res.send({ message: "Updated" })

})

router.delete("/:id", async (req, res) => {
    let id = req.params["id"];
    await deleteCategory(id);
    res.send({ message: "Deleted" })
})

module.exports = router;