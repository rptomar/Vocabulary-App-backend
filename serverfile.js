const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const wordRoutes = require('./appcontrolers/appRoutes/routes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/search/word', wordRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));
