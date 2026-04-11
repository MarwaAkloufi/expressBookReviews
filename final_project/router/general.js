const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 10: Get all books using Async/Await and Axios
public_users.get('/', async function (req, res) {
    try {
        // نستخدم Promise.resolve لمحاكاة عملية غير متزامنة مع البيانات المحلية
        const getBooks = await Promise.resolve(books);
        res.status(200).send(JSON.stringify(getBooks, null, 4));
    } catch (error) {
        res.status(500).json({message: "Error retrieving books"});
    }
});

// Task 11: Get book details based on ISBN using Promises and Axios style
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const getBookByISBN = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject({status: 404, message: "Book not found"});
        }
    });

    getBookByISBN
        .then((book) => res.status(200).json(book))
        .catch((err) => res.status(err.status).json({message: err.message}));
});

// Task 12: Get book details based on author using Async/Await
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const getBooksByAuthor = await Promise.resolve(
            Object.values(books).filter(book => book.author === author)
        );
        res.status(200).json(getBooksByAuthor);
    } catch (error) {
        res.status(500).json({message: "Error retrieving books by author"});
    }
});

// Task 13: Get all books based on title using Promises
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const getBooksByTitle = new Promise((resolve) => {
        const filtered = Object.values(books).filter(book => book.title === title);
        resolve(filtered);
    });

    getBooksByTitle.then((result) => res.status(200).json(result));
});

module.exports.general = public_users;
