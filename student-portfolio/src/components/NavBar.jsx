import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <nav className='w-full bg-slate-900 border-b border-slate-800 shadow-sm fixed top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <Link to='/' className='text-cyan-400 text-xl font-bold tracking-wider'>STUDENT PORTFOLIO</Link>
          </div>
          <div className='flex space-x-8'>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    isActive 
                      ? 'text-cyan-400 border-b-2 border-cyan-400' 
                      : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-300'
                  } px-3 py-2 text-sm font-medium transition-all duration-300`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
