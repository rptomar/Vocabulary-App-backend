const Word = require('../appModels/searchWord');
const axios = require('axios');
require('dotenv').config();

const addWord = async (req, res) => {
  const { word } = req.body;
  console.log('word:', word); // Debugging the received word
  console.log('Oxford API ID:', process.env.OXFORD_APP_ID); // Debugging the API credentials
  console.log('Oxford API Key:', process.env.OXFORD_APP_KEY);

  if (!word) {
    return res.status(400).json({ error: 'Word is required' });
  }

  const existingWord = await Word.findOne({ word });
  if (existingWord) {
    return res.json(existingWord);
  }

  try {
    const response = await axios.get(`https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-us/${word}`, {
      headers: {
        app_id: process.env.OXFORD_APP_ID,
        app_key: process.env.OXFORD_APP_KEY,
      },
    });

    console.log('Oxford API response:', response.data); // Debugging the API response

    const newWord = new Word({
      word,
      meaning: response.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],
      example: response.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text,
    });

    console.log('newWord', newWord); // Debugging the new word object
    await newWord.save();
    res.json(newWord);
  } catch (error) {
    console.error('Oxford API error:', error.response ? error.response.status : error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(500).json({ error: error.message });
  }
};

const getWords = async (req, res) => {
  const words = await Word.find();
  res.json(words);
};

module.exports = { addWord, getWords };
