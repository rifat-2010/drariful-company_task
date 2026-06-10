import React from 'react'
import Nav from '../Header/Nav'
import addressIcon from '../assets/adress-icon.png'
import phnIcon from '../assets/phone-icon.png'
import emailIcon from '../assets/email-icon.png'
import { IoLocationOutline } from 'react-icons/io5'
import { FiPhone } from 'react-icons/fi'
import { TfiEmail } from 'react-icons/tfi'

export default function Contact() {
    return (
        <div>
            <Nav></Nav>
            <div className="text-center py-10 bg-[#f9fafb] px-5 lg:px-0">
                <h1 className="text-4xl font-bold heading uppercase">Contact</h1>
                <p className="primary-text font-semibold mt-4">
                Contact Me for Consultations or Academic Engagements.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 py-10 bg-[#f9fafb]">
                {/* Address Section */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        {/* <img src={addressIcon} alt="Adress Icon" /> */}
                        <IoLocationOutline className='text-8xl sub-title'/> 
                    </div>
                    <h2 className="text-xl font-semibold heading">Address</h2>
                    <p className="primary-text italic mt-2">Snighdha Residential Area, Uposhohor, Bogura</p>
                </div>
                {/* Call Us Section */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        {/* <img src={phnIcon} alt="Phone Icon" /> */}
                        <FiPhone className='text-8xl sub-title' />
                    </div>
                    <h2 className="text-xl font-semibold heading">Call Us</h2>
                    <p className="mt-2 italic">+8801324 763139</p>
                </div>
                {/* Email Us Section */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        {/* <img src={emailIcon} alt="Email Icon" /> */}
                        <TfiEmail className='text-8xl sub-title' />
                    </div>
                    <h2 className="text-xl font-semibold heading">Email Us</h2>
                    <p className="mt-2 italic ">
                        <a href="mailto:arifurrahmandm@gmail.com">arifurrahmandm@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
