import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    photo: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type:  mongoose.Schema.Types.Mixed, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);