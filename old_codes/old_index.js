// const colors = require('colors');
// console.log("Hii There".blue);
// const http = require('http');
// http.createServer((req, res) => {
//     res.writeHead(200, "OK", { 'Content-Type': 'application\json' });
//     res.write(JSON.stringify({ name: "John Doe", age: 34, city: "New York" }));
//     res.end();
//     //let data = '{"name":"John","age":30,"city":"New York"}';
//     //let data="Hello World";
//     //console.log(`Request received for ${req.url}`);
//     // res.end(data);
// }).listen(3000);

const express = require('express');
const path = require('path');
var app = express();
const route = express.Router();


// Middleware code start
const reqFilter = require('./middleware');
route.use(reqFilter);

// app.use(reqFilter); // This app.use() middle ware function will be called on all routes method.
// Middleware code end

// When EJS is used in a project, then view engine must be set and the views folder must be specified.
app.set("view engine", "ejs");

const publicFolderPath = path.join(__dirname, 'public');
console.log(publicFolderPath);

app.get('/', (req, res) => {
    res.sendFile(`${publicFolderPath}/home.html`);
});

// Using ejs to render dynamic content on server side.
app.get('/profile', (req, res) => {
    const userProfileData = {
        name: "Abcd Xyz",
        emailId: "abc@xyz.com",
        phoneNumber: "8768465465",
        Address: "123, ABC Street, Xyz city.",
        skills: ["Java", ".Net", "Python", "MongoDB", "SQL"],
    }
    res.render("profile", { userProfileData });
});

app.get('/login', (req, res) => {
    res.render("login");
});

// If no URL is matched in browser then it will go to page not found i.e. 404 error page.
app.get('*', (req, res) => {
    res.sendFile(`${publicFolderPath}/errorPage.html`);
});

// Use middleware function (e.g. reqFilter) on specific  route.
// app.get('/about', reqFilter, (req, res) => {
//     res.sendFile(`${publicFolderPath}/about.html`);
// });

route.get('/about', (req, res) => {
    res.sendFile(`${publicFolderPath}/about.html`);
});

// Use middleware function (e.g. reqFilter) on specific  route.
// app.get('/contactus', reqFilter, (req, res) => {
//     res.sendFile(`${publicFolderPath}/contactus.html`);
// });
route.get('/contactus', (req, res) => {
    res.sendFile(`${publicFolderPath}/contactus.html`);
});

app.use('/', route); // Connecting the router with the application.

app.listen(8080, () => {
    console.log('Listening on port 8080...');
});  