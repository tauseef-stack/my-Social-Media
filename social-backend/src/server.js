const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const connect = require('./configs/db'); //connection with mongo ==> at top =>
const app = express();

app.use("/images", express.static(path.join(__dirname,"/public/images")));
//console.log(    (__dirname + "/public/images"));


//middle wares==>

app.use(express.json());
app.use(cors());



//manipulate get request of this path and move it to the existing folder ==>


//file uploads ==>

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/images");
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    },
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File Uploaded successfully")
    } catch (err) {
        console.log(err)
    }
});



const userAuthController = require('./controllers/user.auth.controller');
const userController = require('./controllers/user.controller');
const postController = require('./controllers/post.controller');
const conversationController = require('./controllers/conversation.controller');
const messageController = require('./controllers/message.controller');

app.use('/api/auth', userAuthController);
app.use('/api/user', userController);
app.use('/api/post', postController);
app.use('/api/conversation', conversationController); 
app.use('/api/message', messageController);

app.listen(process.env.PORT_KEY, async () => {
    await connect();
    console.log(`listening to port ${process.env.PORT_KEY}`);
})