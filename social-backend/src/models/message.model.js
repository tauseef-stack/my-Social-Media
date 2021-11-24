const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Message = mongoose.model("message", messageSchema); //messageCollections==>

module.exports = Message;

