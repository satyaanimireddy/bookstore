import express from "express";

import { Book } from "../Models/BookModel.js";

var router = express.Router();

//route for save a new book to db

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send("Required all fields i.e title, author, publish year");
    }
    var newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    var book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//Route for get all books db

router.get("/", async (req, res) => {
  try {
    var books = await Book.find({});
    return res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for getting single book

router.get("/:id", async (req, res) => {
  try {
    var { id } = req.params;
    var book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route for Delete a book

router.delete("/:id", async (req, res) => {
  try {
    var { id } = req.params;
    var result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({ message: "Book not found" });
    }
    return res
      .status(200)
      .send({ message: "Book deleted successfully from db" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route for update a book in db

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Some error in frontend");
    }

    var { id } = req.params;
    var result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).send({ message: "Book not found" });
    }
    return res
      .status(200)
      .send({ message: "Book updated successfully from db" });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
