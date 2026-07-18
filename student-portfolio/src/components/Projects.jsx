import React, { useState } from 'react'

const Projects = () => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className='flex flex-col items-center justify-center p-10 w-full min-h-screen text-white bg-slate-900'>
      <h2 className='text-4xl font-bold mb-6 text-cyan-400'>My Projects</h2>
      
      <div className='bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-slate-700'>
        <h3 className='text-2xl font-semibold mb-2'>Portfolio Website</h3>
        <p className='text-gray-300 mb-4'>A personal portfolio website built with React and Tailwind CSS.</p>
        
        <button 
          onClick={toggleDetails}
          className='bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300'
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        
        {showDetails && (
          <div className='mt-4 p-4 bg-slate-700 rounded-md animate-fade-in'>
            <h4 className='font-semibold text-cyan-300 mb-2'>Technologies Used:</h4>
            <ul className='list-disc list-inside text-gray-200'>
              <li>React (Vite)</li>
              <li>React Router DOM</li>
              <li>Tailwind CSS</li>
            </ul>
            <p className='mt-2 text-sm text-gray-400'>
              This project demonstrates routing, state management, and modern UI design principles.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
