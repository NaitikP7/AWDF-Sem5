import React from 'react'
import Header from './Header'
import About from './About'
import Skills from './Skills'

const Home = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Git",
    "Tailwind CSS",
    "Java",
  ]

  return (
    <div className='flex flex-col items-center w-full'>
      <Header name='Naitik Patel' themeColor='#22d3ee' />
      <About />
      <Skills skills={skills} />
    </div>
  )
}

export default Home
