//Listing 4.1

// Define the port number the server will listen on
const port = 3000,

  // Import the built-in http module to create the web server
  http = require("http"),

  // Import http-status-codes module for readable HTTP status codes (e.g., 200 OK)
  httpStatus = require("http-status-codes"),

  // Create the HTTP server with a request handler callback function
  app = http.createServer((request, response) => {
    // Log message when a request is received
    console.log("Received an incoming request!");

    // Set the response status to 200 (OK) and the content type to HTML
    response.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });
 
    // Define the HTML message to send back to the client
    let responseMessage = "<h1>Hello, Universe!</h1>";

    // Write the message to the response
    response.write(responseMessage);
    
    // End the response
    response.end();

    // Log the response that was sent
    console.log(`Sent a response : ${responseMessage}`);
 });

// Start the server and listen on the defined port
app.listen(port);

// Log message to confirm server is running
console.log(`The server has started and is listening on port number: ${port}`);