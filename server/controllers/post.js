import Post from "../models/post.js";


/* CREATE A POST */
export const createPost = async (req, res) => {
    try {
        const { title, summary, categories, content, _id } = req.body
        const post = await Post({ title, summary, categories, content, author: _id })
        const savedPost = await post.save()
        res.status(201).json(savedPost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET ALL THE POSTS */
export const getAllPosts = async (req, res) => {
    try {
        res.status(200).json(await Post.find().populate('author', ['username']))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


/* GET POSTS CATEGORIES */
export const getPostCat = async (req, res) => {
    try {
        const category = req.query.cat

        const posts = await Post.find({ categories: category }).populate('author', ['username']);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


/* GET ONE POST */
export const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params
        res.status(200).json(await Post.findById(id).populate('author', ['username']))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


/* UPDATING A POST */
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const { title, summary, categories, content } = req.body
        const newData = await Post.findById(postId)

        if (!newData) {
            res.status(404).json({ message: 'Post not found' })
        }
        
        await newData.updateOne({ title, summary, categories, content })

        res.status(201).json(newData)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* DELETE A POST */
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)

        if (!post) {
            res.status(404).json({ message: 'Post not found' })
        }

        await post.deleteOne()
        res.status(200).json({ message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}