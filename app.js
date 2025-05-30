const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");



app.use(cors());
app.use(express.json());

app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productRoutes);


app.get("/", (req, res)=> {
    res.send("Server running");
});

async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017/", {
        dbName : "store_db",
    })
    console.log("Db connected");
}

connectDb().catch((err)=> {
    console.log(err);
})
app.listen(port,()=>{
    console.log("Server running on port",port)
})