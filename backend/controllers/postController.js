import Post from '../models/Post.js';

// Get all posts
// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate('author', '_id username profileImage');
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .populate('author', '_id username profileImage')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    if (posts.length === 0) {
      return res.status(200).json({
        message: 'No more posts',
        posts: [],
        hasMore: false,
      });
    }

    res.status(200).json({
      posts,
      hasMore: (page * limit) < totalPosts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



export const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate('author', '_id username profileImage');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Add new post
export const addNewPost = async (req, res) => {
  try {
    const { photo, title, subtitle, content } = req.body;
    const newPost = new Post({
      photo,
      title,
      subtitle,
      content,
      author: req.user.id
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { photo, title, subtitle, content } = req.body;

    const updateCondition = { _id: postId };
    if (req.user.role !== 'Admin') {
      updateCondition.author = req.user._id;
    }

    const updatedPost = await Post.findOneAndUpdate(
      updateCondition,
      { photo, title, subtitle, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to update this post' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const deleteCondition = { _id: postId };

    if (req.user.role !== 'Admin') {
      deleteCondition.author = req.user._id;
    }

    const deletedPost = await Post.findOneAndDelete(deleteCondition);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to delete this post' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
