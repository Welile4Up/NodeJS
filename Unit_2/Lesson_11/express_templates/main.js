const express = require("express");                              // Require Express framework
const app = express();                                           // Create an instance of an Express app
const homeController = require("./controllers/homeController");  // Import the homeController module
const errorController = require("./controllers/errorController"); // Import the errorController module
const layouts = require("express-ejs-layouts");                   // Require Express layouts

app.set("view engine", "ejs");                                    // Tell Express to use EJS for templates 
app.use(layouts);                                                 // Tell Express to use the layouts as middleware
app.set("port", process.env.PORT || 3000);                       // Set the server port

app.get("/name/:myName", homeController.respondWithName);        // Define a route with a dynamic parameter (:myName)

app.use(express.static("public"));                               // Serve static files from the "public" directory

// Handling missing routes and errors using error controller middleware
app.use(errorController.logErrors);                              // Log errors (middleware function)
app.use(errorController.respondNoResourceFound);                 // Handle 404 Not Found errors 
app.use(errorController.respondInternalError);                   // Handle 500 Internal Server errors 

// Start server and listen on the defined port 
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
