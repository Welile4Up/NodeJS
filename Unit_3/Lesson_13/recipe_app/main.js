// Import the Express framework
const express = require("express"),
    app = express(),  // Create an instance of an Express application

    // Import application controllers
    homeController = require("./controllers/homeController"), // Handles homepage and related routes
    errorController = require("./controllers/errorController"), // Handles error pages

    // Import the Express EJS layouts middleware
    layouts = require("express-ejs-layouts");

// Import MongoDB client and configure database connection details
const MongoDB = require("mongodb").MongoClient,
    dbURL = "mongodb://localhost:27017",  // MongoDB server URL
    dbName = "recipe_db"; // Name of the database to use

// Connect to MongoDB
MongoDB.connect(dbURL, (error, client) => {
    if (error) throw error; // Throw error if connection fails

    // Select the database
    let db = client.db(dbName);

    // Fetch all documents from the "contacts" collection
    db.collection("contacts")
      .find()
      .toArray((error, data) => {
        if (error) throw error; // Handle query error
        console.log(data);  // Output retrieved contacts
      });

    // Insert a new contact into the "contacts" collection  
    db.collection("contacts")
     .insert({
       name: "Doctor Khumalo",
       email: "16v@chiefs.com"
    }, (error, db) => {
      if (error) throw error; // Handle insertion error
      console.log(db);  // Log the result of the insertion
    });
});

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set application port (use environment variable if available, otherwise 3000)
app.set("port", process.env.PORT || 3000);

// Enable URL-encoded form data parsing
app.use(
    express.urlencoded({
        extended: false
    })
);

// Enable JSON request body parsing
app.use(express.json());

// Use EJS layouts for consistent page structure
app.use(layouts);

// Serve static files from the "public" directory
app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.send("Welcome to Confetti Cuisine!");
// });

// Define route for homepage - renders index.ejs
app.get("/", (req, res) => {
    res.render("index");
});

// Define route for courses page
app.get("/courses", homeController.showCourses);

// Define route to display contact/signup form
app.get("/contact", homeController.showSignUp);

// Define route to handle contact/signup form submissions
app.post("/contact", homeController.postedSignUpForm);

// Handle 404 errors (page not found)
app.use(errorController.pageNotFoundError);

// Handle 500 errors (internal server errors)
app.use(errorController.internalServerError);

// Start the server and listen for requests on the configured port
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});