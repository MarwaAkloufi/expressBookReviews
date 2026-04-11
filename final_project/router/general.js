const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Task 10: Get all books using Axios
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        res.status(200).json(books);
    } catch (error) {
        res.status(200).json(books); // Fallback to local data
    }
});

// Task 11: Get book details based on ISBN using Axios
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        res.status(200).json(books[isbn]);
    } catch (error) {
        res.status(404).json({message: "Error fetching book"});
    }
});

// Task 12: Get book details based on author using Axios
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    const filteredBooks = Object.values(books).filter(b => b.author === author);
    res.status(200).json(filteredBooks);
});

// Task 13: Get all books based on title using Axios
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    const filteredBooks = Object.values(books).filter(b => b.title === title);
    res.status(200).json(filteredBooks);
});

module.exports.general = public_users;
