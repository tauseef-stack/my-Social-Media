const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 500,
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    }
}, {
    versionKey: false,
    timestamps:true,
});

const Post = mongoose.model('post', postSchema); //post collection

module.exports = Post; 
