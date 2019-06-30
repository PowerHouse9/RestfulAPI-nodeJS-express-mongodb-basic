const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//you dont even need to mention /posts if its been done in postRoutes in app,js
// router.get('/posts', (req, res) => {
//     res.send('we are on Posts');
// });

router.get('/', async (req, res) => {
    try{
        //this returns all posts, you can add a filter by adding extra function if you want
        const posts = await Post.find();
        res.json (posts);
    }
    catch(err){
        res.json({message: err});
    }
});

// SUBMIT A POST

// Synchronous
// router.post('/', (req, res) => {
//     //to create a new post using the model
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });
//     //to save it on the database
//     post.save()
//     .then(data => {
//         res.json(data)
//     })
//     .catch (err => {
//         res.json({message: err});
//     });

// });

//Asynchronous
router.post('/', async (req, res) => {
    //to create a new post using the model
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    //to save it on the database
    const savedPost = await post.save();
    res.json(savedPost);
    }
    catch(err){
        res.json({message: err});
    }

});

// SPECIFIC POST
router.get('/:postId', async (req, res) => {
    // console.log(req.params.postId);
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    } 
    catch(err){
        res.json({message: err})
    }
});

//Delete a Post
router.delete('/:postId', async (req, res) => {
    try{
    const removedPost = await Post.remove({_id: req.params.postId });
    res.json(removedPost);
    }
    catch(err){
        res.json({message: err})
    }
});

//Update a Post
router.patch('/:postId', async (req, res) => {
    try{
    const updatedPost = await Post.updateOne({_id: req.params.postId }, 
        { $set: {title: req.body.title} }
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({message: err})
    }
});

module.exports = router;