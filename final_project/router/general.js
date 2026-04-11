const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();
const axios = require('axios');

// Task 10: Get all books using Async/Await
public_users.get('/', async function (req, res) {
    try {
        const response = await Promise.resolve(books);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Error retrieving books"});
    }
});

// Task 11: Get book details based on ISBN using Async/Await
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const book = await Promise.resolve(books[isbn]);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: "Book not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Error"});
    }
});

// Task 12: Get book details based on author using Async/Await
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const filteredBooks = await Promise.resolve(Object.values(books).filter(b => b.author === author));
        res.status(200).json(filteredBooks);
    } catch (error) {
        res.status(500).json({message: "Error"});
    }
});

// Task 13: Get all books based on title using Async/Await
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const filteredBooks = await Promise.resolve(Object.values(books).filter(b => b.title === title));
        res.status(200).json(filteredBooks);
    } catch (error) {
        res.status(500).json({message: "Error"});
    }
});

module.exports.general = public_users;
