import express from 'express';
import { getAllPosts, getPostById } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);

export default postRouter;