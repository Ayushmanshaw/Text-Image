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
            <h2 className='text-3xl font-medium max-w-lg mb-4 text-green-700'>Introducing the AI-powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Bring your ideas to life with the power of AI! Whether you're dreaming of futuristic cities, magical landscapes, or surreal art – just type your prompt and let our AI transform your words into stunning visuals in seconds.
            Perfect for creators, designers, and anyone looking to explore their imagination through art – no design skills required!</p>
            <p className='text-gray-600'>Perfect for creators, designers, and anyone looking to explore their imagination through art – no design skills required!
            From creative exploration to concept art, the possibilities are endless. Enter your idea and watch the magic happen – your vision, now visualized.</p>
        </div>
      </div>
    </div>
  )
}

export default Description
