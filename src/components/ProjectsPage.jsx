import React from 'react'
import Bg from './Bg'

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: 'ROLLCALLRALLY',
      description: 'A face recognition attendance system for colleges. Uses HTML/CSS/JS + face-api.js for browser webcam punches with liveness detection, multi-face filter, QR fallback. PHP 8+ backend with MySQL. Multi-role support (student/teacher/admin), shift validation, and percentage reports.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'face-api.js'],
      github: 'https://github.com/RJN-github/ROLLCALLRALLY',
      live: '',
    },
    {
      id: 2,
      title: 'Ratnatray Traders - Billing App',
      description: 'A real-time billing application developed for Ratnatray Traders in Sangli. Simplifies product entry management, customer details, and invoice generation. Built with HTML, CSS, JavaScript, PHP, and MySQL. Streamlines billing processes with offline database support capabilities.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      github: 'https://github.com/RJN-github/ratnatray',
      live: '',
    },
    {
      id: 3,
      title: 'Guessify',
      description: 'A comprehensive multiplayer game inspired by Skribble.io. Players can draw, guess, and compete in real-time. Built with WebSocket support for seamless multiplayer experience and interactive gameplay.',
      tech: ['JavaScript', 'React', 'WebSocket', 'Node.js'],
      github: 'https://github.com/RJN-github/guessify',
      live: '',
    },
    {
      id: 4,
      title: 'YouTube Clone 2.0',
      description: 'A fullstack YouTube clone built for internship at NullClass ltd. Features video uploading, streaming, recommendations, and user authentication. Built with modern web technologies for a production-ready experience.',
      tech: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/RJN-github/youtube-clone2.0',
      live: 'https://youtube-clone-rl82.vercel.app',
    },
    {
      id: 5,
      title: 'Currency Converter',
      description: 'A modern currency converter web app built with React.js and Tailwind CSS. Fetches real-time exchange rates from the Frankfurter API. Features glassmorphism styling, responsive UI, and smooth animations.',
      tech: ['React', 'Tailwind CSS', 'JavaScript', 'API'],
      github: 'https://github.com/RJN-github/Currency_Convertor',
      live: 'https://currency-convertor-one-mu.vercel.app',
    },
    {
      id: 6,
      title: 'Password Generator',
      description: 'A responsive React + Tailwind password generator that creates strong passwords based on selected length, numbers & special characters. Features include clipboard copy functionality, live generation, and UI transitions.',
      tech: ['React', 'Tailwind CSS', 'JavaScript', 'Hooks'],
      github: 'https://github.com/RJN-github/Password_Generator',
      live: 'https://password-generator-xi-lovat-53.vercel.app',
    },
    {
      id: 7,
      title: 'To-Do List v2',
      description: 'A minimal yet powerful to-do list built with React. Features localStorage persistence, task filtering (All, Completed, Pending), and interactive task management using checkboxes. Smooth and responsive UI for daily task tracking.',
      tech: ['React', 'JavaScript', 'localStorage', 'CSS'],
      github: 'https://github.com/RJN-github/todo-list-v2',
      live: 'https://todo-list-v2-smoky.vercel.app',
    },
    {
      id: 8,
      title: 'CodeCrafters',
      description: 'An interactive coding quiz platform built to test and improve programming skills. Features MCQs, instant feedback, score tracking, and clean UI. Built using HTML, CSS, JS with DOM manipulation and logic flow.',
      tech: ['HTML', 'CSS', 'JavaScript', 'DOM'],
      github: 'https://github.com/RJN-github/CodeCrafters',
      live: '',
    }
  ]

  return (
    <div className="min-h-screen relative py-4 xs:py-5 sm:py-6 md:py-8 lg:py-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-4">
      <Bg />
      <div className="max-w-6xl mx-auto relative z-10 pt-16 xs:pt-18 sm:pt-20 md:pt-16">
        <div className="text-center md:text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 animate-fadeInDown">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-red-600 mb-2 xs:mb-3 sm:mb-4 uppercase tracking-tight drop-shadow-lg">
            My Projects
          </h1>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-2xl text-white font-bold tracking-wide">
            Explore my recent work and contributions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 animate-fadeInUp">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col h-full rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden 
                         bg-white/10 backdrop-blur-3xl 
                         border border-white/20 xs:border hover:border-red-500/50
                         shadow-lg xs:shadow-xl md:shadow-2xl hover:shadow-red-500/30
                         transition-all duration-300 ease-out
                         hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-101
                         before:absolute before:inset-0 before:bg-linear-to-br 
                         before:from-white/5 before:to-white/0 before:pointer-events-none
                         after:absolute after:inset-0 after:bg-linear-to-tr 
                         after:from-red-500/0 after:to-white/5 after:pointer-events-none 
                         after:opacity-0 group-hover:after:opacity-100 after:transition-opacity"
            >
              <div className="relative px-2.5 xs:px-3 sm:px-4 md:px-6 py-2.5 xs:py-3 sm:py-4 md:py-4
                             border-b border-red-500/30
                            min-h-12 xs:min-h-14 sm:min-h-14 md:min-h-16 flex items-center">
                <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-black text-white leading-tight tracking-wide">
                  {project.title}
                </h2>
              </div>

              <div className="flex-1 px-2.5 xs:px-3 sm:px-4 md:px-6 py-3 xs:py-4 sm:py-5 md:py-5 flex flex-col gap-2 xs:gap-3 sm:gap-4">
                <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-semibold">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 text-xs font-bold text-white/95
                               bg-red-600/25 backdrop-blur-md
                               border border-red-500/40 rounded-full
                               hover:bg-red-600/40 hover:border-red-500/70
                               transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-2.5 xs:px-3 sm:px-4 md:px-6 py-3 xs:py-4 sm:py-5 md:py-5 flex flex-col sm:flex-row gap-1.5 xs:gap-2 sm:gap-3 
                            border-t border-red-500/30">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-20 xs:min-w-24 sm:min-w-24 md:min-w-28 py-1.5 xs:py-2 sm:py-2.5 md:py-2.5 px-2 xs:px-3 sm:px-4 md:px-4
                            bg-linear-to-r from-red-600 to-red-700
                           hover:from-red-700 hover:to-red-800
                           border border-red-600/60 xs:border-2 hover:border-red-500
                           text-white font-bold text-xs uppercase tracking-widest
                           rounded-md xs:rounded-lg transition-all duration-200
                           hover:shadow-lg hover:shadow-red-600/50
                           flex items-center justify-center gap-1 xs:gap-2
                           active:scale-95"
                >
                  <span>★</span>
                  <span className="hidden xs:inline">GitHub</span>
                  <span className="xs:hidden text-[10px]">Github</span>
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-20 xs:min-w-24 sm:min-w-24 md:min-w-28 py-1.5 xs:py-2 sm:py-2.5 md:py-2.5 px-2 xs:px-3 sm:px-4 md:px-4
                             bg-linear-to-r from-orange-500 to-red-600
                             hover:from-orange-600 hover:to-red-700
                             border border-red-600/60 xs:border-2 hover:border-red-500
                             text-white font-bold text-xs uppercase tracking-widest
                             rounded-md xs:rounded-lg transition-all duration-200
                             hover:shadow-lg hover:shadow-red-600/50
                             flex items-center justify-center gap-1 xs:gap-2
                             active:scale-95"
                  >
                    <span>🔗</span>
                    <span className="hidden xs:inline">Live</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
      `}</style>
    </div>
  )
}

export default ProjectsPage
