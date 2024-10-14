import express from 'express';
import { addNewPost, deletePost, getAllPosts, getPostById, getPostsByUserId, updatePost } from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

// const authMiddleware = ()=>{naxt()} //

// Get all posts
router.get('/', getAllPosts);
router.get('/posts/:userId', getPostsByUserId);

router.get('/:postId', getPostById);

// Add new post
router.post('/', authMiddleware, addNewPost);

// Update post
router.patch('/:postId', authMiddleware, updatePost);

// Delete post
router.delete('/:postId', authMiddleware, deletePost);


export default router;