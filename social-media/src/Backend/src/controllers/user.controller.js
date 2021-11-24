const express = require('express');
const User = require('../models/user.models');
const router = express.Router();
const bcrypt = require('bcryptjs');

//update userInformation if he is authenticate himself==>

router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) { //if we are updating password
            try {
                req.body.password = await bcrypt.hash(req.body.password, 8); //conversion of password
                // console.log(req.body.password);
            }
            catch (err) {
                res.status(500).json('internal updation error1')
            }
        }
        try { //if we are udating anthing other than password
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json('internal updation error2')
        }
    }
    else {
        res.status(403).json('you can only update your account');
    }
});

//deleting user account by himself ==>

router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
       
        try { 
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json('internal deletion error');
        }
    }
    else {
        res.status(403).json('you cant delete others account');
    }
});


//get a user => 

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const { password, updatedAt,email, ...other } = user._doc; //awesome route=> send only credentials things

        res.status(200).json(other);
    }
    catch (err) {
        res.status(403).json('you can only get yours account');
    }
})

//follow user ==> awesome route ==>

router.put('/:id/follow', async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            let tobefollow = await User.findById(req.params.id);
        let currentUser = await User.findById(req.body.userId);
        if (!tobefollow.followers.includes(req.body.userId)) {
           await tobefollow.updateOne({ $push: { followers: req.body.userId } })
           await currentUser.updateOne({ $push: { followings: req.params.id } });

            res.status(201).json('follwing added sucessfully')
        }
        else {
            res.status(403).json('you have already followed him')
        }
        }
        catch (err) {
            res.status(500).json('not able to genrate follwings internally')
        }   
    }
    else {
        res.status(403).json('you cannot follow yourself')
    }
})

//unfollow a user ==> see the beauty =>

router.put('/:id/unfollow', async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            let tobefollow = await User.findById(req.params.id);
            let currentUser = await User.findById(req.body.userId);
        if (tobefollow.followers.includes(req.body.userId)) {
           await tobefollow.updateOne({ $pull: { followers: req.body.userId } })
           await currentUser.updateOne({ $pull: { followings: req.params.id } });

            res.status(201).json('follwing removed sucessfully')
        }
        else {
            res.status(403).json('you have already not folllwing him how will you unfollow him')
        }
        }
        catch (err) {
            res.status(500).json('not able to genrate follwings internally')
        }   
    }
    else {
        res.status(403).json('you cannot unfollow yourself')
    }
})

module.exports = router;

//
