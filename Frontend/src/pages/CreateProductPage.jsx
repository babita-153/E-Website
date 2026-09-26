import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/useAuthContext'
import { Navigate, useNavigate } from 'react-router'
import CreateProduct from '../components/CreateProduct'

const CreateProductPage = () => {
  
const {user}=useContext(AuthContext)
if(!user)
    return <Navigate to={'/login'}></Navigate> 

  return (
    <div>
     <CreateProduct/>
    </div>
  )
}

export default CreateProductPage
