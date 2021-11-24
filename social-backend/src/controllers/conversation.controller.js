const router = require('express').Router();

const Conversation = require('../models/conversation.model.js');

//new Conversation ==>

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId],
    });
    try {
        const saveConversation = await newConversation.save();
        res.status(201).json(saveConversation);
    } catch (err) {
        res.status(500).json("Conversational Id's cannot be saved Internally")
    }
});



//get conversation of user ==> (All the conversation which has my Id will return into this)

router.get("/:userId", async (req, res) => {
    try {
        const myconversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(myconversation);
    } catch (err) {
        res.status(500).json("cannot send your personal chat internally")
    }
});

//get conversation includes 2 user Id's ==>
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] }
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json("not able to get users chat internally")
    }
})

module.exports = router;