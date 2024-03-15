const connToMangoDb = require('./mongodb');
async function updateQry() {
    try {
        const db = await connToMangoDb();  //connect to MongoDB database

        // Create a filter for users collection.
        const filter = { username: "Rama" };

        /* Set the upsert option to insert a document if no documents match
        the filter */
        const options = { upsert: true };

        // Specify the update to set a value for the plot field
        const updateDoc = {
            $set: { roll: 'admin', age: 28 },
        };

        // // Update the first document that matches the filter
        // const resultUpdateOne = await db.updateOne(filter, updateDoc, options);

        // // Print the number of matching and modified documents
        // console.log(
        //     `${resultUpdateOne.matchedCount} document(s) matched the filter, updated ${resultUpdateOne.modifiedCount} document(s)`,
        // );

        // Update the documents that match the specified filter
        const resultUpdateMany = await db.updateMany(filter, updateDoc);
        console.log(`Updated ${resultUpdateMany.modifiedCount} documents`);


    } catch (err) {
        console.error(err)
    };

};

// Call the function to execute the query
updateQry();  