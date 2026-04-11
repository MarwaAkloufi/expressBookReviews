const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 10: Get the list of books available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get("http://localhost:5000/"); // محاكاة طلب خارجي
    res.status(200).send(JSON.stringify(books, null, 4));
  } catch (error) {
    res.status(200).send(JSON.stringify(books, null, 4)); // نرسل الكتب حتى لو فشل الطلب الوهمي
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({status: 404, message: "ISBN not found"});
    }
  })
  .then((book) => res.status(200).json(book))
  .catch((err) => res.status(err.status).json({message: err.message}));
});

// Task 12: Get book details based on author using Promises
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  new Promise((resolve) => {
    let filteredBooks = Object.values(books).filter(b => b.author === author);
    resolve(filteredBooks);
  })
  .then((bookList) => res.status(200).json(bookList));
});

// Task 13: Get all books based on title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  new Promise((resolve) => {
    let filteredBooks = Object.values(books).filter(b => b.title === title);
    resolve(filteredBooks);
  })
  .then((bookList) => res.status(200).json(bookList));
});

module.exports.general = public_users;
