// Import the Express framework
const express = require("express");

// Create an instance of an Express application
const app = express();  

// Import application controllers
const homeController = require("./controllers/homeController"); // Handles homepage and related routes
const errorController = require("./controllers/errorController"); // Handles error pages

// Import the Express EJS layouts middleware
const layouts = require("express-ejs-layouts");

// Import Mongoose for MongoDB object modelling
const mongoose = require("mongoose");

// Import the Subscriber model for database interactions
const Subscriber = require("./models/subscriber");

// Connect to the MongoDB database "recipe_db" using Mongoose
mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Get the default database connection
const db = mongoose.connection;

// Event listener for a successful database connection
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// // Example to create a new subscriber using the save method
// const subscriber1 = new Subscriber({
//     name: "Jon Wexler",
//     email: "jon@jonwexler.com",
// });

// subscriber1.save((error, savedDocument) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Saved subscriber using save method:", savedDocument);
//     }
// });

// // Example to create a new subscriber using the create method
// Subscriber.create({
//     name: "Jack Wexler",
//     email: "jack@jonwexler.com",
// }, (error, savedDocument) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Saved subscriber using create method:", savedDocument);
//     }
// });

// Example query to find "Welile Ray" with "weza" in the email and log the name
var myQuery = Subscriber.findOne({ name: "Welile Ray" })
    .where("email", /weza/);

myQuery.exec()
  .then(data => {
    if (data) {
      console.log("Found via query:", data.name);
    }
  })
  .catch(error => {
    console.log("Query error:", error);
  });

// Set EJS as the view engine
app.set("view engine", "ejs");

// Use EJS layouts for consistent page structure
app.use(layouts);

// Set application port (use environment variable if available, otherwise 3000)
app.set("port", process.env.PORT || 3000);

// Route with a dynamic parameter 'myName' that calls homeController
app.get("/name/:myName", homeController.respondWithName);  

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handling missing routes and errors using middleware
app.use(errorController.logErrors);                  // Log errors to the console
app.use(errorController.respondNoResourceFound);     // Handle 404 errors
app.use(errorController.respondInternalError);       // Handle server (500) errors

// Start the server and listen for requests on the configured port
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});