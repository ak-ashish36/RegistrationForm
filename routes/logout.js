const express = require('express');
const router = express.Router();
var fetchuserId = require('../middleware/fetchuser');

router.get('/logout', fetchuserId, (req, res) => {
  res.clearCookie('jwtc');
  // res.json("Logout Success");
  var props = { title: "Homepage" }
  res.render('index.hbs', props);
})

module.exports = router