// Listing 11.2 to 11.3, and 11.5

// Middleware to log errors
exports.logErrors = (error, req, res, next) => {
    // Logs the full error stack trace to the console for debugging purposes
    console.error(error.stack);     
    // Passes the error to the next middleware function in the chain
    next(error);                    
};

const httpStatus = require("http-status-codes");    // Import HTTP status codes for standard response status handling

// Handler for 404 - Resource Not Found
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.StatusCodesNOT_FOUND;  // 404 status code
    res.status(errorCode);  // Set the responsse status to 404
    // Serve a static HTML page for 404 errors
    res.sendFile(`./public/${errorCode}.html`, {
      root: "./"  // Set the root directory for resolving the file path 
    });
};

// Handler for 500 - Internal Server Error 
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;  // 500 status code 
    // Log the error stack trace for debugging
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);  // Set the response status to 500
    // Send a generic error message to the client 
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};