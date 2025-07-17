// Listing 5.7

// Map object that holds routes (URLs) and their corresponding HTML responses
const routeResponseMap = {
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us.</h1>",
  "/hello": "<h1>Say hello by emailing us here</h1>",
  "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
};

// Set the port number for the server to listen on
const port = 3000,

  // Require the built-in HTTP module
  http = require("http"),
  
  // Require the http-status-codes module for readable status codes
  httpStatus = require("http-status-codes"),

  // Create an HTTP server instance
  app = http.createServer((req, res) => {
    // Set response header with status code 200 (OK) and content type as HTML
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    
    // Check if the requested URL exists in the routeResponseMap
    if (routeResponseMap[req.url]) {
        // If it exists, delay the response by 2 seconds before sending the mapped content 
        setTimeout(() => {
            res.end(routeResponseMap[req.url]);
        }, 2000);
    } else {
      // If URL not found in map, send a default welcome message immediately
      res.end("<h1>Welcome!</h1>");
    }
  });

// Start the server and listen on the specified port
app.listen(port);

// Log a message to the console when the server starts successfully
console.log(`The server has started and is listening on port number: ${port}`);


// //Listing 5.6
// const routeResponseMap = {
//   "/info": "<h1>Info Page</h1>",
//   "/contact": "<h1>Contact Us</h1>",
//   "/about": "<h1>Learn More About Us.</h1>",
//   "/hello": "<h1>Say hello by emailing us here</h1>",
//   "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
// };

// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   app = http.createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html"
//     });

//     if (routeResponseMap[req.url]) {
//       res.end(routeResponseMap[req.url]);
//     } else {
//       res.end("<h1>Welcome!</h1>");
//     }
//   });

// app.listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);


// //Listing 5.5
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   app = http
//     .createServer((req, res) => {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html"
//       });
//       let responseMessage = "<h1>Welcome!</h1>";
//       res.end(responseMessage);
//     })
//     .listen(port);



// //Listing 5.4
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   app = http.createServer();

// app.on("request", (req, res) => {
//   var body = [];
//   req.on("data", (bodyData) => {
//     body.push(bodyData);
//   });
//   req.on("end", () => {
//    body = Buffer.concat(body).toString();
//    console.log(`Request Body Contents: ${body}`);
//   });

//   const getJSONString = obj => {
//     return JSON.stringify(obj, null, 2);
//   };
//   console.log(`Method: ${getJSONString(req.method)}`);
//   console.log(`URL: ${getJSONString(req.url)}`);
//   console.log(`Headers: ${getJSONString(req.headers)}`);

//   res.writeHead(httpStatus.OK, {
//     "Content-Type": "text/html"
//   });
//   let responseMessage = "<h1>This will show on the screen.</h1>";
//   res.end(responseMessage);
// });

// app.listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);



// //Listing 5.1 to 5.3
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   app = http.createServer();

// app.on("request", (req, res) => {
//   res.writeHead(httpStatus.OK, {
//     "Content-Type": "text/html"
//   });
//   let responseMessage = "<h1>This will show on the screen.</h1>";
//   res.end(responseMessage);

//   const getJSONString = obj => {
//     return JSON.stringify(obj, null, 2);
//   };
//   console.log(`Method: ${getJSONString(req.method)}`);
//   console.log(`URL: ${getJSONString(req.url)}`);
//   console.log(`Headers: ${getJSONString(req.headers)}`);
// });

// app.listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);
