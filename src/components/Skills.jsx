import React from 'react'
import {
  FaMicroscope,
  FaDna,
  FaVial,
  FaChartBar,
  FaPaintBrush,
  FaChalkboardTeacher,
  FaDesktop,
  FaFacebook,
  FaFlask,
  FaGraduationCap,
  FaTools,
  FaBriefcaseMedical
} from 'react-icons/fa';
import { skills } from '../data/projects';
import { BiSolidClinic } from 'react-icons/bi';
import { GiDna2, GiMedicines } from 'react-icons/gi';

const SkillsInterests = () => {
  // Get skill categories
  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const toolSkills = skills.filter(skill => skill.category === 'tools-communication');
  // const educationalSkills = skills.filter(skill => skill.category === 'educational');
  // const researchInterests = skills.filter(skill => skill.category === 'research');

  // Map skill names to icons
  const getIcon = (skillName) => {
    const iconMap = {
      'Clinical cytology': <BiSolidClinic />,
      'Histopathology': <FaVial />,
      'Molecular Pathology': <FaMicroscope />,
      'Medical Education': <FaBriefcaseMedical />,
      'Precision Cancer Mediciney': <GiDna2 />,
      'LIMS': <FaTools />,
      'QMS': <FaTools />,
      'Molecular Diagnostic': <FaDna />,
      'SPSS': <FaChartBar />,
      'Canva': <FaPaintBrush />,
      'MS Office': <FaDesktop />,
      'Medical Presentation': <FaChalkboardTeacher />,
      'Content Creation': <FaFacebook />,
      'Academic Administration': <FaGraduationCap />,
    };

    return iconMap[skillName] || <FaFlask />;
  };

  // Render skill item
  const SkillItem = ({ name }) => (
    <div className="flex items-center rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-300 bg-[#f9fafb]">
      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[#2872C6] mr-3">
        {getIcon(name)}
      </div>
      <span className="primary-text font-normal">{name}</span>
    </div>
  );

  // Render skill category section
  const SkillCategory = ({ title, skills }) => (
    <div className="mb-5">
      <h3 className="text-xl font-semibold mb-3 flex items-center">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {skills.map((skill, index) => (
          <SkillItem key={index} name={skill.name} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-8 lg:py-16">
      <div className=" px-4">
        <div className="w-11/12 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center heading">Skills & Interests</h2>
          <p className="text-sm md:text-base primary-text text-center mb-5 md:mb-8">Expertise and areas of professional focus</p>

          <div className="bg-white rounded-xl p-8 shadow-md sub-title">
            <SkillCategory
              title="Medical Skills"
              skills={technicalSkills}
            />

            <SkillCategory
              title="Tools | Communication"
              skills={toolSkills}
            />

            {/* <SkillCategory
              title="Educational"
              skills={educationalSkills}
            /> */}

            {/* <SkillCategory
              title="Research Interests"
              skills={researchInterests}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsInterests;
