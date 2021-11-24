const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user.models');

//register ==>
router.post('/register', async (req, res) => {
    try {
     
        const user = await User.create(req.body);
      
     return res.status(201).json({ user });
     
    } catch (err) {
        res.status(500).json(err)
    }
});

//login ==>

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        !user && res.status(404).send({ message: 'user not found' });
    
        const validPass = await bcrypt.compare(req.body.password, user.password);
        !validPass && res.status(400).json('wrong password');
    
        res.status(200).json(user)
     } catch (err) {
      res.status(500).json(err)
    }

})



module.exports = router;