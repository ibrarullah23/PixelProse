import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createSecretToken } from '../utils/jwt.js';
import _ from 'lodash';
import 'dotenv/config';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); 

        if (!user) {
            return res.status(400).json({ error: '⚠ User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password); // compare pass
        if (!isMatch) {
            return res.status(400).json({ error: '⚠ Wrong Password!' });
        }

        const token = createSecretToken(user.id,user.username, user.role)

        res
            .cookie("token", token, {
                // expires: new Date(Date.now() + 900000), // Optional: Cookie expires in 15 minutes
                secure: true,
                httpOnly: true
            })
            .status(200)
            .json(_.omit(user.toObject(), ['password']) );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = new User({ username, password, email });
        const user = await newUser.save();

        const token = createSecretToken(user.id,user.username, user.role)

        res.cookie("token", token, {
                // expires: new Date(Date.now() + 900000), // Optional: Cookie expires in 15 minutes
                secure: true,
                httpOnly: true
            }).status(201).json( _.omit(user.toObject(), ['password']));
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: `${Object.keys(error.keyPattern)} already exists` });
        }
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(404).json({ message: 'No Users Found' });
        }

        res.status(200).json( users );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json( _.omit(user.toObject(), ['password']) );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { userId, username, email, bio, profileImage, socialLinks, password } = req.body;

        const updateCondition = { _id: req.user._id };

        if (req.user.role === 'Admin') {
            updateCondition._id = userId;
        }

        const updatedUser = await User.findOneAndUpdate(
            updateCondition,
            { username, email, bio, profileImage, socialLinks, password },
            { new: true }
        );

        res.status(200).json({ user:  _.omit(updatedUser.toObject(), ['password']), message: 'Update Successfull' });
    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({ error: `${Object.keys(error.keyPattern)} already exists` });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { userId } = req.body

        const deleteCondition = { _id: req.user._id };

        if (req.user.role === 'Admin') {
            deleteCondition._id = userId;
            if (userId === req.user._id) {
                return res.status(400).json({ error: '⚠ Restricted' });
            }
        }

        const deletedUser = await User.findOneAndDelete(deleteCondition);

        if (!deletedUser) {
            return res.status(404).json({ error: '⚠ User not found!' });
        }

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
