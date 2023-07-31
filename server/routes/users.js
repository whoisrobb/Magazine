import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { createPost } from "../controllers/post.js"

const router = express.Router()


/* GET ALL THE POSTS */
router.get('/posts', (req, res) => {
    res.send(test)
})


/* GET ONE POST */


/* CREATE A POST */
router.post('/create', createPost)


/* UPDATE A POST */


/* DELETE A POST */


export default router