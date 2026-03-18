"use strict" // Enforces strict mode for better error checking

const fs = require("fs"), // Imports the file system module for file operations
    httpStatus = require("http-status-codes"), // Imports HTTP status codes for responses
    contentTypes = require("./contentTypes"); // Imports content type definitions from a local module

module.exports = {
    // Exports an object with utility functions

    getFile: (file, res) => {
        // Defines a function to read and serve a file

        fs.readFile(`./${file}`, (error, data) => {
            // Reads the specified file asynchronously

            if (error) {
                // Checks if there was an error reading the file

                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,
                    contentTypes.html);
                // Sends a 500 Internal Server Error response with HTML content type

                res.end("There was an error serving content!");
                // Ends the response with an error message
            }

            res.end(data);
            // Ends the response by sending the file data (if no error)
        });
    }
};