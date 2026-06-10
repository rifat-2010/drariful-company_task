import { useState } from "react";

export default function Contributions() {
    const [active, setActive] = useState(0);

    

    const departments = [
        {
            name: "Editorial Committees",
            description: "Teams responsible for reviewing, selecting, and editing academic or medical publications.",
            details:
                "Associate Editor: Journal of Histopathology and Cytopathology. Assistant Editor: TMSS Medical College Journal.",               
            image:
                "https://i.ibb.co.com/SX6bSvpW/workshop-2.jpg",
        },
        {
            name: "Academic Committees",
            description: "Academic Committees and Professional Memberships.",
            details:
                "Member: Tumor Board, TMSS Cancer Centre. Member: Seminar and Integrated Teaching Committee. Member: Journal Committee. Member: Secretary Research Committee, TMSS Medical College.",
            image:
                "https://i.ibb.co.com/39n8Sz85/workshop.jpg",
        },
        {
            name: "Academic Education",
            description: "Academic Leadership & Educational Contributions",
            details:
            "Conducted faculty development and integrated teaching workshops. Admin of Easypathology and Bangladesh Surgical Pathology academic Facebook groups. Participated in the 9th Postgraduate Course on Histopathology and Cytopathology organized by the Bangladesh Academy of Pathology (29 Nov - 3 Dec 2014).",
            image:
                "https://i.ibb.co.com/vxkL5zL1/associate-professor2.jpg",
        },
        {
            name: "Medical Education",
            description: "Medical Education & Professional Development Highlights",
            details:
                "Trained in teaching methodology (Centre for Medical Education, 2017).SEARAME Conference Participant (2021). Social Welfare Secretary, BSMMU Pathology Department Alumni Association.",
            image:
                "https://i.ibb.co.com/8CKNbsJ/lab-director.jpg",
        },

    ];

    return (
        <div className="w-11/12 mx-auto p-8 bg-white shadow-lg rounded-xl mt-8 lg:mt-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center heading mb-2">
                Contributions
            </h2>
            <p className="text-sm md:text-base text-center primary-text mb-8">
                Academic and Medical Education Contributions
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4 border-r md:pr-4">
                    <ul>
                        {departments.map((dept, index) => (
                            <li
                                key={index}
                                onClick={() => setActive(index)}
                                className={`cursor-pointer py-2 font-medium hover:text-[#e88d67] transition-all ${active === index ? "sub-title border-l-4 border-[#e88d67] pl-2 font-bold" : "heading"
                                    }`}
                            >
                                {dept.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:w-3/4 flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                        <h3 className="text-xl font-bold sub-title mb-2">
                            {departments[active].name}
                        </h3>
                        <p className="italic primary-text mb-3">
                            {departments[active].description}
                        </p>
                        <ul className="primary-text leading-relaxed list-disc pl-5">
                            {departments[active].details
                                .split(".")
                                .map(item => item.trim())
                                .filter(item => item.length > 0)
                                .map((point, idx) => (
                                    <li key={idx}>{point}.</li>
                                ))}
                        </ul>
                    </div>
                    <div className="md:w-1/3">
                        <img
                            src={departments[active].image}
                            alt={departments[active].name}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
