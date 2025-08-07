//Listing 8.1

// Define the port number the server will listen on
const port = 3000,

  // Import the Express module
  express = require("express"),

  // Create an instance of an Express application
  app = express();

// Define a route handler for GET requests to the root URL ("/")  
app.get("/", (req, res) => {
  res.send("Hello, Universe!"); // Send a simple text response to the client
})

// Start the Express server and listen for connections on the specified port
.listen(port, () => {
 console.log(`The Express.js server has started and is listening on port number: ${port}`);
});



// //Listing 8.2

// // Define the port number the server will listen on
// const port = 3000,

//   // Import the Express module
//   express = require("express"),

//   // Create an instance of an Express application
//   app = express();

// // Define a route handler for GET requests to the root URL ("/")  
// app.get("/", (req, res) => {
//   console.log(req.params);      // Log the route parameters (none in this case, but good for debugging)
//   console.log(req.body);        // Log the request body (not typically used in GET requests)
//   console.log(req.url);         // Log the full URL path of the request
//   console.log(req.query);       // Log the query string parameters, if any (e.g., /?name=John)
//   res.send("Hello, Universe!"); // Send a simple text response to the client
// })

// // Start the Express server and listen for connections on the specified port
// .listen(port, () => {
//  console.log(`The Express.js server has started and is listening on port number: ${port}`);
// });




