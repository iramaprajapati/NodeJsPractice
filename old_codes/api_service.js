const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, "OK", { "Content-Type": "application/json" });
    let data = "";
    req.on('data', chunk => {
        console.log(`Received chunk of size ${chunk.length}`);
        data += chunk;
    });

    req.on('end', () => {
        setTimeout(() => {  // Simulating a long processing time
            console.log("Sending response...");
            if (data === "error") {
                return res.end("Error: You sent the word 'error'!");
            } else {
                return res.end("You said '" + data + "'! That was fun!");
            }
        }, 5000)
    })
}).listen(8124);

console.log("Server running at http://localhost:8124/");    
