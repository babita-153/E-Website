import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productsApi } from "../api/productAxiosApi";

const ProductDetails = () => {
  const api = productsApi();
  const [product, setProduct] = useState(null);
  const getProduct = async () => {
    let { id } = useParams();
    try {
      let res = await api.get(`/product/${id}`);
      setProduct(res.data.data.product);
    } catch (error) {
      console.log("error in fetching products", error);
    }
  };
  getProduct();
  if (!product) return <h1>loading...</h1>;
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8"
        >
          ← Back to Products
        </Link>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="bg-gray-100 min-h-[450px] flex items-center justify-center p-8">
              {/* {detailProduct.image ? (
                <img
                  src={detailProduct.image}
                  alt={detailProduct.name}
                  className="w-full h-[450px] object-contain"
                />
              ) : ( */}
              <div className="text-gray-400 text-xl">No Image Available</div>
            </div>

            {/* Product Information */}
            <div className="p-8 md:p-12">
              {/* Category */}
              {/* <p className="text-blue-600 font-semibold uppercase text-sm tracking-wide">
                {product.category}
              </p> */}

              {/* Name */}
              <h1 className="text-4xl font-bold text-gray-900 mt-3 capitalize">
                {product?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="text-yellow-500 text-xl">★★★★★</div>

                <span className="text-gray-500 text-sm">4.8 (120 Reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product?.price}
                </span>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {product?.description}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6">
                {product?.stock > 0 ? (
                  <p className="text-green-600 font-semibold">
                    ✓ In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">✕ Out of Stock</p>
                )}
              </div>

              {/* Quantity */}
              {product?.stock > 0 && (
                <div className="mt-7">
                  <p className="font-semibold text-gray-800 mb-3">Quantity</p>

                  <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                    <button className="px-5 py-3 text-xl hover:bg-gray-100">
                      −
                    </button>

                    <span className="px-6 py-3 font-semibold"></span>

                    <button className="px-5 py-3 text-xl hover:bg-gray-100">
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  disabled={product?.stock === 0}
                  className={`flex-1 py-4 rounded-xl font-semibold transition ${
                    product?.stock > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add to Cart
                </button>

                <button
                  disabled={product?.stock === 0}
                  className={`flex-1 py-4 rounded-xl font-semibold border-2 transition ${
                    product?.stock > 0
                      ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </div>

              {/* Extra Information */}
              <div className="border-t mt-8 pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>

                  <span className="font-medium capitalize">
                    {product?.category}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Product ID</span>

                  <span className="font-medium text-sm">{product?._id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Availability</span>

                  <span className="font-medium">
                    {product?.stock > 0 ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
