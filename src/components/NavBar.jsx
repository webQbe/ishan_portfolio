import React from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons' // Ready-to-use social media icons for many platforms (Twitter/X, YouTube, LinkedIn, GitHub, etc.).

const NavBar = () => {
  return (
    <header className='bg-blue-500'>
      <div className='container mx-auto flex justify-between'>

        {/* Tailwind CSS Classes:

            The nav items are styled using Tailwind classes like:

                bg-red-600: sets the background color

                inline-flex, items-center, py-3, px-3: for layout and spacing

                text-blue-200, hover:text-green-800: for text styling and hover effects

                .cursive: uses custom font from App.css 
        */}
                
        <nav className='flex'>
          {/* Create links to various routes */}
          <NavLink to="/" 
             className={({ isActive }) =>
            `inflex-flex items-center py-6 px-3 mr-4 text-amber-200 hover:text-blue-700 text-4xl font-bold cursive tracking-widest 
            ${ isActive ? "text-white" : "" }` /* Styling if link is active */
          }>
            ISHAN
          </NavLink>
          <NavLink to="/post" 
            className={({ isActive }) => `inline-flex items-center py-3 px-3 my-6 mx-3  rounded text-amber-200 border-amber-200 border-2
            ${ isActive ? "text-blue-700 border-blue-700 border-2 hover:text-amber-200 hover:border-amber-200" : "" }`
          }>
            Featured Projects
          </NavLink>
          <NavLink to="/project" 
            className={({ isActive }) => `inline-flex items-center py-3 px-3 my-6 mx-3 rounded text-amber-200 border-amber-200 border-2
            ${ isActive ? "text-blue-700 border-blue-700 border-2 hover:text-amber-200 hover:border-amber-200" : "" }`
          }>
            Video Demos
          </NavLink>
          <NavLink to="/services" 
            className={({ isActive }) => `inline-flex items-center py-3 px-3 my-6 mx-3 rounded text-amber-200 border-amber-200 border-2
            ${ isActive ? "text-blue-700 border-blue-700 border-2 hover:text-amber-200 hover:border-amber-200" : "" }`
          }>
            Services
          </NavLink>
          <NavLink to="/contact" 
            className={({ isActive }) => `inline-flex items-center py-3 px-3 my-6 mx-3 rounded text-amber-200 border-amber-200 border-2
            ${ isActive ? "text-blue-700 border-blue-700 border-2 hover:text-amber-200 hover:border-amber-200" : "" }`
          }>
            Contact Me
          </NavLink>
        </nav>
        {/* Social Media Icons */}
        <div 
          className='inline-flex py-3 my-6' // Align the icons with padding and margin
        >
          <SocialIcon url='https://github.com/webQbe' className='mr-4' target='_blank' fgColor='#fff' style={{ height: 35, width: 35 }} />
          <SocialIcon url='https://linkedin.com' className='mr-4' target='_blank' fgColor='#fff' style={{ height: 35, width: 35 }} />
        </div> 
      </div>
    </header>
  )
}

export default NavBar