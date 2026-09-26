import {body, validationResult} from 'express-validator'

export const registerValidator=[
    body("name")
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name must be a string").bail()
    .isAlpha("en-US", { ignore: " " }).withMessage("enter valid form of name").bail()
    .trim(),
    body("email")
    .exists().withMessage("email is required").bail()
    .isString().withMessage("email must be string").bail()
    .trim()
    .isEmail().withMessage("enter valid email"),
    body("password")
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name must be a string").bail()
    .trim()
    .isLength({min:6}).withMessage("must be atleast 6 character"),
    body("confirmPassword")
     .exists().withMessage("name is required").bail()
    .isString().withMessage("name must be a string").bail()
    .trim()
    .isLength({min:6}).withMessage("must be atleast 6 character"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]

export const loginValidator=[
     body("email")
    .exists().withMessage("email is required").bail()
    .isString().withMessage("email must be string").bail()
    .trim()
    .isEmail().withMessage("enter valid email"),
    body("password")
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name must be a string").bail()
    .trim()
    .isLength({min:6}).withMessage("must be atleast 6 character"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]