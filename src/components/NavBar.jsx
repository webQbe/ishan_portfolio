import React from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons' // Ready-to-use social media icons for many platforms (Twitter/X, YouTube, LinkedIn, GitHub, etc.).

const NavBar = () => {
  return (
    <header className='bg-red-600'>
      <div className='container mx-auto flex justify-between'>

        {/* Tailwind CSS Classes:

            The nav items are styled using Tailwind classes like:

                bg-red-600: sets the background color

                inline-flex, items-center, py-3, px-3: for layout and spacing

                text-red-200, hover:text-green-800: for text styling and hover effects

                .cursive: uses custom font from App.css 
        */}
                
        <nav className='flex'>
          {/* Create links to various routes */}
          <NavLink to="/" 
             className={({ isActive }) =>
            `inflex-flex items-center py-6 px-3 mr-4 text-red-100 hover:text-green-800 text-4xl font-bold cursive tracking-widest 
            ${ isActive ? "text-white" : "" }` /* Styling if link is active */
          }>
            WEBCUBE
          </NavLink>
          <NavLink to="/post" 
            className={({ isActive }) => `inline-flex items-center py-3 px-3 my-6 rounded text-red-200 hover:text-green-800 
            ${ isActive ? "text-red-100 bg-red-700" : "" }`
          }>
            Blog Posts
          </NavLink>
          <NavLink to="/project" 
            className={({ isActive }) => `inline-flex items-center py-3 px-3 my-6 rounded text-red-200 hover:text-green-800 
            ${ isActive ? "text-red-100 bg-red-700" : "" }`
          }>
            Projects
          </NavLink>
          <NavLink to="/about" 
            className={({ isActive }) => `inline-flex items-center py-3 px-3 my-6 rounded text-red-200 hover:text-green-800 
            ${ isActive ? "text-red-100 bg-red-700" : "" }`
          }>
            About Me!
          </NavLink>
        </nav>
        {/* Social Media Icons */}
        <div 
          className='inline-flex py-3 px-3 my-6' // Align the icons with padding and margin
        >
          <SocialIcon 
            url='https://x.com'       // Auto-detects the platform based on the url   
            className='mr-4'          // Adds right margin using TailwindCSS (mr-4) to space out the icons
            target='_blank'           // Opens the link in a new browser tab
            fgColor='#fff'            // Sets the foreground color (icon color) to white
            style={{ height: 35, width: 35 }} // Explicitly sets the size of each icon
          />
          <SocialIcon url='https://youtube.com' className='mr-4' target='_blank' fgColor='#fff' style={{ height: 35, width: 35 }} />
          <SocialIcon url='https://linkedin.com' className='mr-4' target='_blank' fgColor='#fff' style={{ height: 35, width: 35 }} />
        </div> 
      </div>
    </header>
  )
}

export default NavBar