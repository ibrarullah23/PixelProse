import express from 'express';
import { deleteAccount, getUserDetails, getUsers, login, register, updateProfile } from '../controllers/userController.js';
import handelDuplicate from '../middlewares/handelDuplicate.js';
import authMiddleware, { getMe } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', handelDuplicate, register);

// Login
router.post('/login', login);

router.get('/', getUsers);

router.get('/me', authMiddleware, getMe,  getUserDetails);

router.get('/:username', getUserDetails);

// Update profile (protected)
router.patch('/', authMiddleware, handelDuplicate, updateProfile);

// Delete account (protected)
router.delete('/', authMiddleware, deleteAccount);

export default router;
