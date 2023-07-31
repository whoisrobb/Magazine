import Post from "../models/post.js";


/* CREATE A POST */
export const createPost = async (req, res) => {
    try {
        const { title, summary, content, _id } = req.body
        const post = await Post({ title, summary, content, author: _id })
        const savedPost = await post.save()
        res.status(201).json(savedPost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}