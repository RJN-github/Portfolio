import React from 'react'

const Footer = () => {
    const socials = [
        {"icon": "/src/assets/icons/github.png", "link": "https://github.com/RJN-github"},
        {"icon": "/src/assets/icons/linkedin.png", "link": "https://www.linkedin.com/in/rishikesh-natu-182b41306/"},
        {"icon": "/src/assets/icons/instagram.png", "link": "https://www.instagram.com/_____r_j_n_____/"}
    ]

    console.log(socials)
  return (
     <div className="bottom-0 left-0 w-[85%] m-[0_auto] flex justify-center z-50">
            
            <div className="
                w-[90%] xs:w-[92%] sm:w-[90%] md:w-[95%] px-2 xs:px-3 md:px-4 lg:px-6 py-2.5 xs:py-3 md:py-3.5 lg:py-4
                flex flex-col sm:flex-row justify-between items-center gap-2.5 xs:gap-3 sm:gap-0
                backdrop-blur-lg 
                border border-white/20 
                rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl
                mb-2 xs:mb-2.5 sm:mb-3
                transition-all duration-300
            ">
              <div className='text-center sm:text-left'>
                 <span className='text-white font-bold text-xs xs:text-sm md:text-sm'>Designed and developed by</span> <span className="text-red-500 font-bold text-xs xs:text-sm md:text-sm">Rishikesh Natu</span>
              </div>
              <div className='flex justify-center gap-1.5 xs:gap-2 md:gap-3'>
                {socials.map((item)=>
                console.log(item) ||
                <a href={item.link} target="_blank" className='hover:scale-110 transition-transform duration-200' key={item.link}>
                    <img src={item.icon} alt={item.link} className='w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 object-contain' />
                </a>
                )}
              </div>
            </div>
        </div>
  )
}

export default Footer