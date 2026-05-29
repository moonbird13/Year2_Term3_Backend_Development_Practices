import { articles as posts } from '../models/data.js';

const getAllPosts = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: posts
    });
}

const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found'
        });
    }
    return res.status(200).json({
        success: true,
        data: post
    });
}

export { getAllPosts, getPostById };