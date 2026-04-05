import React from 'react'
import Bg from './Bg'

import htmlImg from '../assets/icons/html.png'
import cssImg from '../assets/icons/css.png'
import jsImg from '../assets/icons/js.png'
import reactImg from '../assets/icons/react.png'
import tailwindImg from '../assets/icons/tailwindcss.png'
import nodeImg from '../assets/icons/nodejs.png'
import gitImg from '../assets/icons/github.png'
import reactBitsImg from '../assets/icons/react.png'
import uilayoutsImg from '../assets/icons/uilayouts.png'
import shadcnImg from '../assets/icons/shadcn.png'
import nextImg from '../assets/icons/Next.js.png'
import axiosImg from '../assets/icons/axiosinstance.png'
import socketImg from '../assets/icons/socket.io.webp'
import vercelImg from '../assets/icons/Vercel.png'
import renderImg from '../assets/icons/render.png'
import expressImg from '../assets/icons/Express JS.png'
import mysqlImg from '../assets/icons/mysql.jpg'
import mongoImg from '../assets/icons/mongodb.png'
import firebaseImg from '../assets/icons/firebase.png'
import javaImg from '../assets/icons/java.png'

const skills = [
  { name: 'HTML', img: htmlImg },
  { name: 'CSS', img: cssImg },
  { name: 'JavaScript', img: jsImg },
  { name: 'React', img: reactImg },
  { name: 'Tailwind', img: tailwindImg },
  { name: 'Node.js', img: nodeImg },
  { name: 'Git', img: gitImg },
  { name: 'React.bits', img: reactBitsImg },
  { name: 'Ui-layouts', img: uilayoutsImg },
  { name: 'Shadcn', img: shadcnImg },
  { name: 'Next.js', img: nextImg },
  { name: 'Axios', img: axiosImg },
  { name: 'Socket.io', img: socketImg },
  { name: 'Vercel', img: vercelImg },
  { name: 'Render', img: renderImg },
  { name: 'Express.js', img: expressImg },
  { name: 'MySQL', img: mysqlImg },
  { name: 'MongoDB', img: mongoImg },
  { name: 'Firebase', img: firebaseImg },
  { name: 'Java', img: javaImg },
]

const AboutPage = () => {
  return (
    <div className='w-full min-h-screen px-3 xs:px-4 sm:px-6 md:px-8 pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative'>
      <Bg />

      <div className='max-w-6xl mx-auto'>

        {/* Heading */}
        <h1 className='text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 xs:mb-10 sm:mb-12 md:mb-16'>
          Know Who <span className='text-red-500'>I&apos;M</span>
        </h1>

        {/* Main Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12'>

          {/* LEFT */}
          <div className='space-y-6 sm:space-y-8 md:space-y-8'>

            {/* Intro Card */}
            <div className='glass-card'>
              <p className='text-sm xs:text-base sm:text-lg md:text-lg lg:text-lg text-white/90 font-mono'>
                HELLOO! I'm <span className='text-red-500 font-bold'>Rishikesh Natu</span> from <span className='text-red-500'>Sangli, Maharashtra, India</span>.
              </p>
              <p className='text-sm xs:text-base sm:text-lg md:text-lg lg:text-lg text-white/90 font-mono mt-3 sm:mt-4'>
                Pursuing <span className='text-red-500 font-bold'>BCA</span> at <span className='text-red-500'>VPIMSR, Shivaji University Kolhapur</span>.
              </p>
            </div>

            {/* Activities */}
            <div className='glass-card'>
              <h2 className='text-xl xs:text-2xl sm:text-2xl md:text-2xl font-bold text-white mb-4 sm:mb-6'>Outside of Coding</h2>

              <div className='space-y-3 sm:space-y-4 font-mono'>
                {[
                  ['🎮', 'Playing Games', 'Valorant,Minecraft'],
                  ['⚽', 'Playing Sports', 'Football, Cricket , Badminton , Volleyball'],
                  ['🏍️', 'Riding', 'Exploring places'],
                  ['👥', 'Networking', 'Meeting new people'],
                ].map(([icon, title, desc], i) => (
                  <div key={i} className='flex gap-3 sm:gap-4 items-start group'>
                    <span className='text-xl xs:text-2xl sm:text-2xl group-hover:scale-125 transition'>{icon}</span>
                    <div>
                      <p className='text-white font-bold text-sm xs:text-base'>{title}</p>
                      <p className='text-white/70 text-xs xs:text-sm'>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className='glass-card border-red-500/40'>
              <p className='text-lg xs:text-xl sm:text-xl md:text-xl text-white italic font-mono text-center'>
                "Its not over until <span className='text-red-500'>I WIN</span>"
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className='space-y-6 sm:space-y-8 md:space-y-8'>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-3 sm:gap-4 md:gap-4'>
              {['🎓 BCA Student', '💻 Full Stack', '🚀 Passionate', '🎯 Problem Solver'].map((item, i) => (
                <div key={i} className='glass-card text-center py-4 sm:py-5 md:py-6'>
                  <p className='text-xl xs:text-2xl sm:text-2xl text-red-500 mb-1 sm:mb-2'>{item.split(' ')[0]}</p>
                  <p className='text-white font-bold text-xs xs:text-sm sm:text-sm'>{item.slice(2)}</p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className='glass-card'>
              <p className='text-red-500 font-bold mb-1 sm:mb-2 text-sm xs:text-base'>📍 LOCATION</p>
              <p className='text-white font-mono text-sm xs:text-base'>Sangli, Maharashtra</p>

              <div className='border-t border-red-500/20 mt-3 sm:mt-4 pt-3 sm:pt-4'>
                <p className='text-red-500 font-bold text-sm xs:text-base'>✉️ EMAIL</p>
                <a href='mailto:naturishikesh0@gmail.com' className='text-white hover:text-red-500 text-xs xs:text-sm sm:text-sm break-all'>
                  naturishikesh0@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Skills */}
        <div className='mt-12 xs:mt-14 sm:mt-16 md:mt-20'>
          <h2 className='text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-8'>
            Professional <span className='text-red-500'>Skillset</span>
          </h2>

          <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 md:gap-4'>
            {skills.map((skill, idx) => (
              <div key={idx} className='skill-card'>
                <img src={skill.img} className='w-8 xs:w-9 sm:w-10 md:w-10 lg:w-12 bg-white/10 h-8 xs:h-9 sm:h-10 md:h-10 lg:h-12 mb-2 xs:mb-2 sm:mb-3' />
                <p className='text-white text-xs xs:text-xs sm:text-sm md:text-sm font-bold'>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Styles */}
      <style>{`
        .glass-card {
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,0,0,0.25);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          border-color: rgba(255,0,0,0.6);
          box-shadow: 0 10px 40px rgba(255,0,0,0.35);
          transform: translateY(-4px);
        }

        .skill-card {
          backdrop-filter: blur(15px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,0,0,0.25);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          transform: scale(1.05);
          border-color: rgba(255,0,0,0.6);
          box-shadow: 0 0 25px rgba(255,0,0,0.5);
        }

        @media (max-width: 640px) {
          .glass-card {
            padding: 12px;
            border-radius: 10px;
          }

          .skill-card {
            padding: 10px;
            border-radius: 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default AboutPage