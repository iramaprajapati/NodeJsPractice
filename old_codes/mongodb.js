const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://rama:rama1234@testdb.elml5e4.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'TestNodeJsDB';
const client = new MongoClient(uri);

async function getUsersCollection() {
    try {
        let result = await client.connect();
        db = result.db(dbName);
        return db.collection('Users');
    } finally {
        // Ensures that the client will close when you finish/error
       // await client.close();
    }
}

module.exports = getUsersCollection;