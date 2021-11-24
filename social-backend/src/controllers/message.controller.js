const router = require('express').Router();

const Message = require('../models/message.model.js');

//add messages to DB ==>
router.post("/", async (req, res) => {
      const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json("Cannot post message internally")
    }
})


//get All Messages of Same Conversation from DB ==>
router.get("/:conversationId", async (req, res) => {
    try {
        const allMessage = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(allMessage);
    }
    catch (err) {
        res.status(500).json("Cannot get messages internally")
    }
})

module.exports = router;