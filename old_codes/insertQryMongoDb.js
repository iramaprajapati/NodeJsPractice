const connToMangoDb = require('./mongodb');

async function insertQry() {
    const db = await connToMangoDb();  //connect to MongoDB database

    // const users = await db.insertOne(
    //     { name: 'Jane Doe', age: 30, contact: "8786544441" }
    // );   //Insert a new document into the 'users' collection of the connected DB

    // if (users.acknowledged) { 
    //     console.log("users details inserted...");
    // }


    //const result = await db.insertOne({ name: "John Doe", age: 30, email: "john@doe.com" });

    try {
        //  console.log(await db.insertOne({ name: 'Mack Tey', age: 45, email: "mack@tey.com" }));

        /* Insert multiple documents at once */
        var result = await db.insertMany([
            { name: 'Jane Doe', age: 30 },
            { name: 'Alice Smith', age: 25 }]);

        console.log(`Inserted ${result.insertedCount} documents`);

    } catch (err) {
        console.error(err)
    };
};

// Call the function to execute the query
insertQry();    
