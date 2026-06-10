import React from 'react'
import { useState } from 'react';
import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function PublicationCard({ publication }) {

    const [expanded, setExpanded] = useState(false);

    // Toggle card expansion
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Card Header */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium sub-title">{publication.year}</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                        {publication.field.map((field, index) => (
                            <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-50 heading"
                            >
                                {field}
                            </span>
                        ))}
                    </div>
                </div>
                <h3 className="text-lg font-bold heading mb-1 line-clamp-2">{publication.title}</h3>
                <p className="primary-text text-sm italic mb-3">{publication.journal}</p>

                <div className="flex justify-between items-center">
                    <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${publication.status === 'Published'
                                ? 'bg-gray-200 primary-text'
                                : publication.status === 'Submitted'
                                    ? 'bg-gray-200 primary-text'
                                    : 'bg-gray-50 primary-text'
                            }`}
                    >
                        {publication.status}
                    </span>
                    <span className="text-xs font-medium sub-title">{publication.authorship}</span>
                </div>
            </div>

            {/* Card Body (Expandable) */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-5 border-b border-gray-100 bg-gray-50">
                    <h4 className="text-sm font-semibold heading mb-2">Abstract</h4>
                    <p className="primary-text text-sm mb-4">{publication.abstract}</p>

                    {publication.downloadAvailable && (
                        <a
                            href={`#download-${publication.id}`}
                            className="inline-flex items-center active-btn"
                        >
                            <FaDownload className="mr-2" /> Download PDF
                        </a>
                    )}
                </div>
            </div>

            {/* Card Footer */}
            <button
                onClick={toggleExpand}
                className="w-full flex items-center justify-center py-3 text-gray-500 hover:bg-gray-50 transition-colors duration-150"
            >
                {expanded ? (
                    <>
                        <FaChevronUp className="mr-2" /> <span className="text-sm">Show Less</span>
                    </>
                ) : (
                    <>
                        <FaChevronDown className="mr-2" /> <span className="text-sm">Show More</span>
                    </>
                )}
            </button>
        </div>
    )
}
