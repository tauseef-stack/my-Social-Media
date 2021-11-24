const router = require('express').Router();
const Post = require('../models/post.model');
const User = require('../models/user.models');

//create post 
router.post('/', async (req, res) => {
    const post = await Post.create(req.body);
    try {
       res.status(201).json(post)
    }
    catch (err) {
      res.status(500).json('not able to generate post internally')
    }
})

//update post

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); //finding post
        if (req.body.userId === post.userId) {
            await post.updateOne({ $set: req.body });
            res.status(201).json('post has been updated successfully')
        }
        else {
            res.status(403).json('you cannot update others post')
        }
    }
    catch (err) {
        res.status(500).json('updtation denied internally in catch')
    }
})


//delete posts

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); //finding post
        if (req.body.userId === post.userId) {
            await post.deleteOne();
            res.status(201).json('post has been Deleted successfully')
        }
        else {
            res.status(403).json('you cannot dalete others post')
        }
    }
    catch (err) {
        res.status(500).json('deletion post denied internally in catch')
    }
})

//like posts

router.put('/:id/likes', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            
            res.status(201).json('you liked the post')
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(201).json('you remove like from the post') 
        }
    }
    catch (err) {
        res.status(500).json('liking post denied internally in catch')
    }
  
})
//get a single post

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json('not able to get single post internally')
    }
})

//timeline ==> my and my followings all post ==> v.imp  ==>

router.get('/timeline/:userId', async (req, res) => {
    try {
      
        const currentUser = await User.findById(req.params.userId); //getting 
       // console.log(currentUser);
        const userPosts = await Post.find({ userId: currentUser._id }) //getting all post  posted by user himself
        const friendPost = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )
        res.status(200).json(userPosts.concat(...friendPost))
    }
    catch (err) {
        res.status(500).json('not able to get timeline posts internally')
    }
})

//get all posts of single user ==>

router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
        
    }
    catch (err) {
        res.status(500).json("not able to find user's all post internally");
    }
})



module.exports = router;