import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Command } from 'lucide-react'

const NavBar = () => {
  const navLinks = [ { name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: 'Contact', path: '/contact' } ]

  return (
    <nav className='site-nav' aria-label='Main navigation'>
      <div className='nav-inner'>
        <Link to='/' className='brand-mark'><span className='brand-icon'><Command size={17}/></span><span>naitik<span className='brand-dot'>.</span><small>PORTFOLIO</small></span></Link>
        <div className='nav-links'>
          {navLinks.map((link) => <NavLink key={link.name} to={link.path} end={link.path === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{link.name}</NavLink>)}
        </div>
        <Link to='/contact' className='nav-cta'>Let’s talk <ArrowUpRight size={15}/></Link>
      </div>
    </nav>
  )
}

export default NavBar
