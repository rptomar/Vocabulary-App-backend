const express = require('express');
const { addWord, getWords } = require('../wordController/controller');
const router = express.Router();
router.post('/add', addWord);
router.get('/get', getWords);
module.exports = router;
