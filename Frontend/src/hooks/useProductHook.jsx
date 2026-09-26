
import { AllproductApi } from "../api/productApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductDetails from "../pages/ProductDeatils";
import { productsApi } from "../api/productAxiosApi";

const useProduct = () => {
  const api = productsApi();
  const [allProducts, setAllProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState(null);
  const navigate = useNavigate();
  const getAllProduct = async () => {
    try {
     let res = await api.get("/product/getAll");
  
      setAllProducts(res.data.data.products);
      return res.data.data;
    } catch (error) {
      console.log("error in fetching all products",error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  const deleteProduct = async (id) => {
    try {
      let res = await api.delete(`/product/${id}`);
      getAllProduct();
    } catch (error) {
      if(error.status===401){
        navigate('/create')
      }
      console.log("error in deleting product", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      let res = await api.put(`/product/${id}`);
      getAllProduct();
    } catch (error) {
      console.log("error in updating product", error);
    }
  };

  return {
    allProducts,
    updateProduct,
    deleteProduct,

    navigate,
  };
};

export default useProduct;
