import React from 'react'

const Spinner = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <div className='w-12 h-12 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin'></div>
      <p className='mt-4 text-slate-400 text-sm tracking-wide'>Fetching repositories...</p>
    </div>
  )
}

export default Spinner
