const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Task 6: تسجيل مستخدم جديد
public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
    if (username && password) {
      if (!users.find(u => u.username === username)) {
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });



  
  // Task 5: الحصول على المراجعات
  public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
  });

module.exports.general = public_users;
