import React from 'react'

const skills = (props) => {
  return (
    <div className='bg-indigo-200 w-[35%] h-auto flex flex-col p-7 rounded-2xl'>
        <div className='flex justify-center'>
            <p className='text-3xl font-bold text-white mb-7' >Skills</p>
        </div>
        <div className='flex justify-center text-blue-900' >
            <ul className="columns-3 md:gap-20">
            {props.skills.map((elem, index)=>{
                return <li key={index}>{elem}</li>
            })}
            </ul>
        </div>
    </div>
  )
}

export default skills