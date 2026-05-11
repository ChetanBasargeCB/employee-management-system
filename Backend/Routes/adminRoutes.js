import express from 'express'
import { loginController, logoutController, registerController } from '../Controller/HRController.js'

const AdminRouter = express.Router()

AdminRouter.post("/register",registerController)
AdminRouter.post("/login",loginController)
AdminRouter.post("/logout",logoutController)

export default AdminRouter