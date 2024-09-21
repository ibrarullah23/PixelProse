import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    bio: { type: String, },
    profileImage: { type: String, },
    socialLinks: {
        linkedin: { type: String, },
        github: { type: String, }
    },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' }
}, { timestamps: true });

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model("User", UserSchema);