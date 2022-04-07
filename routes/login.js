const express = require('express');
const User = require('../models/User');
const router = express.Router();
var fetchuserId = require('../middleware/fetchuser');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');

const JWT_SECRET = process.env.JWT_SECRET || 'ashishkumarguptacse2023';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      // return res.status(400).json({ error: "Invalid Credentials" });
      var props = { title: "Login", msg: "Invalid Credentials" }
      res.render('login.hbs', props);
      return;
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      // return res.status(400).json({ error: "Invalid Credentials" });
      var props = { title: "Login", msg: "Invalid Credentials" }
      res.render('login.hbs', props);
      return;
    }
    //Creating Unique web token from Logged in user id
    const webtoken = jwt.sign(user.id, JWT_SECRET);
    //Stroring the web token in browser cookies
    var cookies = new Cookies(req, res)
    cookies.set('jwtc', webtoken, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true
    });
    res.redirect('/getuser')
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
});

// ROUTE 2: Get Loggedin User Details using: POST "/api/auth/getuser". Login required
router.get('/getuser', fetchuserId, async (req, res) => {

  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    // res.send(userDetails)
    var props = { title: "Welcome", userDetails}
    res.render('welcome.hbs', props);
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
})

module.exports = router