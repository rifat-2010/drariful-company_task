import React from 'react'
import { useState } from 'react';
import { FaGraduationCap, FaHospital, FaChevronDown, FaChevronUp, FaBookReader, FaBookOpen } from 'react-icons/fa';


export default function AcademyHighlight() {

    const [expandedItems, setExpandedItems] = useState({
            'md': true,
            'graduation': false,
            'higher': false,
            'secondary': false
          });
        
          // Toggle section expansion
          const toggleSection = (section) => {
            setExpandedItems(prev => ({
              ...prev,
              [section]: !prev[section]
            }));
          };
        
          // Get icon for section
          const getSectionIcon = (section) => {
            switch(section) {
              case 'md': return <FaHospital className="text-[#0066CB]" />;
              case 'graduation': return <FaGraduationCap className="text-[#0066CB]" />;
              case 'higher': return <FaBookReader className="text-[#0066CB]" />;
              case 'secondary': return <FaBookOpen className="text-[#0066CB]" />;
              default: return <FaGraduationCap className="text-[#0066CB]" />;
            }
          };
        
          // Timeline data
          const timeline = [
            {
              id: 'md',
              year: '2017',
              title: 'M.D. (Pathology) ',
              items: [
                'From Sheikh Mujib Medical University, Dhaka.',
                ' July 2010 ' 
              ]
            },
            {
              id: 'graduation',
              year: '2010',
              title: 'M.B.B.S',
              items: [
                'From Mymensingh Medical College.',
                'March, 2017 '
              ]
            },
            {
              id: 'higher',
              year: '2004',
              title: 'H.S.C',
              items: [
                'From Nur Mohammad Rifles Public school & college',
                'Dhaka Board ',
                'Science Group'
              ]
            },
            {
              id: 'secondary',
              year: '2002',
              title: 'S.S.C',
              items: [
                'From Nur Mohammad Rifles Public school & college',
                'Dhaka Board ',
                'Science Group'
              ]
            }
          ];

  return (
    <div>
            <section id="background" className="py-6 lg:py-12 bg-gray-50 px-12 lg:px-0">
          <div className="container mx-auto primary-text">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-2 heading text-center">Academic Background</h2>
              <p className="text-center mb-8">Professional experience and academic qualifications</p>
    
              <div className="relative pl-8 before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
                {timeline.map((item) => (
                  <div key={item.id} className="mb-8 relative">
                    {/* Timeline dot */}
                    <div className="absolute left-[-32px] w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center">
                        {getSectionIcon(item.id)}
                      </div>
                    </div>
    
                    {/* Year badge */}
                    <div className="absolute left-[-68px] top-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      {item.year}
                    </div>
    
                    {/* Content card */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      {/* Card header */}
                      <button
                        className="flex items-center justify-between text-left p-5 font-semibold hover:bg-gray-50 transition-colors sub-title"
                        onClick={() => toggleSection(item.id)}
                      >
                        <span className="text-xl">{item.title}</span>
                        {expandedItems[item.id] ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
    
                      {/* Card content (expandable) */}
                      <div className={`overflow-hidden transition-all duration-300 ${expandedItems[item.id] ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="p-5 pt-0 border-t border-gray-100">
                          <ul className="space-y-3">
                            {item.items.map((listItem, index) => (
                              <li key={index} className="flex">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CB] mt-2 mr-2 flex-shrink-0"></span>
                                <span className="primary-text">{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </div>
  )
}
