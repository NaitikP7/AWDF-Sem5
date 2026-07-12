import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Footer from './components/Footer';


const App = () => {

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
    <div className=' flex flex-col items-center h-screen justify-between relative'>
      <Header/>
      <About/>
      <Skills skills={skills}/>
      <Footer/>      
    </div>
  )
}

export default App