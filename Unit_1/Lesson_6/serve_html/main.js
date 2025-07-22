// Listing 6.6

// Set the port the server will listen on
const port = 3000,

  // Require the built-in http module to create the server 
  http = require("http"),

  // Require the http-status-codes module for readable status codes (eg 200 OK)
  httpStatusCodes = require("http-status-codes"),

  // Import custom router module to handle routing logic
  router = require("./router"),

  // File system module to read files (eg HTML)
  fs = require("fs"),

  // Content-Type header for plain text responses 
  plainTextContentType = {
    "Content-Type": "text/plain"
  },

  // Content-Type header for HTML responses 
  htmlContentType = {
    "Content-Type": "text/html"
  },

  // Helper function to read a file and send its contents in the response 
  customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
      if (errors) {
        console.log("Error reading the file...");
      }
      // send the file content as the response
      res.end(data);
    });
  };

// Define a GET route for the root path "/"
router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("INDEX");
});

// Define a GET route for "/index.html"
router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  // Read and serve the HTML file 
  customReadFile("views/index.html", res);
});

// Define a POST route for the root path "/"
router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("POSTED"); // Respond to POST requests 
});

// Create an HTTP server using the router's request handler and listen on port 3000
http.createServer(router.handle).listen(3000);

// Log to the console that the server is running
console.log(`The server is listening on port number: ${port}`);



// //Listing 6.4
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   fs = require("fs");

// const routeMap = {
//   "/": "views/index.html"
// };

// const sendErrorResponse = res => {
//   res.writeHead(httpStatus.NOT_FOUND, {
//     "Content-Type": "text/html"
//   });
//   res.write("<h1>File Not Found!</h1>");
//   res.end();
// };

// http
//   .createServer((req, res) => {
//   let url = req.url; 
//   if (url.indexOf(".html") !== -1) {
//     res.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html"
//     });
//     customReadFile(`./views${url}`, res);
//   } else if (url.indexOf(".js") !== -1) {
//     res.writeHead(httpStatus.OK, {
//       "Content-Type": "text/javascript"
//     });
//     customReadFile(`./public/js${url}`, res);
//   } else if (url.indexOf(".css") !== -1) {
//     res.writeHead(httpStatus.OK, {
//      "Content-Type": "text/css"
//     });
//     customReadFile(`./public/css${url}`, res);
//   } else if (url.indexOf(".png") !== -1) {
//     res.writeHead(httpStatus.OK, {
//       "Content-Type": "image/png"
//     });
//     customReadFile(`./public/images${url}`, res);
//   } else {
//     sendErrorResponse(res);
//   }
// })
// .listen(3000);
// console.log(`The server is listening on port number: ${port}`);

// const customReadFile = (file_path, res) => {
//   if (fs.existsSync(file_path)) {
//     fs.readFile(file_path, (error, data) => {
//       if (error) {
//         console.log(error);
//         sendErrorResponse(res);
//         return;
//      }
//      res.write(data);
//      res.end();
//    });
//   } else {
//   sendErrorResponse(res);
//   }
// };



// //Listing 6.3
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   fs = require("fs");

// const routeMap = {
//   "/": "views/index.html"
// };

// const getViewUrl = (url) => {
//   return `views${url}.html`;
// };

// http.createServer((req, res) => {
//   let viewUrl = getViewUrl(req.url);
//   fs.readFile(viewUrl, (error, data) => {
//     if (error) {
//       res.writeHead(httpStatus.NOT_FOUND);
//       res.write("<h1>FILE NOT FOUND</h1>");
//     } else {
//       res.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html"
//       });
//       res.write(data);
//     }
//     res.end();
//   });
// })
// .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);



// //Listing 6.2
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   fs = require("fs");

// const routeMap = {
//   "/": "views/index.html"
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html"
//     });
//     if (routeMap[req.url]) {
//       fs.readFile(routeMap[req.url], (error, data) => {
//         res.write(data);
//         res.end();
//       });
//     } else {
//       res.end("<h1>Sorry, not found.</h1>");
//     }
//   })
//   .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);