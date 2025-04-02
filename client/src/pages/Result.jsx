// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext'

// const Result = () => {
//   const[image,setImage]=useState(assets.sample_img_1)
//   const[isImageLoaded,setIsImageLoaded]= useState(false)
//   const[loading, setLoading] = useState(true)
//   const[input, setInput] = useState('')
//   const {generateImage} =useContext(AppContext)
//   const onSubmitHandler = async (e) =>{
//     e.preventDefault()
//     setLoading(true)
//     if(input){
//       const image = await generateImage(input)
//       if(image){
//         setIsImageLoaded(true)
//         setImage(image)
//       }
//     }
//     setLoading(false)
//   }
//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
      
// <div>
//   <div className='relative'>
//     <img src={image} alt="" className='max-w-sm rounded' />
//     <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}/>
//   </div>
//   <p className={!loading ? 'hidden' : ''}>Loading ......</p>
// </div>
//     {!isImageLoaded &&
//     <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
//       <input 
//       onChange={e => setInput(e.target.value)} value={input}
//       type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20' placeholder-color />
//       <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
//     </div>
//     }
//     {isImageLoaded &&
//     <div className='flex gap-2 flex-wrap justify-center text-white yext-sm p-0.5 mt-10 rounded-full'>
//       <p  onClick={()=>{setIsImageLoaded(false)}}
//       className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
//       <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
//     </div>
// }
//     </form>
//   )
// }

// export default Result




// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext'

// const Result = () => {
//   const [image, setImage] = useState(null) // Stores current image
//   const [isImageLoaded, setIsImageLoaded] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [input, setInput] = useState('')
//   const [previousImages, setPreviousImages] = useState([]) // Stores old images
//   const [showInput, setShowInput] = useState(true) // Controls input visibility

//   const { generateImage } = useContext(AppContext)

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     if (input) {
//       setLoading(true)
//       setShowInput(false) // Hide input while generating

//       // Store the current image before generating a new one
//       if (image) {
//         setPreviousImages(prev => [image, ...prev])
//       }

//       const generatedImage = await generateImage(input)
//       if (generatedImage) {
//         setImage(generatedImage)
//         setIsImageLoaded(true)
//       }

//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
      
//       <div>
//         <div className='relative'>
//           {loading ? (
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           ) : (
//             image && <img src={image} alt="Generated" className='max-w-sm rounded' />
//           )}
//         </div>
//       </div>

//       {/* Show only after image is loaded */}
//       {isImageLoaded && (
//         <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
//           <p onClick={() => {
//               setIsImageLoaded(false)
//               setShowInput(true) // Reveal input field
//             }}
//              className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
//             Generate Another
//           </p>
//           <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
//         </div>
//       )}

//       {/* Input Field only visible when showInput is true */}
//       {showInput && (
//         <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
//           <input 
//             onChange={e => setInput(e.target.value)} 
//             value={input}
//             type="text" 
//             placeholder='Describe what you want to generate' 
//             className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'
//           />
//           <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
//         </div>
//       )}

//       {/* Display Previous Images */}
//       {previousImages.length > 0 && (
//         <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
//           {previousImages.map((img, index) => (
//             <img key={index} src={img} alt={`Generated ${index}`} className='w-40 h-40 object-cover rounded' />
//           ))}
//         </div>
//       )}
//     </form>
//   )
// }

// export default Result




import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1) // Set a dummy image initially
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [previousImages, setPreviousImages] = useState([])
  const [showInput, setShowInput] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null) // Stores selected image for download

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (input) {
      setLoading(true)
      setShowInput(false)
      setImage(null) // Remove the dummy image when generating

      if (image && image !== assets.sample_img_1) {
        setPreviousImages(prev => [image, ...prev])
      }

      const generatedImage = await generateImage(input)
      if (generatedImage) {
        setImage(generatedImage)
        setIsImageLoaded(true)
      }

      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
      
      <div>
        <div className='relative'>
          {loading ? (
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            image && <img src={image} alt="Generated" className='max-w-sm rounded' />
          )}
        </div>
      </div>

      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={() => {
              setIsImageLoaded(false)
              setShowInput(true)
              setPreviousImages(prev => [image, ...prev]) // Store the generated image
              setImage(assets.dummyImage) // Reset to dummy image
            }}
             className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
            Generate Another
          </p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div>
      )}

      {showInput && (
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input 
            onChange={e => setInput(e.target.value)} 
            value={input}
            type="text" 
            placeholder='Describe what you want to generate' 
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'
          />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
        </div>
      )}

      {previousImages.length > 0 && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {previousImages.map((img, index) => (
            <div key={index} className='relative'>
              <img 
                src={img} 
                alt={`Generated ${index}`} 
                className='w-40 h-40 object-cover rounded cursor-pointer' 
                onClick={() => setSelectedImage(img)} 
              />
              {selectedImage === img && (
                <a href={img} download className='absolute bottom-2 right-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-xs'>Download</a>
              )}
            </div>
          ))}
        </div>
      )}
    </form>
  )
}

export default Result
