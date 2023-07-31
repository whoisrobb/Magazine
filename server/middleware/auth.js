import jwt from "jsonwebtoken"


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) return res.status(403).json({ message: 'Access denied!' })
        
        if (token.startsWith('Bearer ')) {
            token.split(' ')[1]
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}