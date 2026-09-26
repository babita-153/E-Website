import {body, validationResult} from 'express-validator'

export const createProductValidator=[
//NAME
body("name")
    .notEmpty().withMessage("name is required").bail()
    .isString().withMessage("name must be string").bail()
    .isAlpha("en-IN", { ignore: " " })
    .withMessage("name must contain only alphabets").bail()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("name must be between 3 and 20 characters"),


//PRICE
 body("price")
    .notEmpty().withMessage("price is required").bail()
    .isNumeric().withMessage("price must be a number").bail()
    .custom((value) => {
      if (Number(value) < 0) {
        throw new Error("price cannot be negative");
      }
      return true;
    }),

    //DESCRIPTION
   body("description")
    .notEmpty().withMessage("description is required").bail()
    .isString().withMessage("description must be string").bail()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("description must be between 10 and 500 characters"),
  // IMAGE
   body().custom((_, { req }) => {
    if (!req.file) {
      throw new Error("image is required");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif"
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      throw new Error("Only JPG, PNG and WEBP images are allowed");
    }

    return true;
  }),
  // CATEGORY
  body("category")
    .notEmpty().withMessage("category is required").bail()
    .isString().withMessage("category must be string").bail()
    .isAlpha("en-IN", { ignore: " " })
    .withMessage("category must contain only alphabets").bail()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("category must be between 2 and 20 characters"),

  // STOC.isK
  body("stock")
    .notEmpty().withMessage("stock is required").bail()
    .isInt({ min: 0 })
    .withMessage("stock must be a non-negative integer"),

    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        next()
    }

]