const Word = require('../appModels/searchWord'); 
const axios = require('axios');
require('dotenv').config();

const addWord = async (req, res) => {
  const { word } = req.body; // extract the 'word' from the request body
  console.log('word:', word); // ddebugging the received word from the client

  console.log('Oxford API ID:', process.env.OXFORD_APP_ID); // debugging the API credentials (App ID)

  console.log('Oxford API Key:', process.env.OXFORD_APP_KEY); // debugging the API credentials (App Key)

  if (!word) {
    return res.status(400).json({ error: 'Word is required' }); // if no word is provided, return a 400 Bad Request
  }

  // checking if the word already exists in the local MongoDB database
  const existingWord = await Word.findOne({ word });

  if (existingWord) {

    return res.json(existingWord); // if found, return the existing word from the database
  }

  try {

    // =making a request to the Oxford API to fetch the word's details
    const response = await axios.get(`https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-us/${word}`, {
      headers: {
        app_id: process.env.OXFORD_APP_ID, // using API credentials from environment variables
        app_key: process.env.OXFORD_APP_KEY,
      },
    });

    console.log('Oxford API response:', response.data); // debugging the response from Oxford API

    // crreating a new Word object with the retrieved meaning and example from the API response
    const newWord = new Word({

      word,
      meaning: response.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],//set data in data base according to get data from oxford api 
      example: response.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text,
    });

    console.log('newWord', newWord); // deebugging the newly created word object
    await newWord.save(); // savingthe new word to MongoDB

    res.json(newWord); // sending the new word back to the client as the response
  } catch (error) {

    // handling errors and printing useful debug information
    console.error('Oxford API error:', error.response ? error.response.status : error.message); // debugging the status code of the error


    console.error('Error details:', error.response ? error.response.data : 'No response data'); // debugging the error details from the response

    res.status(500).json({ error: error.message }); // returning a 500 Internal Server Error with the error message
  }
};

const getWords = async (req, res) => {
  const words = await Word.find(); // Fetching all words from the MongoDB collection

  res.json(words); // Sending the list of words as the response
};

module.exports = { addWord, getWords }; // Exporting the addWord and getWords functions for use in routes
