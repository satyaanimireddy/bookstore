// var express = require('express')
//cors ->cross origin resource  sharing
import express from "express";
import { PORT, dbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/BookModel.js";
import cors from "cors";
import router from "./routes/booksRoute.js";

var app = express();

//middleware to parse body

app.use(express.json()); // parsing front-end nundi vache data ni

//middleware to unlock cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello how are you iam from backend");
});

// books
app.use("/books", router);

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(PORT, () => {
      console.log(`server started in ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
