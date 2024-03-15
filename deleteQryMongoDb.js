const connToMangoDb = require('./mongodb');
async function deleteQry() {
    try {
        const db = await connToMangoDb();  //connect to MongoDB database
       
        //*******************DeleteOne*****************************//
        // /* Delete the first document in the "Users" collection that matches
        // the specified query document */
        // const query = { name: "Alice Smith" };
        // const resultDeleteOne = await db.deleteOne(query);
        // /* Print a message that indicates whether the operation deleted a
        // document */
        // if (resultDeleteOne.deletedCount === 1) {
        //     console.log("Successfully deleted one document.");
        // } else {
        //     console.log("No documents matched the query. Deleted 0 documents.");
        // }

        //*******************DeleteMany*****************************//
        // Delete all documents that match the specified query.
        const query = { name: "Alice Smith" };
        const resultDeleteMany = await db.deleteMany(query);
        // Print the number of deleted documents
        console.log("Deleted " + resultDeleteMany.deletedCount + " documents");

    } catch (err) {
        console.error(err)
    };

};

// Call the function to execute the query
deleteQry(); 