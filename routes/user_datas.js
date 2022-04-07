const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const Data = require('../models/User_data');

// ROUTE 1: Get All the Datas using: GET "/fetchdatas". Login required
router.get('/fetchdatas', fetchuser, async (req, res) => {
    try {

        const userDetails = await User.findById(req.user.id);
        const datas = await Data.find({ user: req.user._id });
        //IF there is no data in userdata then for displaying the page just make a blank temprory data to avoid the error
        if (!datas) {
            datas = { title: '', description: '' };
        }
        res.json({userDetails,datas});
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 2: Add a new Data using: POST "/adddata". Login required
router.post('/adddata', fetchuser, async (req, res) => {
    try {
        const { title, description } = req.body;

        const data = new Data({
            title, description, user: req.user.id
        })
        const saveddata = await data.save();
        res.json(saveddata)
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 3: Update an existing Data using: PUT "/updatedata". Login required
router.put('/updatedata/:id', fetchuser, async (req, res) => {
    const { title, description } = req.body;
    try {
        // Create a newData object
        const newData = {};
        if (title) { newData.title = title };
        if (description) { newData.description = description };

        // Find the data to be updated and update it
        let data = await Data.findById(req.params.id);

        if (!data) { return res.status(404).send("Not Found") }


        if (data.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        data = await Data.findByIdAndUpdate(req.params.id, newData, { new: true })
        res.json({ "Success": data });
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 4: Delete an existing Data using: DELETE "/deletedata". Login required
router.delete('/deletedata/:id', fetchuser, async (req, res) => {
    try {
        // Find the data to be delete and delete it
        let data = await Data.findById(req.params.id);
        if (!data) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Data
        if (data.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        data = await Data.findByIdAndDelete(req.params.id)
        res.json({ "Deleted": data });
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})
module.exports = router