const express = require('express');
const serverless = require('serverless-http');
const axios = require('axios');

const app = express();

const getMovie = async (firstLetter, searchQuery) => {
  try {
    const res = await axios.get(
      `https://v2.sg.media-imdb.com/suggestion/${firstLetter}/${searchQuery}.json`
    );
    return res.data || [];
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return [];
  }
};

app.get('/movie/:firstLetter/:searchQuery', async (req, res) => {
  const { firstLetter, searchQuery } = req.params;
  
  try {
    const movie = await getMovie(firstLetter, searchQuery);
    console.log('Movie data:', movie);
    res.json(movie);
  } catch (error) {
    console.error('Error in movie route:', error);
    res.status(500).json({ error: 'An error occurred while fetching the movie data' });
  }
});

// Add a root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Movie Search API is running' });
});

module.exports.handler = serverless(app);