// Init
const express = require("express");
const cors = require("cors");
const path = require("path");

// Common Middleware
module.exports = (app) => {
  app.use(cors({ origin: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    express.static(path.join(__dirname, "../", "client", "build"), {
      maxAge: 604800,
    })
  );
  app.get("/", (req, res) => {
    res.sendFile(
      express.static(
        path.join(__dirname, "../", "client", "build", "index.html")
      )
    );
  });
};
