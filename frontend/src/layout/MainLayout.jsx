import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import { useState } from 'react'
const MainLayout = ({search, setSearch, children}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [type, setType] = useState("courses");

  return (
    <div className='min-h-screen flex flex-col'>
    <Navbar
        search={search}
        setSearch={setSearch}
        onMenuClick={() => setIsSidebarOpen(true)} 
        isSidebarOpen={isSidebarOpen} type={type} setType={setType}/>

    <Sidebar 
        search={search}
        setSearch={setSearch}
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} />
        
    <main className='flex-1'>
     {children}
    </main>
    <Footer/>
    </div>
  )
}

export default MainLayout
