import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center my-32'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How its work</h1>
      <p className='text-lg text-gray-600 mb-8'>Transform Words Into Stunning Images </p>
      <div className='space-y-4 w-full max-w-3xl text-sm'>
        {stepsData.map((items,index)=>(
            <div key={index}
            className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-d border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg  bg-gray-100'>
                <img src={items.icon} alt="" />
                <div key={index}>
                    <h2 className='text-xl font-medium'>{items.title}</h2>
                    <p className='text-gray-500'>{items.description}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
