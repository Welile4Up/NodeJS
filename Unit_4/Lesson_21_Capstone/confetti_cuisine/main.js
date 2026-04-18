"use strict"; // Enforces stricter parsing and error handling in JavaScript

// Import required modules
const express = require("express"), // Web framework for Node.js
  layouts = require("express-ejs-layouts"), // Layout support for EJS templates
  app = express(), // Create Express app instance
  router = express.Router(), // Create a router instance
  homeController = require("./controllers/homeController"), // Handles home routes
  errorController = require("./controllers/errorController"), // Handles errors
  subscribersController = require("./controllers/subscribersController.js"), // Handles subscriber routes
  usersController = require("./controllers/usersController.js"), // Handles user routes
  coursesController = require("./controllers/coursesController.js"), // Handles course routes
  mongoose = require("mongoose"), // MongoDB ODM (Object-Document Mapper)
  methodOverride = require("method-override"); // Allows PUT & DELETE via forms

// Connect to MongoDB database
mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  { useNewUrlParser: true }
);
// Use new index creation logic (avoids deprecation warnings)
mongoose.set("useCreateIndex", true);

// Set application port (use environment variable if available)
app.set("port", process.env.PORT || 3000);
// Set view engine to EJS (for rendering templates)
app.set("view engine", "ejs");

// Middleware to allow HTTP method 
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"] // Override methods coming from POST and GET requests
  })
);

// Use EJS layout middleware
router.use(layouts);
// Serve static files from "public" directory (CSS, images, JS)
router.use(express.static("public"));

// Parse URL-encoded form data
router.use(
  express.urlencoded({
    extended: false
  })
);
// Parse JSON request bodies
router.use(express.json());

// HOME ROUTE
router.get("/", homeController.index);

// USER ROUTES (CRUD operations)
router.get("/users", usersController.index, usersController.indexView); // List users
router.get("/users/new", usersController.new); // Show form to create new user
router.post("/users/create", usersController.create, usersController.redirectView); // Create user
router.get("/users/:id/edit", usersController.edit); // Show edit form
router.put("/users/:id/update", usersController.update, usersController.redirectView); // Update user
router.get("/users/:id", usersController.show, usersController.showView); // Show single user
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView); // Delete user

// SUBSCRIBER ROUTES (CRUD operations)
router.get("/subscribers", subscribersController.index, subscribersController.indexView); // List subscribers
router.get("/subscribers/new", subscribersController.new); // Show form to create subscriber
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
); // Create subscriber
router.get("/subscribers/:id/edit", subscribersController.edit); // Show edit form
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
); // Update subscriber
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView); // Show one subscriber
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
); // Delete subscriber

// COURSE ROUTES (CRUD operations)
router.get("/courses", coursesController.index, coursesController.indexView); // List courses
router.get("/courses/new", coursesController.new); // Show form to create course
router.post("/courses/create", coursesController.create, coursesController.redirectView); // Create course
router.get("/courses/:id/edit", coursesController.edit); // Show edit form
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView); // Update course
router.get("/courses/:id", coursesController.show, coursesController.showView); // Show single course
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView); // Delete course

// ERROR HANDLING MIDDLEWARE
router.use(errorController.pageNotFoundError); // Handles 404 errors (page not found)
router.use(errorController.internalServerError); // Handles server errors (500)

// Mount router on root path
app.use("/", router);

// Start server and listen on defined port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
