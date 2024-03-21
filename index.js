// Cloud mongodb connect syntax
// const uri = "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority";

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String,
    description: String
});
const saveInDB = async () => {
    const ProductModel = mongoose.model("products", productSchema)
    let product = new ProductModel({
        name: "iphone 14",
        price: 900,
        description: 'This is iPhone'
    });

    let result = await product.save();
    console.log(`${result} is saved in the database`);

}

// saveInDB(); //<---- call this function to save data into DB

const updateInDB = async () => {
    const ProductModel = mongoose.model("products", productSchema);
    let updateProduct = await ProductModel.updateOne(
        { name: "iphone 14" },
        {
            $set: {
                price: 1000,
                brand: "Apple",
                category: "Smart Phone",
                description: 'This is iPhone 14'
            },

        });

    console.log(`${updateProduct} is updated..`);

}

// updateInDB(); //<---- call this function to update data into DB

const deleteInDB = async () => {
    const ProductModel = mongoose.model("products", productSchema);
    let deleteProduct = await ProductModel.deleteOne(
        { name: "iphone 14" },
    );
    console.log(deleteProduct);
}
// deleteInDB(); //<---- call this function to delete data into DB

const findInDB = async () => {
    const ProductModel = mongoose.model("products", productSchema);
    let findProduct = await ProductModel.find(
        //  { name: "iphone13" }, //  condition for search
    );
    console.log(findProduct);
}
findInDB(); //<---- call this function to find all or specific data from DB




