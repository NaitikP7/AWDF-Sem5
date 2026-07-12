import React from 'react'
import { Mail, Phone, Copyright } from 'lucide-react';
const Footer = () => {
  return (
    <div className=' h-[12%] bg-cyan-500 py-6 px-20 w-full rounded-t-3xl flex  text-white items-center font-medium text-lg justify-between '>
        <div className='flex gap-2 items-center'>
          <Copyright size={14}/>2026 - Naitik Patel
        </div>
        <div className='flex gap-4'>
          <Mail size={18}/>
          <Phone size={18} />
        </div>
      </div>
  )
}

export default Footer