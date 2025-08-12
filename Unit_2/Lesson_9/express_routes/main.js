// Listing 9.7

const port = 3000,
  homeController = require("./controllers/homeController"),
  express = require("express"),
  app = express();

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  console.log("Query parameters:", req.query);
  next();
});

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.post("/", (req, res) =>  {
  console.log("Body request:", req.body);                 
  console.log("Query request:", req.query);            
  res.send("POST Successful!");
});

app.post("/contact", (req, res) => {
  res.send("Contact information submitted successfully.");
});

app.get("/", (req, res) => {
    res.send("INDEX");
});

app.use(express.static("public"));

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/items/:vegetable", homeController.sendReqParam);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


// //Listing 9.5

// const homeController = require("./controllers/homeController");

// const port = 3000,
//   express = require("express"),
//   app = express();

// app.use(
//   express.urlencoded({
//     extended: false
//   })
// ); 
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`request made to: ${req.url}`);
//   next();
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
//   console.log(req.query);
//   res.send("POST Successful!");
// });

// app.get("/items/:vegetable", (req, res) => {
//   let veg = req.params.vegetable;
//   res.send(`This is the page for ${veg}`);
// });

// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });


// //Listing 9.4

// const port = 3000,
//   express = require("express"),
//   app = express();

// app.use((req, res, next) => {
//   console.log(`request made to: ${req.url}`);
//   next();
// });

// app.get("/items/:vegetable", (req, res) => {
//   let veg = req.params.vegetable;
//   res.send(`This is the page for ${veg}`);
// });

// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });



// //Listing 9.3

// const port = 3000,
//   express = require("express"),
//   app = express();

// app.get("/items/:vegetable", (req, res) => {
//   let veg = req.params.vegetable;
//   res.send(`This is the page for ${veg}`);
// });

// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });


