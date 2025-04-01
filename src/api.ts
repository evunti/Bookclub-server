const express = require("express");
const apiRouter = express.Router();

const booksRouter = require("./books");

apiRouter.use("/books", booksRouter);

module.exports = apiRouter;
