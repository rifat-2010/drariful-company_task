import React, { useRef, useState } from 'react'
import { X } from 'lucide-react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

const images = [
    {
        src: 'https://i.ibb.co.com/vxkL5zL1/associate-professor2.jpg',
        alt: 'Delivering speech in the world cancer day',
    },
    {
        src: 'https://i.ibb.co.com/cK0RVjKx/21.jpg',
        alt: 'Briefing about the molecular lab with Ekhon TV',
    },
    {
        src: 'https://i.ibb.co.com/jkHyK59g/Whats-App-Image-2025-05-10-at-19-42-22-3d0c34b2.jpg',
        alt: 'With ISO expert Dr Patric Mateta and Oncologist Dr. Paul Mainwaring, MD, FRCPA',
    },
    {
        src: 'https://i.ibb.co.com/nqv1n827/lab-leadership.jpg',
        alt: 'Working to establish a digital pathology platform',
    },
    {
        src: 'https://i.ibb.co.com/8CKNbsJ/lab-director.jpg',
        alt: 'After completion of a successful ISO inspection',
    },
    {
        src: 'https://i.ibb.co.com/yFksj4Z9/workshop-2.jpg',
        alt: 'After completion of a successful ISO inspection',
    },
    {
        src: 'https://i.ibb.co.com/39n8Sz85/workshop.jpg',
        alt: 'In Biomolecular conference room',
    },
    {
        src: 'https://i.ibb.co.com/pjt7WF07/clinical-experience.jpg',
        alt: 'Doing more thousands of image guided and non guided core biopsies alongside the radiologist',
    },
    {
        src: 'https://i.ibb.co.com/LXZdgyHL/public-engage2.jpg',
        alt: 'Seminar on "Why we need a Biomolecular laboratory"',
    },
    {
        src: 'https://i.ibb.co.com/Ldjxrsq8/public-engage-3.jpg',
        alt: 'Working on the field of precision cancer medicine',
    },
    {
        src: 'https://i.ibb.co.com/RkPt9vK4/clinical-experience2.jpg',
        alt: 'More than 500 immunohistochemistry cases signed out from our lab',
    },
    {
        src: 'https://i.ibb.co.com/d4cLMwff/2025-05-10.jpg',
        alt: 'Inspection of ISO experts in molecular lab',
    },
    {
        src: 'https://i.ibb.co.com/HJ8BhbJ/2025-05-10.jpg',
        alt: 'Dedicated for patients wellbeing',
    },
];


export default function Gallery() {

    const scrollRef = useRef(null);
    const [modalImage, setModalImage] = useState(null);
    const location = useLocation();

    // Function to scroll to the top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = current.offsetWidth / 2;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className='w-11/12 mx-auto mb-5 md:mb-10'>
            <h1 className='text-center text-2xl lg:text-3xl font-bold heading mb-2'>Gallery Highlights</h1>
            <p className='text-sm md:text-base text-center primary-text mb-5'>Gallery of Clinical Work & Medical Insights</p>
            <div className="relative">
                {/* Carousel */}
                <div className="overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
                    >
                        {images.map((image, idx) => (
                            <div
                                key={idx}
                                className="min-w-[20%] cursor-pointer flex-shrink-0"
                                onClick={() => setModalImage(image)}
                            >
                                <img src={image.src} alt={image.alt} className="w-full h-48 object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 sub-title bg-white p-2 rounded-full shadow"
                >
                    <IoIosArrowBack />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 sub-title bg-white p-2 rounded-full shadow"
                >
                    <IoIosArrowForward />
                </button>

                {/* Lightbox Modal */}
                {modalImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
                        <div className="relative max-w-4xl w-full">
                            {/* Close Icon */}
                            <button
                                onClick={() => setModalImage(null)}
                                className="absolute top-6 right-28 text-white bg-black/50 rounded-full p-1 hover:bg-black"
                            >
                                <X size={24} />
                            </button>

                            {/* Full Image */}
                            <img
                                src={modalImage.src}
                                alt={modalImage.alt}
                                className="max-h-[80vh] w-full object-contain rounded-lg"
                            />

                            {/* Caption */}
                            <div className="text-xl text-white font-bold text-center mt-4">
                                {modalImage.alt}
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className='text-end mt-1'>
                <Link onClick={scrollToTop} to={'/gallery'} className='sub-title font-semibold underline'>See More...</Link>
            </div>
        </div>
    )
}
