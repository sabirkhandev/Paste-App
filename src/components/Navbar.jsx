import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-[#1a1a1a] text-white shadow-md'>
      
      <div className='text-2xl font-extrabold tracking-tighter text-blue-500'>
        PASTE.APP
      </div>

      {/* Navigation Links */}
      <div className='flex gap-8 font-semibold text-lg'>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `transition-all duration-300 px-3 py-1 rounded-md ${
              isActive ? 'text-blue-500 bg-gray-800' : 'text-gray-400 hover:text-white'
            }`
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/pastes" 
          className={({ isActive }) => 
            `transition-all duration-300 px-3 py-1 rounded-md ${
              isActive ? 'text-blue-500 bg-gray-800' : 'text-gray-400 hover:text-white'
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar