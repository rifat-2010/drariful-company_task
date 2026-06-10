import { useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaResearchgate, FaEnvelope, FaFacebook } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer id="contact" className="bg-[#001A33] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">

                        <div className='w-full lg:w-4/6 flex justify-around lg:justify-start gap-10 lg:gap-52'>
                            {/* Contact Info */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <FaEnvelope className="mr-2 text-white" />
                                    <a href="mailto:arifurrahmandm@gmail.com" className="hover:text-[#003878] transition-colors">
                                        arifurrahmandm@gmail.com
                                    </a>
                                </li>
                                <li>Molecular pathologist</li>
                                <li> TMSS Medical College</li>
                                <li>Bogura, Bangladesh</li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link
                                    className="hover:text-[#e88d67] transition-colors"
                                    to={'/about'}
                                    onClick={scrollToTop}>About</Link></li>
                                <li><Link
                                    className="hover:text-[#e88d67] transition-colors"
                                    to={'/resume'}
                                    onClick={scrollToTop}>Resume</Link></li>
                                <li><Link
                                    className="hover:text-[#e88d67] transition-colors"
                                    to={'/publication'}
                                    onClick={scrollToTop}>Research</Link></li>
                                <li><Link
                                    className="hover:text-[#e88d67] transition-colors"
                                    to={'/academy'}
                                    onClick={scrollToTop}>Academy</Link></li>
                                <li><Link
                                    className="hover:text-[#e88d67] transition-colors"
                                    to={'/gallery'}
                                    onClick={scrollToTop}>Gallery</Link></li>
                                <li><Link
                                    className="hover:text-[#e88d67] transition-colors"
                                    to={'/blogs'}
                                    onClick={scrollToTop}>Blogs</Link></li>
                                <li><Link
                                    className="hover:text-gray-300 text-xs text-gray-500 transition-colors"
                                    to={'/login'}
                                    onClick={scrollToTop}>Admin CMS</Link></li>
                            </ul>
                        </div>

                        </div>

                        {/* Social & Connect */}
                        <div className='w-full lg:w-2/6 text-center lg:text-start'>
                            <h3 className="text-xl font-bold mb-4">Connect</h3>
                            <p className="mb-4">Follow my research and connect with me on academic and professional networks.</p>
                            <div className='flex justify-center lg:justify-start'>
                                <div className="flex space-x-4">
                                <a
                                    href="https://www.facebook.com/share/1BeptZC5V8/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#003878] transition-colors"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#003878] transition-colors"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#003878] transition-colors"
                                >
                                    <FaLinkedin />
                                </a>

                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-400 text-center flex flex-col md:flex-row justify-between items-center space-y-2">
                        <p className="text-gray-400 text-sm lg:text-base">
                            © {new Date().getFullYear()} Dr. DM Arifur Rahman. All rights reserved.
                        </p>
                        <p className='text-gray-400 text-sm lg:text-base'>Deploped by <a className='font-semibold' target='_blank' href="https://pinova.tech/">Pinova Technologies</a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
