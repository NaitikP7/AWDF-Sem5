import React from 'react'
import { ArrowDown, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = ({ name, themeColor }) => {
  return (
    <section className='hero-shell' aria-labelledby='hero-title'>
      <div className='hero-grid' />
      <div className='hero-content'>
        <span className='eyebrow'><span className='status-dot' /> Information Technology · Full Stack Development</span>
        <p className='hero-kicker'>HELLO, I’M</p>
        <h1 id='hero-title' className='hero-title' style={{ '--accent': themeColor }}>{name}<span>.</span></h1>
        <p className='hero-copy'>An Information Technology student building thoughtful digital experiences and reliable web applications.</p>
        <div className='hero-actions'>
          <a href='#about' className='button-primary'>Explore my work <ArrowDown size={17} /></a>
          <Link to='/contact' aria-label='Contact Naitik' className='icon-link'><Mail size={19} /></Link>
        </div>
      </div>
      <div className='hero-orbit' aria-hidden='true'><span>BUILD<br />WITH<br />PURPOSE</span><i /></div>
      <div className='hero-index'>01 <span /> PORTFOLIO</div>
    </section>
  )
}

export default Header
