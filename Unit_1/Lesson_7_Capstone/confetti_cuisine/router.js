"use strict" // Enforces strict mode for better error checking

const httpStatus = require("http-status-codes"), // Imports HTTP status codes
    contentTypes = require("./contentTypes"),     // Imports content type mappings
    utils = require("./utils");  // Imports utility functions

const routes = {
    "GET": {},   // Stores GET route handlers
    "POST": {}   // Stores POST route handlers
};

exports.handle = (req, res) => { // Main request handler for the server
    try {
        routes[req.method][req.url](req, res); // Calls the route handler based on method and URL
    } catch (e) {
        res.writeHead(httpStatus.OK, contentTypes.html); // On error, send HTML error page
        utils.getFile("views/error.html", res);
    }
};

exports.get = (url, action) => { // Registers a GET route handler
    routes["GET"][url] = action;
};

exports.post = (url, action) => { // Registers a POST route handler
    routes["POST"][url] = action;
};

