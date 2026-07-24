import React, { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setName(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${name.name}`);
    setName('');
  }

  return (
    <div className='flex flex-col items-center justify-center p-10 w-full min-h-screen bg-slate-900 text-white'>
      <h2 className='text-4xl font-bold mb-8 text-cyan-400'>Contact Me</h2>
      
      <div className='w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          
          <div className='flex flex-col'>
            <label htmlFor="name" className='mb-2 text-sm font-medium text-gray-300'>Your Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={name.name}
              onChange={handleChange}
              className='p-3 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-all'
              placeholder='Enter your name'
              required
            />
          </div>

          <button 
            type="submit"
            className='mt-2 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-transform hover:-translate-y-1'
          >
            Send Message
          </button>
        </form>

        <div className='mt-8 p-4 bg-slate-700 rounded-lg border border-slate-600'>
          <h3 className='text-lg font-semibold text-cyan-300 mb-2'>Live Preview:</h3>
          <p className='text-gray-300'><span className='font-medium text-gray-400'>Name:</span> {name.name || '...'}</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
