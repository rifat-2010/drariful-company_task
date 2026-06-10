import React from "react";
import Nav from "../Header/Nav";
import Banner from "../Header/Banner";
import Awards from "../components/Awards";
import Footer from "../Footer/Footer";
import Skills from "../components/Skills";
import FeaturedProjects from "../components/FeaturedProjects";
import AcademyHighlight from "../components/AcademyHighlight";
import CurrentPosition from "../components/CurrentPosition";
import Expertises from "../components/Expertises";
import Contributions from "../components/Contributions";
import Books from "../components/Books";
import Gallery from "../components/Gallery";
import ExperienceSection from "./ExperienceSection";

export default function Home() {
  return (
    <div className="bg-[#f9fafb]">
      <Nav />
      <Banner /> 
      <CurrentPosition/> 
      {/* <AcademyHighlight />  */}
      <div className=" bg-gray-50">
        <ExperienceSection />
      </div>
      <Books></Books>
      <FeaturedProjects />
      <Expertises></Expertises>
      <Contributions></Contributions>
      <Skills></Skills>
      <Awards />  
      <Gallery></Gallery> 
      <Footer />
    </div>
  );
}
