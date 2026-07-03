import React from "react";
import { ExperienceTabs } from "../components/ExperienceTabs";
import { experienceData } from "../data/experience-data";

export function ExperienceSection() {
  return (
    <section className="py-8 lg:py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title Section - MATCHING 1ST IMAGE */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Professional Experience</h2>
        </div>
        
        {/* Tabs and Content */}
        <ExperienceTabs categories={experienceData} />
      </div>
    </section>
  );
}

export default ExperienceSection;