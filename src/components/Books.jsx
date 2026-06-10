import React, { useState } from 'react'
import { Book, ChevronDown, ChevronUp } from 'lucide-react';

export default function Books() {
    const [expandedBooks, setExpandedBooks] = useState(true);
  

  const toggleBooks = () => setExpandedBooks(!expandedBooks);
  
  const published = [
    {
      title: " Master the Pathology",
      description: "Contributing author and editor of the book Master the pathology published from platform publication"
    },
  ];

  const inprogress = [
    {
      title: "Plagiarized Surgical Pathology",
      description: "Designed for MD Pathology residents"
    },
    {
      title: "Easypathology",
      description: "For undergraduate medical students across South Asia"
    }
  ];
  
  return (
    <div className="w-11/12 mx-auto mt-8 lg:mt-16">
    <h1 className="text-2xl md:text-3xl font-bold text-center mb-5 heading">Books</h1>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/*Published Books Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-[10px_10px_5px_rgba(117,117,128,0.75)]">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={toggleBooks}
        >
          <div className="flex items-center">
            <Book className="sub-title mr-3" size={24} />
            <h2 className="text-xl font-semibold sub-title">Published</h2>
          </div>
          {/* {expandedBooks ? (
            <ChevronUp className="text-blue-700" size={24} />
          ) : (
            <ChevronDown className="text-blue-700" size={24} />
          )} */}
        </div>
        
        {/* {expandedBooks && ( */}
          <div className="mt-4 ml-9">
            <ul className="space-y-4">
              {published.map((published, index) => (
                <li key={index} className="border-l-4 border-[#e88d67] pl-4 py-2">
                  <h3 className="font-bold text-lg heading">{published.title}</h3>
                  <p className="primary-text">{published.description}</p>
                </li>
              ))}
            </ul>
          </div>
        {/* )} */}
      </div>
      {/*In progress Books Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-[10px_10px_5px_rgba(117,117,128,0.75)]">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={toggleBooks}
        >
          <div className="flex items-center">
            <Book className="sub-title mr-3" size={24} />
            <h2 className="text-xl font-semibold sub-title">In progress</h2>
          </div>
          {/* {expandedBooks ? (
            <ChevronUp className="text-blue-700" size={24} />
          ) : (
            <ChevronDown className="text-blue-700" size={24} />
          )} */}
        </div>
        
        {/* {expandedBooks && ( */}
          <div className="mt-4 ml-9">
            <ul className="space-y-4">
              {inprogress.map((inprogress, index) => (
                <li key={index} className="border-l-4 border-[#e88d67] pl-4 py-2">
                  <h3 className="font-bold text-lg heading">{inprogress.title}</h3>
                  <p className="primary-text">{inprogress.description}</p>
                </li>
              ))}
            </ul>
          </div>
        {/* )} */}
      </div>
      
    </div>
  </div>
  )
}
