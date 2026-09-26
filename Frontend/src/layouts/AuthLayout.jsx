import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return(
    <div className='bg-transparent rounded-2xl p-8'>
       <Outlet/>
    </div>
  )
}

export default AuthLayout
