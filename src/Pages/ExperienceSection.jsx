import React from "react";
import { ExperienceTabs } from "../components/ExperienceTabs";
import { experienceData } from "../data/experience-data";

export function ExperienceSection() {
  return (
    <section className="mt-8 lg:mt-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-5 md:mb-12 text-center text-2xl md:text-3xl font-bold heading sm:text-4xl primary-text">Professional Experience</h2>
        <ExperienceTabs categories={experienceData} />
      </div>
    </section>
  );
}

export default ExperienceSection;
