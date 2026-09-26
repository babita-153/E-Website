import { productsApi } from "./productAxiosApi";

export const AllproductApi = async () => {
  const api = productsApi();
  try {
    let res = await api.get("/product/getAll");
    return res.data.data;
  } catch (error) {
    console.log(error);
    console.log("error in fetching all products");
  }
};
