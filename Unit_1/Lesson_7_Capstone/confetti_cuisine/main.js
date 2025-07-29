"use strict"; // Enables strict mode for better error checking and safer code

// Set the port number the server will listen on
const port = 3000,
    http = require("http"),                     // Import the built-in HTTP module to create a web server
    httpStatus = require("http-status-codes"),  // Import HTTP status codes for cleaner, readable responses
    router = require("./router"),               // Import a custom router module for handling different routes 
    contentTypes = require("./contentTypes"),   // Import a custom module that defines MIME content types (e.g., html, css, js) 
    utils = require("./utils");                 // Import utility functions (e.g., for reading and sending files)

// Route for the homepage (GET request to "/")
router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html); 
    utils.getFile("views/index.html", res); 
});

// Route for the courses page
router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/courses.html", res);
});

// Route for the contact page
router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/contact.html", res);
});

// Route for handling POST requests to the homepage (e.g., form submissions)
router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/thanks.html", res); 
});

// Route for serving an image (graph.png)
router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile("public/images/graph.png", res);
});

// Route for serving another image (people.jpg)
router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/people.jpg", res);
});

// Route for serving product image (product.jpg)
router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/product.jpg", res);
});

// Route for serving the custom stylesheet
router.get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/confetti_cuisine.css", res);
});

// Route for serving Bootstrap CSS
router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap.css", res);
});

// Route for serving a JavaScript file
router.get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile("public/js/confetti_cuisine.js", res);
});

// Create and start the HTTP server using the custom router to handle all requests
http.createServer(router.handle).listen(port);

// Log to the console that the server is running and listening on the specified port
console.log(`The server is listening on port number: ${port}`);


