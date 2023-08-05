import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { createPost, deletePost, getAllPosts, getPostCat, getSinglePost, updatePost } from "../controllers/post.js"

const router = express.Router()


/* GET ALL THE POSTS */
router.get('/posts', getAllPosts)


/* GET POSTS CATEGORIES */
router.get('/posts/cat', getPostCat);


/* GET ONE POST */
router.get('/post/:id', getSinglePost)


/* CREATE A POST */
router.post('/create', createPost)


/* UPDATE A POST */
router.put('/update/:id', updatePost)


/* DELETE A POST */
router.delete('/delete/:id', deletePost)


export default router