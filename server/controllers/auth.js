import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


/* REGISTRATION */
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({ username, email, password: hashedPassword })
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* LOGIN */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'Invalid User!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, user: { _id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};