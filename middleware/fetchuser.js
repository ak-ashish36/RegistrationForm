var jwt = require('jsonwebtoken');
var Cookies = require('cookies');
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'ashishkumarguptacse2023';

const fetchuser = async (req, res, next) => {
    try {
        var cookies = new Cookies(req, res);
        var token = cookies.get('jwtc');
        if (!token) {
            // res.status(401).send({ error: "Please authenticate using a valid token" })
            var props = { title: "Login", msg: "Please Login First" }
            res.render('login.hbs', props);
            return;
        }
        const data = jwt.verify(token, JWT_SECRET);
        const userDetails = await User.findById(data);
        req.user = userDetails;
        next();
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
}
module.exports = fetchuser;