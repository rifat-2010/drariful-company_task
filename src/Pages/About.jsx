import React from "react";
import Nav from "../Header/Nav";
import profileSm from "../assets/profile3.jpg";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div>
      <Nav></Nav>
      <div className="px-4 md:px-0 pt-5 lg:pt-8 bg-[#f9fafb]">
        <div className="w-11/12 mx-auto">
          <div className="text-center">
            <h1 className="heading text-3xl font-bold pb-2 mb-4">ABOUT ME</h1>
            <p className="mb-10 sub-title font-semibold">
              Associate Professor of Histopathology | Laboratory Director |
              Molecular Pathology Expert
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center px-0 lg:px-10">
            {/* Left Section - Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src={profileSm}
                alt="About Me"
                className="rounded-lg w-[250px] lg:w-[400px]"
              />
            </div>

            {/* Right Section - Content */}
            <div className="primary-text">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-bold heading">Name:</span> D.M. Arifur
                    Rahman
                  </p>
                  <p>
                    <span className="font-bold heading">Education:</span>{" "}
                    MD(Pathology) | MBBS
                  </p>
                  
                  <p>
                    <span className="font-bold heading">Father's Name:</span> DM
                    Mostafizur Rahman
                  </p>
                  <p>
                    <span className="font-bold heading">Mother's Name:</span>{" "}
                    Ferdousi Begum{" "}
                  </p>
                  <p>
                    <span className="font-bold heading">Present Address:</span>{" "}
                    Snighdha Residential Area, Uposhohor, Bogura
                  </p>
                  <p>
                    <span className="font-bold heading">
                      Permanent Address:
                    </span>{" "}
                    Baluvora, Naogaon Sadar, Naogaon
                  </p>
                  <p>
                    <span className="font-bold heading">
                      Place of Birth / Hometown:
                    </span>{" "}
                    Naogaon Sadar, Naogaon
                  </p>
                  <p>
                    <span className="font-bold heading">Gender:</span> Male
                  </p>
                  <p>
                    <span className="font-bold heading">Marital Status:</span>{" "}
                    Married with two children
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <span className="font-bold heading">Phone:</span> 01676
                    810855
                  </p>
                  <p>
                    <span className="font-bold heading">Email:</span> arifurrahmandm@gmail.com
                  </p>

                  <p>
                    <span className="font-bold heading">Religion:</span> Islam
                  </p>
                  <p>
                    <span className="font-bold heading">Nationality:</span>{" "}
                    Bangladeshi
                  </p>
                  <p>
                    <span className="font-bold heading">Blood Group:</span> O+ve
                  </p>
                  <p>
                    <a href="#" className="font-bold heading">
                      ResearchGate Profile:
                    </a>{" "}
                    D-M-Rahman
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="about">
          <div class="w-11/12 mx-auto pb-6 mt-6 lg:mt-14 text-justify">
            <h1 class="heading text-xl font-semibold mb-4 text-center">
              Bio of Dr. DM Arifur Rahman, MD
            </h1>

            <p class="mb-6">
              Dr. DM Arifur Rahman is a Bangladeshi expert pathologist,
              educator, and laboratory innovator whose career reflects a deep
              commitment to cancer diagnostics, precision pathology, and
              academic excellence. Currently, he serves as an Associate
              Professor of Histopathology and Laboratory Director of the TMSS
              Biomolecular Laboratory — Bangladesh's first molecular cancer
              diagnostics facility.
            </p>

            <h3 class="text-lg heading font-semibold mb-2">
              Early Life and Education
            </h3>
            <p class="mb-6">
              Born in the village of Kalupara in Naogaon Sadar, Dr. Rahman
              demonstrated academic excellence early on, earning top GPAs in
              both SSC and HSC. He completed his MBBS at Mymensingh Medical
              College in 2010, followed by an MD in Pathology from Bangabandhu
              Sheikh Mujib Medical University (BSMMU) between 2013 and 2017. His
              academic foundation was further enriched by hands-on training and
              clinical work during residency.
            </p>

            <h3 class="heading text-lg font-semibold mb-2">
              Professional Journey
            </h3>
            <p class="mb-6">
              Dr. Rahman began his academic career as a lecturer in 2012, later
              joining TMSS Medical College. He became Assistant Professor in
              2017 and Associate Professor in 2023. At the 1000-bed TMSS
              hospital, he led the creation of a full-fledged Histopathology &
              IHC Laboratory and has signed out over{" "}
              <span className="font-semibold">60,000 cases</span> in surgical
              pathology, cytopathology, and immunohistochemistry. He is also
              skilled in advanced diagnostic techniques including image-guided
              FNAC, frozen section, and core biopsy.
            </p>

            <h3 class="heading text-lg font-semibold mb-2">
              Pioneering Molecular Cancer Diagnostics
            </h3>
            <p class="mb-6">
              As the Laboratory Director of the TMSS Biomolecular Lab, Dr.
              Rahman founded Bangladesh's first NGS-based cancer diagnostics
              center. Trained by international experts from Xing Holdings,
              Australia, he successfully achieved <span className="font-semibold">ISO 15189:2022 accreditation</span> for TMSS Biomolecular Lab in March 2026. Accredited by EIAC under the ILAC framework, it is the first and only accredited NGS laboratory for molecular cancer diagnostics in South Asia, bringing world-class precision diagnostics to underserved communities.
            </p>

            <h3 class="heading text-lg font-semibold mb-2">
              Academic & Research Contributions
            </h3>
            <p class="mb-6">
              With <span className="font-semibold">44 peer-reviewed publications</span> (37 published and 7 submitted),
              Dr. Rahman is an enthusiastic researcher focusing on
              nephropathology, gynecologic and lymphoid pathology, head and neck
              cancers, and molecular diagnostics. His work aims to bridge
              laboratory findings with real-world clinical applications through
              translational research and precision cancer medicine.
            </p>

            <h3 class="heading text-lg font-semibold mb-2">
              Medical Education Leadership
            </h3>
            <p class="mb-6">
              Dr. Rahman is a certified medical educator with a six-month
              diploma from BIRDEM and has attended international conferences
              such as SEARAME 2021. At TMSS Medical College, he conducts
              integrated teaching workshops and leads faculty development
              programs. He also manages popular academic platforms like{" "}
              <em>Easypathology</em> and <em>Bangladesh Surgical Pathology</em>{" "}
              on Facebook, supporting both students and professionals.
            </p>

            <h3 class="heading text-lg font-semibold mb-2">
              Awards and Recognition
            </h3>
            <p class="mb-6">
              Dr. Rahman has received several accolades, including the{" "}
              <span className="font-semibold">
                Annual Performance Award (2025), Best Teacher Award (2023), TMSS Service Award (2022), and Mujib
                Year Service Award (2021)
              </span>
              , honoring his excellence in diagnostics, teaching, and community
              service.
            </p>

            <h3 class="heading text-lg font-semibold mb-2">Personal Vision</h3>
            <p>
              Currently residing in Bogura, Dr. Rahman continues to lead
              initiatives in cancer diagnostics, research, and medical
              education. His vision is to build an{" "}
              <span className="font-semibold">
                ISO-accredited, precision-focused laboratory ecosystem
              </span>{" "}
              accessible to all, especially the underserved — combining
              scientific rigor with compassionate care.
            </p>

            <p className="mt-6 text-justify">
              <h1 className="text-lg font-semibold mb-2 heading ">
                Extracurricular Interests
              </h1>
              <ul className="list-disc list-inside">
                <li>Personal Hobbies: Cooking, Cricket, Coffee</li>
                <li>Favorite Food: Kacchi Biryani</li>
                <li>Passions: Perfumes, Fountain pens</li>
                <li>
                  Community Role: Social Welfare Secretary, BSMMU Pathology
                  Alumni Association
                </li>
              </ul>
            </p>
          </div>
        </section>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default About;
