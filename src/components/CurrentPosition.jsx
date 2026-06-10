import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function CurrentPosition() {
  return (
    <div className="mt-5 lg:mt-16">
      <h1 className="mb-2 md:mb-5 text-center text-2xl md:text-3xl font-bold heading sm:text-4xl primary-text">
        Professional Highlights
      </h1>
      <div
        // style={{ boxShadow: '10px 10px 5px 0px rgba(117,117,128,0.75)' }}
        className="w-11/12 mx-auto bg-white rounded-lg lg:flex flex-col lg:flex-row gap-12 px-8 lg:px-10 py-6 lg:py-10 border border-gray-300 shadow-lg my-8 hover:shadow-[10px_10px_5px_rgba(117,117,128,0.75)]"
      >
        <div className="w-full lg:w-3/6">
          <h1 className="text-xl md:text-2xl font-bold mb-2 sub-title">
            Current Positions
          </h1>
          <ul class="space-y-2 text-sm md:text-base primary-text text-justify">
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Associate Professor of Pathology, TMSS Medical College, Bogura
                (2023)
              </span>
            </li>
            <li className="flex  gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Laboratory Director, TMSS Biomolecular Laboratory (2024)
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Faculty Member, Medical Education Unit, TMSS Medical College
                (2022)
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Head, Histopathology & Immunohistochemistry Laboratory (2018)
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Member: Tumor Board (2024); Journal Committee (2025); Seminar
                Committee (2023); Research Committee (2022) (TMSS Medical
                College)
              </span>
            </li>
          </ul>
        </div>
        <div className="border-l border-gray-400"></div>
        <div className="w-full lg:w-3/6">
          <h1 className="text-xl md:text-2xl font-bold mb-2 sub-title mt-5 md:mt-0">Previous Roles</h1>
          <ul className="list-disc space-y-2 text-sm md:text-base primary-text text-justify">
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Assistant Professor of Pathology, TMSS Medical College
                (2017-2023)
              </span>
            </li>
            <li className="flex gap-2 items-center">
              
            </li>
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Lecturer, Genesis Postgraduate Medical Orientation, Dhaka
                (2014-2015)
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>
                Lecturer, TMSS Medical Technology Institute, Bogura (2012)
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <span>
                <IoMdArrowRoundForward className="sub-title" />
              </span>
              <span>Resident, department of pathology, BMU ( 2013- 2017)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
