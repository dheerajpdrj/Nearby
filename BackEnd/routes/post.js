const express = require ("express");
const router = express.Router();
const { authUser } = require('../middleware/auth');
const {createPost, getAllPost}= require('../controllers/post')


router.post('/createPost', authUser , createPost);
router.get('/getAllPosts', getAllPost)

module.exports = router; 