// Import required modules
const express = require("express"),                             // Import the Express framework
    app = express(),                                            // Create an instance of an Express application
    homeController = require("./controllers/homeController"),   // Import the homeController module
    errorController = require("./controllers/errorController"), // Import the errorController module
    layouts = require("express-ejs-layouts");                   // Import express-ejs-layouts for layout support with EJS

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the port from environment variable or default to 3000
app.set("port", process.env.PORT || 3000);

// Parse URL-encoded bodies (form data)
app.use(
    express.urlencoded({
        extended: false   // Use classic encoding (not extended with rich objects)
    })
);

// Parse incoming JSON data
app.use(express.json());

// Use EJS layouts middleware
app.use(layouts);

// Serve static files from the "public" directory (e.g., CSS, images, client-side JS)
app.use(express.static("public"));

// This is commented out becauuse when the two routes match the same path ("/"), only the first one defined will be used. We want to use the second route below.
// app.get("/", (req, res) => {
//     res.send("Welcome to Confetti Cuisine!");
// });

// Route to render the home page (views/index.ejs)
app.get("/", (req, res) => {
    res.render("index");
});

// Route to display available courses
app.get("/courses", homeController.showCourses);

// Route to show the contact/sign-up form
app.get("/contact", homeController.showSignUp);

// Route to handle submitted contact form data
app.post("/contact", homeController.postedSignUpForm);

// Middleware to handle 404 (Page Not Found) errors
app.use(errorController.pageNotFoundError);

// Middleware to handle 500 (Internal Server) errors
app.use(errorController.internalServerError);

// Start the server and listen on the defined port
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});