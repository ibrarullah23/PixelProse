import User from '../models/User.js';

export default async (req, res, next) => {
    const { username, email } = req.body;
    const errors = [];

    try {
        if (username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                // errors.duplicate = { ...errors.duplicate }
                // errors.duplicate.username = 'Username already exists';
                errors.push('Username');
            }
        }
        
        if (email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                // errors.duplicate = { ...errors.duplicate }
                // errors.duplicate.email = 'Email already exists';
                errors.push('Email')
            }
        }

        if (errors.length > 0) {
            return res.status(409).json(errors);
        } else{
            next();
        }

    } catch (error) {
        res.status(500).json({ error});
    }
};
