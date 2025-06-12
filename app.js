const express = require("express");
const mongoose = require("mongoose");
const uri = "mongodb+srv://thanhphat1125:Thanhphat6181%40@cluster0.jbucew7.mongodb.net/ecom_store?retryWrites=true&w=majority";
const app = express();

const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer")
const authRoutes = require("./routes/auth")
const { veryfyToken, isAdmin } = require("./middleware/auth-middleware");

app.use(cors());
app.use(express.json());

app.use("/category", veryfyToken, isAdmin, categoryRoutes);
app.use("/brand", veryfyToken, isAdmin, brandRoutes);
app.use("/product", veryfyToken, isAdmin, productRoutes);
app.use("/customer", veryfyToken, customerRoutes);
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("Server running");
});




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");

  app.listen(port, () => {
    console.log("🚀 Server running on port", port);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

app.listen(port, () => {
    console.log("Server running on port", port)
})