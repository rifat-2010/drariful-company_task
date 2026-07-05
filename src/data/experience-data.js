// Import all images
import latestProfile from '../assets/latest-profile-pic.jpg';
import profileSmMain from '../assets/profile-sm-main.jpg';
import profileSm from '../assets/profile-sm.jpg';
import banner from '../assets/banner.jpg';
import gallery1 from '../assets/new-gellary-img1.jpg';
import gallery2 from '../assets/new-gellary-img2.jpg';
import gallery3 from '../assets/new-gellary-img3.jpg';
import gallery4 from '../assets/new-gellary-img4.jpg';
import gallery5 from '../assets/new-gellary-img5.jpg';
import gallery6 from '../assets/new-gellary-img6.jpg';

export const experienceData = [
  {
    id: "academic",
    title: "Academic Roles",
    experiences: [
      {
        id: "exp1",
        icon: "🏫",
        title: "Associate Professor of Pathology",
        institution: "TMSS Medical College",
        duration: "Since May 2017",
        responsibilities: [
          "Teaching undergraduate & postgraduate students",
          "Leading Histopathology module",
          "Faculty in medical education unit"
        ],
        highlights: [
          "Conducted workshops in 2022",
          "Curriculum development member",
          "Mentorship for residents"
        ],
        images: [
          {
            id: "img1",
            src: latestProfile,
            alt: "Teaching Experience",
            caption: "Teaching undergraduate students"
          },
          {
            id: "img2",
            src: profileSmMain,
            alt: "Lab Experience",
            caption: "Lab work and research"
          },
          {
            id: "img3",
            src: profileSm,
            alt: "Clinical Practice",
            caption: "Clinical practice area"
          }
        ]
      },
      {
        id: "exp2",
        icon: "👨‍🏫",
        title: "Assistant Professor of Pathology",
        institution: "Medical University",
        duration: "2014 - 2017",
        responsibilities: [
          "Co-authored multiple research papers",
          "Supervised lab projects",
          "Quality assurance in pathology"
        ],
        highlights: [
          "Published in peer-reviewed journals",
          "Developed lab protocols",
          "Mentored junior pathologists"
        ],
        images: [
          {
            id: "img4",
            src: banner,
            alt: "Previous Role",
            caption: "Research coordination"
          }
        ]
      }
    ]
  },
  {
    id: "clinical",
    title: "Clinical Experience",
    experiences: [
      {
        id: "exp3",
        icon: "🏥",
        title: "Consultant Pathologist",
        institution: "Diagnostic Pathology Center",
        duration: "2018 - 2022",
        responsibilities: [
          "Performed 500+ IHC case sign-outs",
          "Specialized biopsies analysis",
          "Quality control and validation"
        ],
        highlights: [
          "High accuracy diagnostic records",
          "Specialized in molecular pathology",
          "Training junior diagnosticians"
        ],
        images: [
          {
            id: "img5",
            src: gallery1,
            alt: "Diagnostic Work",
            caption: "Diagnostic pathology work"
          },
          {
            id: "img6",
            src: gallery2,
            alt: "Lab Analysis",
            caption: "Lab analysis and testing"
          }
        ]
      }
    ]
  },
  {
    id: "training",
    title: "Training & Conference",
    experiences: [
      {
        id: "exp4",
        icon: "🎓",
        title: "Conference Speaker & Trainer",
        institution: "Various Institutions",
        duration: "2015 - Present",
        responsibilities: [
          "Conducted training workshops",
          "Presented at international conferences",
          "Developed training curriculum"
        ],
        highlights: [
          "Keynote speaker at Medical Summit 2023",
          "Published proceedings in peer-reviewed journals",
          "Trained 200+ medical professionals"
        ],
        images: [
          {
            id: "img7",
            src: gallery3,
            alt: "Conference",
            caption: "International conference"
          },
          {
            id: "img8",
            src: gallery4,
            alt: "Training",
            caption: "Training session"
          }
        ]
      }
    ]
  },
  {
    id: "engagement",
    title: "Public Engagement",
    experiences: [
      {
        id: "exp5",
        icon: "🎤",
        title: "Public Health Advocate",
        institution: "Community & Government Bodies",
        duration: "2016 - Present",
        responsibilities: [
          "Organized health awareness campaigns",
          "Media interviews and publications",
          "Collaborative projects with NGOs"
        ],
        highlights: [
          "Featured in national media",
          "Developed public health guidelines",
          "Community education programs"
        ],
        images: [
          {
            id: "img9",
            src: gallery5,
            alt: "Public Engagement",
            caption: "Community engagement"
          },
          {
            id: "img10",
            src: gallery6,
            alt: "Media",
            caption: "Media presence"
          }
        ]
      }
    ]
  }
];
