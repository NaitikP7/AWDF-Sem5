import React from 'react'
import { ArrowUpRight, Copyright } from 'lucide-react';
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className='site-footer'>
      <span><Copyright size={13}/> 2026 Naitik Patel</span>
      <span>Designed and built with React</span>
      <Link to='/contact'>Get in touch <ArrowUpRight size={14}/></Link>
    </footer>
  )
}

export default Footer
