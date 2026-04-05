import React from 'react'
import Bg from './Bg'
import About from './About'
import SocialDock from './SocialDock'
import Model3D from './Model3D'
import TextType from '../uicomponent/TextType'

function Home() {
  return (
    <>
      <Bg />

      <div className='layout w-[90%] h-[90%]  xs:w-[92%] sm:w-[90%] md:w-[85%] mx-auto flex flex-col justify-center pt-32 xs:pt-28 sm:pt-24 md:pt-20 lg:pt-16 '>

        <div className='flex m-[0_auto] w-[95%] flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-6 lg:gap-8'>

          {/* LEFT */}
          <div className='flex flex-col justify-center w-full md:w-[75%] sm:gap-4 md:gap-5 lg:gap-6 md:text-left'>

            <div className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-white'>
              Hi There! 👋
            </div>

            <div className='text-xl sm:text-2xl gap-2 md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight flex md:justify-start sm:gap-2'>
              <span className='sm:px-2 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg md:rounded-xl md:text-white'>I'M</span>
              <span className='text-red-500 sm:px-3 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg md:rounded-xl  md:text-red-500'>RISHIKESH NATU
              </span>
            </div>

            <TextType
              text={["BCA Student", "Full Stack Developer"]}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white"
            />

          </div>

          {/* RIGHT */}
          <div className='w-full md:w-[45%] flex justify-center items-center'>

            <div className='
              w-80 h-80
              xs:w-40 xs:h-40
              sm:w-70 sm:h-70
              md:w-64 md:h-64
              lg:w-80 lg:h-80
              xl:w-96 xl:h-96
            '>
              <Model3D modelPath="/model.glb" />
            </div>

          </div>

        </div>

      </div>

      <About />

      <div className='
        text-white w-[93%] xs:w-[90%] sm:w-full md:w-[80%] mx-auto 
        text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl 
        font-bold text-center 
        flex items-center justify-center
        backdrop-blur-lg 
        border border-white/20 
        shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl
        
        px-3 xs:px-4 py-3 xs:py-4 sm:py-5 md:py-6 
        sm:mb-2 md:mb-2 lg:mb-6
      '>
        Find me on 🚀
      </div>

      <SocialDock />
    </>
  )
}

export default Home