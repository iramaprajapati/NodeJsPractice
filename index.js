const express = require('express');
require('./config');
require('dotenv').config();
const Products = require('./products');
const multer = require("multer");

// Initialize Express
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "_" + Date.now().toString()+ ".jpg");
        }
    })
}).single('image');

app.post('/upload', fileUpload, async (req, res) => {
    try {
        res.send({ message: 'File has been uploaded' });
    } catch (error) {

    }
});


app.get('/search/:key', async (req, res) => {
    let search_key = req.params.key;

    try {
        let result = await Products.find({
            "$or": [
                { "name": { $regex: search_key } },
                { "brand": { $regex: search_key } },
                { "category": { $regex: search_key } },
                { "description": { $regex: search_key } }
                // Search for exact price match
                // { "price": parseFloat(key) } // Price is stored as a number in the database
            ]
        });

        if (!result.length) {
            return res.status(404).send("No products found!");
        } else {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
