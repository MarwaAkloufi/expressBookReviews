const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Registering a new user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Task 10: Get all books using Promise
public_users.get('/',function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 4)));
  });
  get_books.then(() => console.log("Task 10 resolved"));
});

// Task 11: Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const get_book = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(res.send(books[isbn]));
    } else {
      reject(res.send("Book not found"));
    }
  });
  get_book.then(() => console.log("Task 11 resolved"));
 });
  
// Task 12: Get book details based on author using Promise
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const get_author = new Promise((resolve, reject) => {
    let booksbyauthor = Object.values(books).filter((book) => book.author === author);
    resolve(res.send(JSON.stringify(booksbyauthor, null, 4)));
  });
  get_author.then(() => console.log("Task 12 resolved"));
});

// Task 13: Get all books based on title using Promise
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const get_title = new Promise((resolve, reject) => {
    let booksbytitle = Object.values(books).filter((book) => book.title === title);
    resolve(res.send(JSON.stringify(booksbytitle, null, 4)));
  });
  get_title.then(() => console.log("Task 13 resolved"));
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
