import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Phonelogo from '../assets/tmss - BG.png'
import logo from '../assets/tmss - BG Transparent.png'

import './nav.css'

export default function Nav() {
    const location = useLocation();

    // Function to scroll to the top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="navbar sticky top-0 z-10 bg-[#003878] md:bg-base-100 px-5 md:px-20 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-link lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white md:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow nav-link secondary-text">
                        <li><Link
                            className={location.pathname === "/" ? "btn-active" : " "}
                            to={'/'}
                            onClick={scrollToTop}>Home</Link></li>

                        <li><Link
                            className={location.pathname === "/about" ? "btn-active" : " "}
                            to={'/about'}
                            onClick={scrollToTop}>About</Link></li>

                        <li><Link
                            className={location.pathname === "/resume" ? "btn-active" : " "}
                            to={'/resume'}
                            onClick={scrollToTop}>Resume</Link></li>

                        <li><Link
                            className={location.pathname === "/publication" ? "btn-active" : " "}
                            to={'/publication'}
                            onClick={scrollToTop}>Research</Link></li>
                        <li><Link
                            className={location.pathname === "/gallery" ? "btn-active" : " "}
                            to={'/gallery'}
                            onClick={scrollToTop}>Gallery</Link></li>
                        <li><Link
                            className={location.pathname.startsWith("/blogs") ? "btn-active" : " "}
                            to={'/blogs'}
                            onClick={scrollToTop}>Blogs</Link></li>
                    </ul>
                </div>
                <img className='ml-12 w-20 block md:hidden' src={Phonelogo} alt="Logo" />
                <img className='ml-40 lg:ml-0 w-32 hidden md:block' src={logo} alt="Logo" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu-horizontal px-1 space-x-5 nav-link text-lg secondary-text font-semibold">

                    <li><Link
                        className={location.pathname === "/" ? "btn-active" : " "}
                        to={'/'}
                        onClick={scrollToTop}>Home</Link></li>

                    <li><Link
                        className={location.pathname === "/about" ? "btn-active" : " "}
                        to={'/about'}
                        onClick={scrollToTop}>About</Link></li>

                    <li><Link
                        className={location.pathname === "/resume" ? "btn-active" : " "}
                        to={'/resume'}
                        onClick={scrollToTop}>Resume</Link></li>
                    <li><Link
                        className={location.pathname === "/publication" ? "btn-active" : " "}
                        to={'/publication'}
                        onClick={scrollToTop}>Research</Link></li>
                    <li><Link
                        className={location.pathname === "/academy" ? "btn-active" : " "}
                        to={'/academy'}
                        onClick={scrollToTop}>Academy</Link></li>
                    <li><Link
                        className={location.pathname === "/gallery" ? "btn-active" : " "}
                        to={'/gallery'}
                        onClick={scrollToTop}>Gallery</Link></li>
                    <li><Link
                        className={location.pathname.startsWith("/blogs") ? "btn-active" : " "}
                        to={'/blogs'}
                        onClick={scrollToTop}>Blogs</Link></li>
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-4">
                <Link 
                    to={'/login'} 
                    className="text-white md:text-gray-700 hover:text-blue-200 md:hover:text-[#003878] text-sm font-bold transition-colors"
                    onClick={scrollToTop}
                >
                    Admin
                </Link>
                <a className="active-btn">
                    <Link to={'/contact'} onClick={scrollToTop}>Contact</Link>
                </a>
            </div>
        </div>
    )
}
