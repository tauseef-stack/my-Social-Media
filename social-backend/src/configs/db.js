const mongoose = require('mongoose');
require('dotenv').config();
const connect = () => {
    return mongoose.connect(process.env.DATA_BASE_URL).then((res) => {
        console.log('dataBase connection is successfull')
    }).catch((err) => {
        console.log('failed to connect dataBase')
    })
};

module.exports = connect;

//'mongodb+srv://tauseef:tauseef@cluster0.8f5hl.mongodb.net/social-media?retryWrites=true&w=majority'