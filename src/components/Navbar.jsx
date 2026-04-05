import React, { useState, useEffect } from 'react'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => document.body.style.overflow = ''
    }, [menuOpen])

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Resume', href: '/resume' }
    ]

    return (
        <div className="fixed top-1 items-center sm:top-2 left-0 w-full flex justify-center z-50 px-2 sm:px-3 md:px-4">
            
            <div className="
                w-full max-w-7xl
                px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5
                flex justify-between items-center
               
                backdrop-blur-lg 
                border border-white/20 
                rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl
            ">

                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white cursor-pointer RJN tracking-wider transition-all duration-300 hover:text-red-500">
                    <a href="/">RJN.</a>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex justify-center items-center flex-col gap-2 relative z-50"
                >
                    <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>

                <ul className="hidden md:flex gap-4 lg:gap-8">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className="
                                    relative text-white text-sm lg:text-lg font-medium px-2 py-1
                                    transition duration-300
                                    
                                    before:absolute before:bottom-0 before:left-0 
                                    before:w-0 before:h-0.5 before:bg-red-500 
                                    before:transition-all before:duration-300
                                    
                                    hover:before:w-full
                                "
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {menuOpen && (
                <div className="
                    fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40
                " onClick={() => setMenuOpen(false)}>
                </div>
            )}

            <div className={`
                fixed top-0 right-0 h-full w-[75%] max-w-xs
               
                backdrop-blur-lg 
                border border-white/20 
                rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl
               
                border-l 
                p-6 flex flex-col gap-4
                transform transition-transform duration-300 z-50
                ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                md:hidden
            `}>
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-white border-b-2 border-l-2 pl-2     border-red-500 rounded-bl-lg w-full font-bold text-lg py-2  hover:bg-red-500/20 transition"
                    >
                        {item.label}
                    </a>
                ))}
            </div>

        </div>
    )
}

export default Navbar