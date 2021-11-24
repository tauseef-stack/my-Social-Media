const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
    }
}, {
    timestamps: true,
    versionKey: false,
});

const Conversation = mongoose.model("conversation", conversationSchema) //conversation Collection ==>

module.exports = Conversation;