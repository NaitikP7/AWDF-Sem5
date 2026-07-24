import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <div className='bg-red-900/30 border border-red-500/50 rounded-lg px-6 py-5 max-w-md w-full text-center'>
        <svg className='w-10 h-10 text-red-400 mx-auto mb-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' />
        </svg>
        <p className='text-red-300 font-semibold text-lg mb-1'>Something went wrong</p>
        <p className='text-red-400/80 text-sm'>{message || 'Failed to load repositories. Please try again later.'}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
