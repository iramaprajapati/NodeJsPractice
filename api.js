const express = require('express');
const getUsersCollection = require("./mongodb");
const mongoDb = require('mongodb');
const app = express();

app.use(express.json()); // to parse the incoming requests with JSON payloads

app.get('/', async (req, res) => {
    try {
        let usersData = await getUsersCollection();
        usersData = await usersData.find().toArray()  // get all documents in the collection
        console.log(usersData);
        res.send(usersData);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400).json({ error: err });
    }
});

app.post('/', async (req, res) => {
    try {
        let usersData = await getUsersCollection();
        let result = await usersData.insertOne(req.body);   // insert a new document into the collection
        res.send(result);

    } catch (err) {
        console.log(err);
        return res.sendStatus(400).json({ error: err });
    }
});

app.put('/:name', async (req, res) => {
    try {
        let usersData = await getUsersCollection();
        let result = await usersData.updateOne(
            { name: req.params.name },  // search filter
            { $set: req.body }         // update operation
        );
        if (!result.modifiedCount) throw "User not found";
        else res.send(result);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400).json({ error: err });
    }
});

// delete user by its id
app.delete('/:id', async (req, res) => {
    try {
        let usersData = await getUsersCollection();
        // Delete all documents that match the specified query.
        const query = { _id: new mongoDb.ObjectId(req.params.id) };
        const resultdeleteOne = await usersData.deleteOne(query);
        res.send(resultdeleteOne);

    } catch (err) {
        console.log(err);
        return res.sendStatus(400).json({ error: err });
    }
});


app.listen(8080, () => console.log('Server is running on port 8080'));