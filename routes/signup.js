const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
  try {
    // Check whether the user with this email exists already
    // let user = await User.findOne({ email: req.body.email });
    // if (user) {
    //   return res.status(400).json({ error: "Sorry a user with this email already exists" })
    // }
    // const salt = await bcrypt.genSalt(10);
    // const secPass = await bcrypt.hash(req.body.password, salt);
    console.log(req.body.name);
    const secPass = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      phone:req.body.phone,
      address:req.body.address
    });
    // res.json("Registration Success");
    var props ={title:"Signup",msg:"Registration Success Login<a href='/login'>here</a>"}
    res.render('signup.hbs',props);
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
})
module.exports = router