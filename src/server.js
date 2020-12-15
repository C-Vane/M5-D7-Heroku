const port = process.env.PORT || 3001;
const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const { notFoundHandler, unauthorizedHandler, forbiddenHandler, badRequestHandler, catchAllHandler } = require("./errorHandling");
const booksRoutes = require("./services/books/index.js");
const server = express();
//SET UP SERVER
server.use(cors());
server.use(express.json());

// set up cors
/* const whiteList = process.env.NODE_ENV === "production" ? [process.env.FE_URL_PROD] : [process.env.FE_URL_DEV];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      // allowed
      callback(null, true);
    } else {
      // Not allowed
      callback(new Error("NOT ALLOWED - CORS ISSUES"));
    }
  },
};
server.use(cors(corsOptions));
 */
///APP ROUTES
server.use("/books", booksRoutes);
//HANDLE ERRORS
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

//console log endpoints for debuging
console.log(listEndpoints(server));

///server will listen on local on dev or online port on production
server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Running on cloud on port", port);
  } else {
    console.log("Running locally on port", port);
  }
});
