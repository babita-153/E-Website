
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/useAuthContext";
import { productsApi } from "../api/productAxiosApi";

const CreateProduct = () => {
const api=productsApi()
const navigate=useNavigate()

const {updated,setUpdated}=useContext(AuthContext)

const {
  register,
  reset,
  formState:{errors},
  handleSubmit
}=useForm({
  defaultValues:{
    name:"",
    price:"",
    stock:"",
    description:"",
    image:null,
    category:""
  }
})


useEffect(()=>{
  if(updated){
    reset({
      name:updated.name||"",
      price:updated.price||"",
      stock:updated.stock||"",
      description:updated.description||"",
      category:updated.category||"",
      image:null
    })
  }else{
     reset({
        name: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        image:null
      });
  }
},[updated,reset])


const onSubmit=async(data)=>{

  try {
    const formData=new FormData()
     formData.append("name",data.name)
      formData.append("price",data.price)
       formData.append("stock",data.stock)
        formData.append("category",data.category)
         formData.append("description",data.description)
         if(data.image?.[0]){
            formData.append("image",data.image[0])
         }
console.log(formData)

if(updated){
let res=await api.put(`/product/${updated._id}`,formData)
console.log(res)
}else{
  let res=await api.post("/product/create",formData)
  console.log(res)
 
}


  } catch (error) {
    console.log(res.status)
    console.log("error in posting data",error)
  }

   navigate("/products")
   reset()
   setUpdated(null)
}


//   const api = productsApi();
//   const navigate = useNavigate();
//   const { updated, setUpdated } = useContext(AuthContext);

  const [error, setError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       price: "",
//       category: "",
//       description: "",
//       stock: "",
//     },
//   });

  
//   useEffect(() => {
//     if (updated) {
//       reset({
//         name: updated.name || "",
//         price: updated.price || "",
//         category: updated.category || "",
//         description: updated.description || "",
//         stock: updated.stock || "",
//       });
//     } else {
//       reset({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         stock: "",
//       });
//     }
//   }, [updated, reset]);

//   const onSubmit = async (data) => {
//     setError("");

//     try {
//       const formData = new FormData();
// console.log(formData)
//       formData.append("name", data.name);
//       formData.append("price", data.price);
//       formData.append("category", data.category);
//       formData.append("description", data.description);
//       formData.append("stock", data.stock);

//       // File input se File object milega
//       if (data.image?.[0]) {
//         formData.append("image", data.image[0]);
//       }

//       let response;

//       if (updated) {
//         response = await api.put(
//           `/product/${updated._id}`,
//           formData
//         );
//       } else {
//         response = await api.post(
//           "/product/create",
//           formData
//         );
//       }

//       if (response.status !== 201) {
//         setError(
//           response.data?.message || "Product creation failed"
//         );
//         return;
//       }

//       reset();
//       setUpdated(null);
//       navigate("/products");

//     } catch (error) {
//       console.log(error);

//       setError(
//         error.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {updated ? "Update Product" : "Create Product"}
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          {updated
            ? "Update your product details"
            : "Add a new product to your store"}
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              {...register("name", {
                required: "Product name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>

              <input
                type="number"
                placeholder="Enter price"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                })}
              />

              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Stock
              </label>

              <input
                type="number"
                placeholder="Enter stock"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                {...register("stock", {
                  required: "Stock is required",
                  min: {
                    value: 0,
                    message: "Stock cannot be negative",
                  },
                })}
              />

              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>

            <input
              type="text"
              placeholder="e.g. Electronics, Fashion"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              {...register("category", {
                required: "Category is required",
              })}
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              {...register("image", {
                required: updated
                  ? false
                  : "Product image is required",

                validate: (files) => {
                  if (!files?.[0]) {
                    return updated
                      ? true
                      : "Product image is required";
                  }

                  const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/avif"
                  ];

                  if (!allowedTypes.includes(files[0].type)) {
                    return "Only JPG, PNG and WEBP images are allowed";
                  }

                  if (files[0].size > 5 * 1024 * 1024) {
                    return "Image size must be less than 5MB";
                  }

                  return true;
                },
              })}
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}

            {updated && (
              <p className="text-gray-500 text-sm mt-1">
                Leave empty to keep the existing image.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>

            <textarea
              placeholder="Enter product description"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message:
                    "Description must be at least 10 characters",
                },
              })}
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {updated ? "Update Product" : "Create Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
