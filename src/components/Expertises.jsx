import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaBookMedical, FaClinicMedical } from 'react-icons/fa';
import { CiMedicalCross } from 'react-icons/ci';

export default function Expertises() {
    const [expandedBooks, setExpandedBooks] = useState(true);
    const [expandedCommittees, setExpandedCommittees] = useState(true);
    const [showAllBooks, setShowAllBooks] = useState(false);
    const [showAllCommittees, setShowAllCommittees] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const Clinical = [
        { title: "Surgical Pathology" },
        { title: "Cytopathology" },
        { title: "Immunohistochemistry" },
        { title: "Immunofluorescence" },
        { title: "Image-guided FNAC" },
        { title: "Core biopsy (CT/USG-guided)" },
        { title: "Liquid-based cytology" },
        { title: "Frozen section biopsy" },
        { title: "Molecular diagnostics" },
        { title: "Precision cancer medicine" },
        { title: "Histopathological & clinical correlation" },
        { title: "Teaching methodology and curriculum design" }
    ];

    const Education = [
        { title: "Faculty Development Program Leader, TMSS Medical College" },
        { title: "Integrated Teaching Workshop Conductor (2022)" },
        { title: "Admin, Easypathology - Facebook academic group for undergraduates " },
        { title: "Admin, Bangladesh Surgical Pathology - Academic group for postgraduate professionals" },
        { title: "Participant, SEARAME Medical Education Conference (2021) " },
        { title: "Trained in Teaching Methodology - Centre for Medical Education (2017)" }
    ];

    // Determine slice count based on screen size
    const clinicalSliceCount = isLargeScreen ? 5 : 3;

    return (
        <div className="w-11/12 mx-auto mt-5 lg:mt-16">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-5 heading">Expertise</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-2 lg:py-6">
                {/* Clinical and Laboratory Expertise Section */}
                <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-[10px_10px_5px_rgba(117,117,128,0.75)]">
                    <div className="flex items-center">
                        <FaClinicMedical className="sub-title mr-3" size={24} />
                        <h2 className="text-xl font-semibold sub-title">Clinical and Laboratory Expertise</h2>
                    </div>

                    {expandedBooks && (
                        <div className="mt-4 ml-9">
                            <ul className="space-y-2">
                                {(showAllBooks ? Clinical : Clinical.slice(0, clinicalSliceCount)).map((item, index) => (
                                    <div className='flex items-center' key={index}>
                                        <CiMedicalCross className='font-bold sub-title mr-1 text-xl' />
                                        <h3 className="font-medium text-base heading">{item.title}</h3>
                                    </div>
                                ))}
                            </ul>

                            <button
                                className="mt-4 font-bold flex sub-title items-center"
                                onClick={() => setShowAllBooks(!showAllBooks)}
                            >
                                {showAllBooks ? (
                                    <>
                                        <span>Show Less</span>
                                        <ChevronUp className="ml-1 mt-1 font-bold" size={20} />
                                    </>
                                ) : (
                                    <>
                                        <span>Show More</span>
                                        <ChevronDown className="ml-1 mt-1 font-bold" size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Teaching and Medical Education Experience Section */}
                <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-[10px_10px_5px_rgba(117,117,128,0.75)]">
                    <div className="flex items-center">
                        <FaBookMedical className="sub-title mr-3" size={24} />
                        <h2 className="text-xl font-semibold sub-title">Teaching and Medical Education Experience</h2>
                    </div>

                    {expandedCommittees && (
                        <div className="mt-4 ml-9">
                            <ul className="space-y-3">
                                {(showAllCommittees ? Education : Education.slice(0, clinicalSliceCount)).map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <CiMedicalCross className='font-bold sub-title mr-2 text-xl' />
                                        <div>
                                            <span className="font-medium heading">{item.title}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="mt-4 font-bold flex sub-title items-center"
                                onClick={() => setShowAllCommittees(!showAllCommittees)}
                            >
                                {showAllCommittees ? (
                                    <>
                                        <span>Show Less</span>
                                        <ChevronUp className="ml-1 mt-1" size={20} />
                                    </>
                                ) : (
                                    <>
                                        <span>Show More</span>
                                        <ChevronDown className="ml-1 mt-1" size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
