const getUsersCollection = require('./mongodb');

async function getUsersData() {
    try {
        // Get the users collection from MongoDB.
        const usersCol = await getUsersCollection();

        // Retrieve all documents in the 'users' collection.
        const docs = await usersCol.find().toArray();
        console.log("Users data: ", docs);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

getUsersData();