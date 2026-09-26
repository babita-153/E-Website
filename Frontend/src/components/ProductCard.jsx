import React, { useContext } from "react";
import { AuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router";

const ProductCard = ({ product, deleteProduct }) => {
  const { user, setUpdated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      {/* Product Image */}
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <img
          onClick={() => navigate(`/product/${product._id}`)}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Category */}
        <p className="text-sm text-blue-600 font-medium capitalize">
          {product.category}
        </p>

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-800 capitalize mt-1">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Stock */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          <span
            className={`text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </span>
        </div>

        {/* Button */}
        <button
          disabled={product.stock === 0}
          className={`w-full mt-5 py-3 rounded-lg font-semibold transition ${
            product.stock > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
        {/* {user && ( */}
          <div className="flex justify-between mt-2">
            <button
              onClick={() => {
                setUpdated(product);
                navigate("/create");
              }}
              className="p-2 border rounded text-white bg-amber-600"
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteProduct(product._id);
              }}
              className="p-2 border rounded text-white bg-red-700"
            >
              Delete
            </button>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default ProductCard;
