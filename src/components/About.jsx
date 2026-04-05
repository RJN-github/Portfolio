import React from 'react'
import Dock from '../uicomponent/Dock'

const About = () => {
  return (
    <div className='m-[0_auto] flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 relative'>

      {/* Main Card */}
      <div className='w-full overflow-hidden md:w-[85%] 
        backdrop-blur-lg 
        border border-white/20 
        rounded-lg xs:rounded-xl sm:rounded-2xl md:rounded-2xl shadow-xl
        p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10
        transition-all duration-300'>

        {/* Red Glow */}
        <div className="absolute -top-16 -left-16 xs:-top-20 xs:-left-20 sm:-top-24 sm:-left-24 md:-top-20 md:-left-20 w-40 xs:w-48 sm:w-56 md:w-72 h-40 xs:h-48 sm:h-56 md:h-72 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 xs:-bottom-20 xs:-right-20 sm:-bottom-24 sm:-right-24 md:-bottom-20 md:-right-20 w-40 xs:w-48 sm:w-56 md:w-72 h-40 xs:h-48 sm:h-56 md:h-72 bg-red-500/10 rounded-full blur-3xl"></div>

        {/* Heading */}
        <div className='text-center xs:mb-6 sm:mb-8 md:mb-8 lg:mb-10 relative z-10'>
          <h2 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white tracking-wide'>
            LET ME <span className='text-red-500'>INTRODUCE</span> MYSELF
          </h2>
        </div>

        {/* Content */}
        <div className='relative z-10'>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed font-mono text-center'>
            I'm a <span className='text-red-400 font-bold'>BCA Student at VPIMSR, Shivaji University Kolhapur</span> with a deep passion for <span className='text-red-400 font-bold'>Web Development</span> and IT solutions. I'm enthusiastic about <span className='text-red-400'>transforming creative ideas into reliable, scalable products</span>. Over time, I've explored several technologies and found my passion in building high-performance systems and intuitive user experiences.
          </p>
        </div>

      </div>

    </div>
  )
}

export default About