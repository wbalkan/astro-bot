const express = require('express');
const router = express.Router();
const axios = require('axios'); // Require Axios

router.post('/horoscope', (req, res) => {
  const url = `https://ohmanda.com/api/horoscope/${req.body.sign}`;
  axios
    .get(url) // Use Axios to make a GET request
    .then(response => {
      res.send(JSON.stringify(response.data));
    })
    .catch(error => {
      res.status(500).send('API request failed');
    });
});

module.exports = router;
