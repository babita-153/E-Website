import express from 'express'
import multer from 'multer'
import { createProductValidator } from '../validators/product.validator.js'
import { createController, deleteController, getAllController, getOneController, updateController } from '../controllers/product.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'



const upload=multer({storage:multer.memoryStorage()})
const router=express.Router()

//CREATE PRODUCT
router.post('/create',authenticate,upload.single("image"),createProductValidator,createController)

//GET ALL PRODUCT
router.get("/getAll",getAllController)

//GET ONE PRODUCT
router.get("/:id",getOneController)

//DELETE ONE PRODUCT
router.delete("/:id",authenticate,deleteController)


router.put('/:id',authenticate,upload.single("image"),createProductValidator,updateController)


export default router