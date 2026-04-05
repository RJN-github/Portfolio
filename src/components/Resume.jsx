import React from 'react'
import Bg from './Bg'
import Navbar from './Navbar'

const Resume = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <Bg />

            {/* Navbar always on top */}
            <div className="relative z-50">
                <Navbar />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center pt-12 xs:pt-14 sm:pt-16 md:pt-20 lg:pt-24 px-2 xs:px-3 sm:px-4 lg:px-6 min-h-screen">

                {/* Resume Image */}
                <div className="relative group w-full max-w-sm xs:max-w-md sm:max-w-2xl md:max-w-4xl">
                    <img
                        src="/resume/resume.png"
                        alt="Resume"
                        className="mx-auto max-h-[60vh] sm:max-h-[70vh] w-auto rounded-lg sm:rounded-lg md:rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Download Button */}
                <a href="/resume/resume.pdf" download="Rishikesh_Natu_Resume.pdf" className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 mb-6 sm:mb-8 md:mb-12">
                    <button className="px-3 xs:px-4 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 md:py-3.5 rounded-lg md:rounded-xl bg-linear-to-r from-red-500 to-red-600 text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg hover:scale-105 transition duration-300">
                        Download PDF
                    </button>
                </a>

            </div>
        </div>
    )
}

export default Resume