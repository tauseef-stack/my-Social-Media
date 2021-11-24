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

router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ?  await User.findById(userId) : await User.findOne({userName:username});

        const { password, updatedAt,email, ...other } = user._doc; //awesome route=> send only credentials things

        res.status(200).json(other);
    }
    catch (err) {
        res.status(403).json('you can only get yours account');
    }
})

//get All users ==> see
router.get("/allusers", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
     } catch (err) {
    res.status(500).json("cannot get all users internally")
    }
})

//get friends data for profile page ==>
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        ); //return all data of friends==>
      //we are only required username password ==>
        const friendList = [];
        friends.map(friend => {
            const { _id, userName, profilePicture } = friend;
            friendList.push({ _id, userName, profilePicture });
        })
        res.status(200).json(friendList);
     } catch (err) {
        res.status(500).json("not able to get friends data internally")
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

            res.status(201).json('follwing addeded sucessfully')
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
