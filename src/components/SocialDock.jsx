import React from 'react'
import Dock from '../uicomponent/Dock'
import githubIcon from '../assets/icons/github.png'
import linkedinIcon from '../assets/icons/linkedin.png'
import instagramIcon from '../assets/icons/instagram.png'

const SocialDock = () => {
    const socialItems = [
        {
            icon: <img src={linkedinIcon} alt="LinkedIn" className='w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain' />,
            label: 'LinkedIn',
            onClick: () => window.open('https://www.linkedin.com/in/rishikesh-natu-182b41306/', '_blank'),
            className: 'hover:bg-blue-600/20'
        },
        {
            icon: <img src={githubIcon} alt="GitHub" className='w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain' />,
            label: 'GitHub',
            onClick: () => window.open('https://github.com/RJN-github', '_blank'),
            className: 'hover:bg-gray-700/20'
        },
        {
            icon: <img src={instagramIcon} alt="Instagram" className='w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain' />,
            label: 'Instagram',
            onClick: () => window.open('https://www.instagram.com/_____r_j_n_____/', '_blank'),
            className: 'hover:bg-pink-600/20'
        },
    ]

    return (
        <div className='h-[20%] md:h-[30%] xs:h-[10%]  w-[95%] xs:w-[92%] sm:w-[90%] md:w-[85%] mx-auto xs:py-1 sm:py-2 md:py-4 lg:py-8 flex justify-center z-20'>

            <div className='w-full h-[50%] my-8 flex justify-center items-center'>

                <Dock
                    items={socialItems}
                    className='backdrop-blur-md border border-white/20 shadow-lg rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl'
                    panelHeight={60}
                    baseItemSize={36}
                    magnification={60}
                    distance={150}
                />

            </div>

        </div>
    )
}

export default SocialDock