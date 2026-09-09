import { BookCheck, BookOpen, CircleUser, GraduationCap, HardHat, House, Info, MenuIcon, Search, SearchIcon } from 'lucide-react'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FcReading } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'
import { useAuth } from "../context/authContext"

const Navbar = ({search, setSearch, onMenuClick}) => {

    const { user } = useAuth();
    const { loading } = useAuth();

  return (
    <nav className='flex sticky top-0 z-50 backdrop-blur-md justify-between border shadow-xl h-16 items-center bg-[#FCFCFD] border-b border-[#E8ECF2]'>
      <div className='m-2 '>
        <h1 className='text-black font-bold text-2xl flex'><span className='text-[#2563Eb] font-bold text-2xl'><GraduationCap className='h-9 font-extrabold'/></span>Study<span className='text-[#2563Eb] font-bold text-2xl'>Hub</span></h1>
      </div>
      <div className='hidden md:flex justify-between items-center gap-5'>
        <NavLink to="/" end className={({isActive}) => isActive ? "bg-white shadow-sm px-4 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><House className='h-4'/>Home</NavLink>
        <NavLink to="/courses" className={({isActive}) => isActive ? "bg-white shadow-sm px-4 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><BookOpen className='h-4'/> Courses</NavLink>
        <NavLink to="/mylearning" className={({isActive}) => isActive ? "shadow-sm px-2 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-2 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><FcReading size={35} className='h-4'/>MyLearning</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? "shadow-sm px-4 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><Info className='h-4'/>About</NavLink>
        
      
      <div className='relative'>
        <input type="text" placeholder='Search courses....' value={search}
         onChange={(e)=>setSearch(e.target.value)} className='outline-none focus:ring-2 focus:ring-[#2563EB]  rounded-xl p-1 pl-2 shadow-sm bg-gray-300 '/>
        <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600' />
      </div>
      </div>
      <span className='md:hidden m-4'><MenuIcon onClick={onMenuClick}/></span>
      <div className='m-4 md:flex hidden'>
        <NavLink to="/profile" className={({isActive}) => isActive ? "text-[#2563Eb] " : "text-gray-800 hover:text-[#1D4ED8]"}>
        {loading ? (
          <CircleUser/>
        ) : user ? (
          <span className='flex flex-col items-center justify-center'>
          <img src={user?.dp} alt={user.name} className='w-8 h-8 rounded-full overflow-hidden object-cover mr-5'/>
          <h1 className='text-sm font-medium'>{user.name}</h1>
          </span>
        ) : (
          <CircleUser/>
        )}
          
        </NavLink>    
      </div>
    </nav>
  )
}

export default Navbar
