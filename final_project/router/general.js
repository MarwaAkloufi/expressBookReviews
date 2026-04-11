const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 10: Get all books using Promise & Axios style
public_users.get('/', function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
    });
    getBooks.then(() => console.log("Task 10 resolved using Promise"));
});

// Task 11: Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const getBook = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(res.status(200).json(books[isbn]));
        } else {
            reject(res.status(404).json({message: "Book not found"}));
        }
    });
    getBook.then(() => console.log("Task 11 resolved"));
});

// Task 12: Get book details based on author using Promise
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const getAuthor = new Promise((resolve) => {
        let filtered = Object.values(books).filter(b => b.author === author);
        resolve(res.status(200).json(filtered));
    });
    getAuthor.then(() => console.log("Task 12 resolved"));
});

// Task 13: Get all books based on title using Promise
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const getTitle = new Promise((resolve) => {
        let filtered = Object.values(books).filter(b => b.title === title);
        resolve(res.status(200).json(filtered));
    });
    getTitle.then(() => console.log("Task 13 resolved"));
});

module.exports.general = public_users;
