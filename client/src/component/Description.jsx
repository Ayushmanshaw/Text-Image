import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 d:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>
      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
        <div>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nam architecto voluptas dolor corrupti, dolorum repudiandae quisquam ipsam laudantium odit asperiores quis harum magnam. Facilis consequuntur totam amet laboriosam! Libero vitae aliquid fugit perspiciatis esse velit dolor asperiores illum quod.</p>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias labore sit ducimus repellendus debitis atque suscipit recusandae expedita corrupti ut laborum voluptatibus itaque magnam optio consequatur quo cumque hic illo repudiandae facilis commodi, esse necessitatibus ad. Labore magnam dolor ipsa iste facere, vero, sequi earum impedit aperiam esse corporis perspiciatis!</p>
        </div>
      </div>
    </div>
  )
}

export default Description
