const express = require('express');
require('./config');
require('dotenv').config();
const Products = require('./products');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json()); // <---- Use this middleware for parsing application/json request body.

// Home route - simple response
app.get("/", (req, res) => {
    res.send("Welcome to the shopping API");
});

// Get all products
app.get("/products", async (req, res) => {
    let result = await Products.find();
    res.send(result);
    console.log(result);
});

// Create new product
app.post('/create', async (req, res) => {
    let product = new Products(req.body);
    let result = await product.save();
    res.send(result);
    console.log(result);

});

// Update product by Id
app.put("/update/:_id", async (req, res) => {
    let result = await Products.updateOne(req.params, { $set: req.body });
    if (!result.modifiedCount) return res.status(404).send("No changes made.");
    else res.send(`Updated ${result.modifiedCount} field.`);
    // res.send(result);
    console.log(result);
});

// Delete product by Id
app.delete("/delete/:_id", async (req, res) => {
    let result = await Products.deleteOne(req.params);
    if (!result || !result.deletedCount) return res.status(404).send("Product not found.");
    else res.send(`Deleted ${result.deletedCount} item.`);
    // res.send(result);
    console.log(result);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
