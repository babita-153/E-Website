import { productModel } from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"


//CREATE PRODUCT
const createController=async(req,res)=>{
const {name,description,stock,price,category}=req.body
console.log("fsadkfhjkdbksfk",req.file)
const response=await uploadFile({
    buffer:req.file.buffer,
    fileName:req.file.originalname
})

let item=await productModel.create({
    name,description,stock,price,category,image:response.url
})
res.status(201).json({
    message:"product created successfully",
    data:{
        item:{
            id:item._id,
            name:item.name,
            description:item.description,
            stock:item.stock,
            price:item.price,
            category:item.category,
            image:item.image
        }
    }
})
}

//GET ALL PRODUCT
const getAllController=async(req,res)=>{
    try {
        const products=await productModel.find()
        res.status(200).json({
            message:"all product fetched successfully",
            data:{
                products:products
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//GET ONE PRODUCT
const getOneController=async(req,res)=>{
    const {id}=req.params
    try {
        const item=await productModel.findById(id)
        res.status(200).json({
            message:"item fetched successsfully",
            data:{
                product:{
                    name:item.name,
                    description:item.description,
                    price:item.price,
                    stock:item.stock,
                    category:item.category
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errr"
        })
    }
}


//DELETE PRODUCT
const deleteController=async(req,res)=>{
    const {id}=req.params
    try {
        let deletedItem=await productModel.findByIdAndDelete(id)
        return res.status(200).json({
            message:"product deleteted successfully",
            data:{
             product:deletedItem
            }
        })
    } catch (error) {
        return res.status(500).json()
    }
}


//UPDATE PRODUCT
const updateController=async(req,res)=>{
  
    const {id}=req.params
    const newProduct=req.body
   
    try {
        let response=await uploadFile({
            buffer:req.file.buffer,
            fileName:req.file.originalname
        })
        console.log("ressponse",response)
        let newItem=await productModel.findByIdAndUpdate(id,{...newProduct,image:response.url})
        res.status(200).json({
            message:"product updated successfully",
            data:{
                product:{
                    newItem
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


export {createController,getAllController,getOneController,deleteController,updateController}