import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <div className=''>
      <Outlet/>
    </div>
    </>
  )
}

export default MainLayout
