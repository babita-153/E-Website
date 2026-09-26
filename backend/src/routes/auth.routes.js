import express from 'express'
import { loginValidator, registerValidator } from '../validators/user.validator.js'
import { getMeController, loginController, logoutController, refreshController, registerController } from '../controllers/user.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/register',registerValidator,registerController)
router.post("/login",loginValidator,loginController)
router.post("/refresh",refreshController)
router.put("/logout",logoutController)
router.get("/me",authenticate,getMeController)
export default router