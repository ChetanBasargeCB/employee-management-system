import dotenv from 'dotenv/config'
import jwt from 'jsonwebtoken'

const KEY = process.env.JWT_KEY

const isAdmin = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({message:"Token not found please login"})
        
        const decoded = jwt.verify(token,KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" })

        
    }
}

export default isAdmin