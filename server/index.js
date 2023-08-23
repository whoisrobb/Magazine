import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import cors from "cors"


/* CONFIGURATIONS */
const app = express()
dotenv.config()
app.use(express.json())
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cors({ credentials: true, origin: 'https://magazine-blog-chi.vercel.app' }))


/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    app.listen(PORT, () => console.log('https://magazine-blog-chi.vercel.app'))
}).catch((err) => console.log(err))