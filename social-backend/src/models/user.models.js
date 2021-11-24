const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required:true
    },
    desc: {
        type: String,
        max:50,
    },
    city: {
        type: String,
        max:50,
    },
    from: {
        type: String,
        max:50,
    },
    relationship: {
        type: Number,
        enum:[1,2,3],
    },

}, {
    versionKey: false,
    timestamps:true,
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    this.password = bcrypt.hashSync(this.password, 8);
    next();
})

const User = mongoose.model('user', userSchema); //user collection

module.exports = User;