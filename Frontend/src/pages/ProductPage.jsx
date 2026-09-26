import React from 'react'
import ProductCard from '../components/ProductCard'
import useProduct from '../hooks/useProductHook'


const ProductPage = () => {
const {allProducts,deleteProduct}=useProduct()
if(allProducts.length<1)return <h1>Loading....</h1>
  return (
    <div className='min-h-screen py-8 px-15 grid grid-cols-4 gap-4'>
     {
      allProducts.map((elem)=>{
        return <ProductCard product={elem} key={elem._id} deleteProduct={deleteProduct}/>
      })
     }
    </div>
  )
}

export default ProductPage
