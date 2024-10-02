const express = require('express');
const { addWord, getWords } = require('../wordController/controller'); 
const router = express.Router(); 

// POST request to add a new word
router.post('/add', addWord); 
// maps the '/add' endpoint to the `addWord` controller function
// when this route is hit, the `addWord` function in the controller will handle the request

// GET request to fetch all stored words
router.get('/get', getWords); 

module.exports = router; // Exporting the router to be used in other parts of the application
