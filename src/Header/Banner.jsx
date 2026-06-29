import { FaEnvelope } from "react-icons/fa";
import profile from "../assets/latest-profile-pic.jpg";
import frame1 from "../assets/Frame-blue.png";
import frame2 from "../assets/frame-white.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaBookOpenReader } from "react-icons/fa6";

export default function Banner() {
  return (
    // relative mb-72
    <div className="">
      {/* hero start  */}
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-5 lg:gap-10 px-8 md:px-20">
          <div className="lg:w-2/5">
            <img
              src={profile}
              className="w-[200px] lg:w-full rounded-none lg:rounded-[200px] h-full lg:h-[480px] z-10 object-cover"
            />
          </div>
          {/* banner info  */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold heading mb-1 lg:mb-2">
              Dr. DM Arifur Rahman
            </h1>
            <div className="mb-4">
              <span className="text-2xl font-bold sub-title">
                Histopathologist
              </span>
              <div className="flex flex-wrap w-full lg:w-3/4 justify-center lg:justify-start gap-4 mt-4 text-sm">
                <span
                  style={{
                    boxShadow: "2px 0px 5px 3px rgba(117,117,128,0.75)",
                  }}
                  className="rounded-md px-1"
                >
                  Clinical cytology
                </span>

                <span
                  style={{
                    boxShadow: "2px 0px 5px 3px  rgba(117,117,128,0.75)",
                  }}
                  className="rounded-md py-0 px-2"
                >
                  Histopathology
                </span>

                <span
                  style={{
                    boxShadow: "2px 0px 5px 3px rgba(117,117,128,0.75)",
                  }}
                  className="rounded-md py-0 px-2"
                >
                  Molecular pathology
                </span>

                <span
                  style={{
                    boxShadow: "2px 0px 5px 3px rgba(117,117,128,0.75)",
                  }}
                  className="rounded-md py-0 px-2"
                >
                  Medical education
                </span>

                <span
                  style={{
                    boxShadow: "2px 0px 5px 3px rgba(117,117,128,0.75)",
                  }}
                  className="rounded-md py-0 px-2"
                >
                  Precision cancer medicine
                </span>

                {/* <span style={{ boxShadow: '10px 10px 5px 0px rgba(117,117,128,0.75)' }} className="inline-block px-3 py-1 text-sm rounded-full bg-gradient-to-r from-[#2872C6] to-blue-300 text-white font-medium">Precision Cancer Medicine</span> */}
              </div>
            </div>

            <p className="text-gray-600 max-w-2xl text-base md:text-lg mb-6 primary-text text-justify">
              {/* Pathologist and medical researcher specializing in molecular diagnostics and clinical cytology.
                            Working with the objective to establish an ISO 15189:2022 accredited molecular pathology laboratory in a low-resource setting, providing precision cancer diagnostics to underprivileged patients and fostering an integrated undergraduate medical curriculum in Bangladesh. */}
              <ul class="space-y-1 responsive-text font-semibold primary-text text-justify">
                <div className="flex gap-2 items-center">
                  <span>
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <li>
                    Signed out over 60,000 cases in surgical pathology,
                    cytopathology, and IHC
                  </li>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <li>
                    Skilled in image-guided FNAC, core biopsy, frozen section
                    biopsy, immunohistochemistry,
                    liquid-based cytology
                  </li>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <li>
                    Lead developer of the Histopathology & IHC Lab at TMSS
                    1000-bed Hospital
                  </li>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <li>
                    Founded Bangladesh's first molecular cancer diagnostics lab
                    using NGS
                  </li>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <li>
                    Trained in molecular diagnostics, NGS, and ISO 15189 QMS via
                    Xing Holdings, Australia
                  </li>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <li>
                    Achieved ISO 15189:2022 Accreditation for TMSS
                    Biomolecular Lab (March 2026)
                  </li>
                </div>
                <div className="flex gap-2 items-center">
                  <span>
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <li>
                    Expert in lab information systems and QA/QC for cancer
                    diagnostics
                  </li>
                </div>
              </ul>
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
              <Link
                to={'/publication'}
                style={{
                  boxShadow: "10px 10px 5px 0px rgba(117,117,128,0.75)",
                }}

                className="inline-flex items-center justify-center  gradient-button"
              >
                <span>
                  <FaBookOpenReader className="mr-2 inline mb-1" />
                  Publications
                </span>
              </Link>

              <Link
                to={"/contact"}
                style={{
                  boxShadow: "10px 10px 5px 0px rgba(117,117,128,0.75)",
                }}
                className="inline-flex items-center justify-center active-btn"
              >
                <FaEnvelope className="mr-2" /> Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* hero end  */}

      <div className="relative lg:-mt-16 mb-5 lg:mb-52 hidden md:block">
        <img
          className="absolute top-3 w-full h-[100px] lg:h-[150px]"
          src={frame1}
          alt="Blue Frame"
        />
        <img
          className="absolute w-full h-auto top-2"
          src={frame2}
          alt="White Frame"
        />
      </div>
    </div>
  );
}
