import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout'
import ProductPage from '../pages/ProductPage'
import AboutPage from '../pages/AboutPage'
import RegisterPage from '../pages/RegisterPage'
import { LoginPage } from '../pages/LoginPage'
import CreateProductPage from '../pages/CreateProductPage'
import ProductDetails from '../pages/ProductDeatils'

const AppRoute = () => {
const router=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[
       {
        path:"",
        element:<HomePage/>
       },
       {
        path:"/products",
        element:<ProductPage/>
       },
       {
        path:"/about",
        element:<AboutPage/>
       },
       {
        path:"/create",
        element:<CreateProductPage/>
       },
       {
        path:"/product/:id",
        element:<ProductDetails/>
       }
      ]
    },
        {
          path:"/login",
          element:<LoginPage/>
        },
        {
          path:"/register",
          element:<RegisterPage/>
        }
     
])

  return <RouterProvider router={router}/>
}

export default AppRoute
