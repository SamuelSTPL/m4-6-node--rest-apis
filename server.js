"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  accessAllClients,
  accessSingleClient,
  createNewClient,
  deleteClient,
} = require("./handlers/clientHandlers");
const {
  testing,
  wordToFind,
  returnStatus,
} = require("./handlers/hangmanHandlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // Client Endpoints
  //Access all clients
  .get("/clients", accessAllClients)

  //Access a single client based on id
  .get("/client/:id", accessSingleClient)

  //Create a new client
  .post("/newclient", createNewClient)

  //Delete an existing client
  .delete("/deleteclient/:id", deleteClient)

  //Hangman Endpoints
  //Testing purposes
  .get("/hangman/word/:id", testing)

  //Pick random word from array
  .get("/hangman/word", wordToFind)

  //Return status code
  .get("/hangman/word/:id/:letter", returnStatus)

  .listen(8000, () => console.log(`Listening on port 8000`));
