import React from 'react';
import {Link} from "react-router-dom"
import { NavLink } from 'react-router-dom'
import { BookCheck, BookOpen, CircleUser, GraduationCap, HardHat, House, Info, MenuIcon, Search, SearchIcon } from 'lucide-react'
import { FcReading } from 'react-icons/fc';
import { useAuth } from "../context/authContext"

export default function Sidebar({search, setSearch, isOpen, onClose }) {

  const { user } = useAuth();
  const { loading } = useAuth();

  return (
    <>
      {/* Backdrop Backdrop Overlay - Jab sidebar khulega toh background blur/dark hoga */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar Drawer Panel */}
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200 md:hidden flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-2">
               <h1 className='text-black font-bold text-2xl flex'><span className='text-[#2563Eb] font-bold text-2xl'><GraduationCap className='h-9 font-extrabold'/></span>Study<span className='text-[#2563Eb] font-bold text-2xl'>Hub</span></h1>
            </div>
            {/* Close Button */}
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Search Bar Inside Sidebar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search everything..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Navigation Links (Bache hue options) */}
          <div className="p-4 space-y-1">
            <NavLink to="/" end className={({isActive}) => isActive ? "bg-white shadow-sm px-4 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><House className='h-4'/>Home</NavLink>
            <NavLink to="/courses" className={({isActive}) => isActive ? "bg-white shadow-sm px-4 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><BookOpen className='h-4'/> Courses</NavLink>
            <NavLink to="/mylearning" className={({isActive}) => isActive ? "shadow-sm px-2 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-2 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><FcReading size={35} className='h-4'/>MyLearning</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "shadow-sm px-4 py-1.5 text-sm font-bold text-[#2563Eb] rounded-lg flex" : "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-[#1D4ED8] hover:bg-white/60 rounded-lg flex"}><Info className='h-4'/>About</NavLink>
          </div>
        </div>

          <div className='m-4 '>
                 <NavLink to="/profile" className={({isActive}) => isActive ? "text-[#2563Eb] " : "text-gray-800 hover:text-[#1D4ED8]"}>
                 {loading ? (
                  <span className='flex gap-4 font-bold items-center'>
                   <CircleUser size={35}/>My Profile
                  </span>
                 ) : user ? (
                  <span className='flex justify-center items-center gap-2'>
                    <img src={user?.dp} alt="dp*" className='w-18 h-18 rounded-full overflow-hidden object-cover'/>
                    <h1 className='font-bold'>{user.name}</h1>
                  </span>
                 ) : (
                  <span className='flex gap-4 font-bold items-center'>
                   <CircleUser size={35}/>My Profile
                  </span>
                 )}
                 </NavLink>    
           </div>
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-center text-gray-400 font-medium">
          v1.0.0 Stable (2026)
        </div>
      </div>
    </>
  );
}