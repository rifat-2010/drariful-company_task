const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME || "drariful_cms";
const BLOG_COLLECTION = process.env.BLOG_COLLECTION || "blogs";
const GALLERY_COLLECTION = process.env.GALLERY_COLLECTION || "gallery";
const PROJECT_COLLECTION = process.env.PROJECT_COLLECTION || "projects";

const uri = `mongodb+srv://${encodeURIComponent(DB_USERNAME || "")}:${encodeURIComponent(DB_PASSWORD || "")}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

const blogSchema = new mongoose.Schema(
  {
    title: String,
    coverImage: String,
    category: String,
    content: String,
    author: String,
    date: String,
  },
  { timestamps: true },
);
const gallerySchema = new mongoose.Schema(
  { src: String, alt: String, caption: String },
  { timestamps: true },
);
const projectSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    description: String,
    status: String,
    year: String,
    field: String,
    collaborators: [String],
    imageUrl: String,
    featured: Boolean,
  },
  { timestamps: true },
);

const blogSeedData = [
  {
    title: "Advancement of Precision Cancer Medicine in Bangladesh",
    coverImage: "https://i.ibb.co.com/nqv1n827/lab-leadership.jpg",
    category: "Precision Medicine",
    content:
      "Precision medicine is transforming cancer care globally. By analyzing the genetic profile of a patient's tumor, oncologists can select therapies that are specifically designed to target the mutations driving the cancer's growth.\n\nIn Bangladesh, we are making significant strides in establishing biomolecular laboratories to provide these cutting-edge diagnostic tests locally. Previously, tissue samples were sent abroad for molecular profiling, which was expensive and time-consuming. Today, with state-of-the-art facilities like the TMSS Biomolecular Lab, we are performing HRD testing and immunohistochemistry panels in-country.\n\nThis article reviews the current state of precision cancer medicine in Bangladesh, the challenges of infrastructure development, and the future outlook for genomic diagnostics in oncology.",
    author: "Dr. DM Ariful Rahman",
    date: "2026-05-15",
  },
  {
    title: "Understanding Immunohistochemistry (IHC) in Tumor Pathology",
    coverImage: "https://i.ibb.co.com/p6QFsM7Q/19.jpg",
    category: "Pathology",
    content:
      "Immunohistochemistry (IHC) is a vital tool in modern diagnostic pathology. It involves using labeled antibodies to detect specific proteins (antigens) in cells within a tissue section.\n\nFor oncologists, IHC is crucial because it helps:\n1. Distinguish between different types of cancer (e.g., carcinoma vs. lymphoma).\n2. Determine the primary site of a metastatic tumor.\n3. Identify prognostic and predictive biomarkers (such as HER2, ER, PR in breast cancer, or PD-L1 in immunotherapy selection).\n\nWith over 500 IHC cases signed out under our digital pathology and molecular initiatives, we have seen firsthand how accurate IHC staining can refine a patient's diagnosis and optimize their treatment pathway.",
    author: "Dr. DM Ariful Rahman",
    date: "2026-04-22",
  },
];

const projectSeedData = [
  {
    title: "MSI in Colorectal Cancer",
    summary:
      "Research on microsatellite instability as a biomarker in colorectal cancer and its implications for treatment strategies.",
    description:
      "This ongoing research project explores the role of microsatellite instability (MSI) as a predictive and prognostic biomarker in colorectal cancer patients. We are investigating the correlations between MSI status and treatment response, particularly to immunotherapy agents and conventional chemotherapy regimens. Our preliminary findings suggest significant differences in survival outcomes based on MSI status, with potential implications for personalized medicine approaches.",
    status: "Ongoing",
    year: "2022-present",
    field: "Cancer",
    collaborators: ["University Medical Center", "Oncology Research Institute"],
    imageUrl: "https://i.ibb.co.com/vxkL5zL1/associate-professor2.jpg",
    featured: true,
  },
  {
    title: "HPV and Oral Cancer",
    summary:
      "Investigation of Human Papillomavirus (HPV) infection and its role in the development and prognosis of oral squamous cell carcinoma.",
    description:
      "This research examines the rising incidence of HPV-positive oral and oropharyngeal cancers. We have analyzed tissue samples from 120 patients to characterize the molecular and histopathological differences between HPV-positive and HPV-negative cancers. Our study has identified specific immunohistochemical markers that can help distinguish between these subtypes and potentially guide treatment decisions and prognostic assessments.",
    status: "Published",
    year: "2020-2022",
    field: "Cancer",
    collaborators: [
      "National Cancer Institute",
      "Dental Medicine Research Center",
    ],
    imageUrl: "https://i.ibb.co.com/pjt7WF07/clinical-experience.jpg",
    featured: true,
  },
  {
    title: "Facebook in Medical Education",
    summary:
      "Exploring the use of Facebook as a platform for pathology education and professional networking in the medical community.",
    description:
      "This innovative educational research project evaluates the effectiveness of using Facebook as a platform for pathology education among medical students and residents. We have created a structured educational intervention using a closed Facebook group where pathology case studies, educational resources, and expert discussions are shared. Our findings demonstrate significant improvements in diagnostic skills and knowledge retention compared to traditional educational methods alone.",
    status: "Published",
    year: "2019-2021",
    field: "Education",
    collaborators: [
      "Medical Education Department",
      "Digital Learning Initiative",
    ],
    imageUrl:
      "https://i.ibb.co.com/ymyYvff2/Whats-App-Image-2025-05-15-at-13-04-19-591c2270.jpg",
    featured: true,
  },
  {
    title:
      "Somatic Mutation Landscape of Solid Tumors in Bangladeshi Patients: A Multi-Cancer Analysis of 800+ Cases Using Targeted NGS.",
    summary:
      "Large-scale genomic profiling study analyzing somatic mutations in 800+ Bangladeshi solid cancer cases.",
    description:
      "This research details the somatic mutation profiles of solid tumors in Bangladeshi patients. We utilize targeted NGS sequencing to identify mutation frequencies and clinically actionable variants to build a regional precision oncology reference dataset.",
    status: "Ongoing",
    year: "2024-present",
    field: "Molecular Pathology",
    collaborators: ["TMSS Biomolecular Lab", "TMSS Cancer Centre"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "EGFR Mutation Spectrum in Non-Small Cell Lung Cancer in Bangladesh: Prevalence, Co-mutations, and Therapeutic Implications from a Real-World NGS Cohort.",
    summary:
      "Investigating EGFR variants and co-mutations in Bangladeshi non-small cell lung cancer (NSCLC) patients.",
    description:
      "This real-world cohort study investigates EGFR mutation frequencies, variant types, and co-occurring mutations in NSCLC. The study evaluates the therapeutic implications and response rates to EGFR Tyrosine Kinase Inhibitors (TKIs) in our population.",
    status: "Ongoing",
    year: "2024-present",
    field: "Cancer",
    collaborators: [
      "TMSS Biomolecular Lab",
      "Oncology Department, TMSS Medical College",
    ],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "PIK3CA Mutation Frequency and Actionability in Gynaecological Malignancies in South Asia: First Large-Scale NGS Data from Bangladesh.",
    summary:
      "First large-scale genomic data analyzing PIK3CA mutations and actionability in gynaecological cancers in Bangladesh.",
    description:
      "This study profiles PIK3CA variants in cervical, endometrial, and ovarian cancers. We analyze variant frequencies and actionability for targeted PI3K/AKT/mTOR pathway inhibitors, creating the first large-scale gynaecological genomic dataset in Bangladesh.",
    status: "Ongoing",
    year: "2024-present",
    field: "Cancer",
    collaborators: [
      "TMSS Biomolecular Lab",
      "Department of Gynaecology, TMSS Medical College",
    ],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Genomic Profiling of Acute Myeloid Leukaemia Using the oncoReveal Myeloid Panel: A Bangladeshi Single-Centre Experience and Comparison with Global Datasets.",
    summary:
      "Using targeted NGS myeloid panel to profile Acute Myeloid Leukaemia (AML) in a Bangladeshi single-centre setting.",
    description:
      "This research evaluates mutational signatures in Bangladeshi AML patients using a specialized NGS myeloid panel. We compare local mutational spectrums with global clinical registries to identify unique regional variations.",
    status: "Ongoing",
    year: "2025-present",
    field: "Molecular Pathology",
    collaborators: [
      "TMSS Biomolecular Lab",
      "Hematology Department, TMSS Medical College",
    ],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Prevalence of Clinically Actionable Mutations in Solid and Haematological Cancers: A Cross-Tumour NGS Study from a Resource-Limited South Asian Setting.",
    summary:
      "A cross-tumour analysis of actionable mutations in a resource-limited South Asian diagnostic lab.",
    description:
      "This study determines the proportion of cancer patients eligible for targeted therapeutics based on NGS. It maps genomic profiles to available targeted therapies to assess the gap in drug access in low-resource settings.",
    status: "Ongoing",
    year: "2024-present",
    field: "Cancer",
    collaborators: ["TMSS Biomolecular Lab", "TMSS Cancer Centre"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Variant Classification Using AMP/ASCO/CAP Guidelines in a Real-World Cancer NGS Laboratory: Concordance with ClinVar and Therapeutic Decisions in 800 Cases.",
    summary:
      "Applying professional guidelines (AMP/ASCO/CAP) for variant classification in 800 clinical cancer cases.",
    description:
      "This study evaluates the clinical utility and concordance of AMP/ASCO/CAP guidelines for variant interpretation. We analyze our laboratory pipeline variant calls against international ClinVar records for 800 cancer cases.",
    status: "Ongoing",
    year: "2024-present",
    field: "Molecular Pathology",
    collaborators: ["TMSS Biomolecular Lab", "Xing Holdings, Australia"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Targeted Therapy Eligibility Based on NGS Profiling in Bangladeshi Cancer Patients: A Gap Analysis Between Actionable Mutations and Drug Accessibility.",
    summary:
      "Gap analysis comparing NGS actionable mutations with practical access to targeted oncology drugs.",
    description:
      "This research provides clinical evidence on the mismatch between molecular eligibility for targeted therapies and actual patient access to these treatments in Bangladesh.",
    status: "Ongoing",
    year: "2025-present",
    field: "Cancer",
    collaborators: ["TMSS Biomolecular Lab", "TMSS Cancer Centre"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Co-occurring Somatic Mutations and Pathway-Level Aberrations Across Multiple Cancer Types: Insights from a 47-Gene NGS Panel in a South Asian Population.",
    summary:
      "Analyzing pathway-level genomic co-mutations in cancer using a multi-gene NGS panel.",
    description:
      "We investigate complex co-mutations and molecular pathway networks in diverse solid cancers using clinical NGS panel sequencing, comparing results to TCGA datasets.",
    status: "Ongoing",
    year: "2024-present",
    field: "Molecular Pathology",
    collaborators: [
      "TMSS Biomolecular Lab",
      "Department of Research, TMSS Medical College",
    ],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Implementation of Clinical-Grade NGS Testing for Cancer in Bangladesh: Laboratory Workflow, Quality Metrics, and First-Year Real-World Outcomes.",
    summary:
      "Clinical verification, QMS metrics, and real-world outcomes from establishing clinical-grade NGS workflows.",
    description:
      "This implementation study shares the technical validation, quality metrics, and operational standards involved in achieving the ISO 15189:2022 accreditation for NGS testing at TMSS Biomolecular Lab.",
    status: "Ongoing",
    year: "2024-present",
    field: "Molecular Pathology",
    collaborators: ["TMSS Biomolecular Lab", "Xing Holdings, Australia"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Comparison of Somatic Mutation Frequencies in South Asian vs. Western Cancer Populations: Evidence from Targeted NGS in Bangladeshi Solid and Liquid Tumours.",
    summary:
      "Genomic comparison study of cancer somatic variant frequencies between South Asian and Western patients.",
    description:
      "This research contrasts the genomic profile of solid and liquid tumors in Bangladesh with Western public datasets, identifying potential genomic disparities in cancer drivers.",
    status: "Ongoing",
    year: "2025-present",
    field: "Molecular Pathology",
    collaborators: ["TMSS Biomolecular Lab", "TMSS Cancer Centre"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Institution Based Cancer Registry at a Tertiary Level Hospital in the Northern part of Bangladesh.",
    summary:
      "Establishing a hospital-based cancer database registry to track oncology patterns in Northern Bangladesh.",
    description:
      "This epidemiological project aims to build a comprehensive cancer registry at TMSS Medical College Hospital to analyze tumor demographics, staging, and survival rates.",
    status: "Ongoing",
    year: "2024-present",
    field: "Cancer",
    collaborators: ["TMSS Cancer Centre"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Molecular Classification of Invasive Breast Cancer: A Cross-Sectional Study.",
    summary:
      "Cross-sectional classification of invasive breast cancers using immunohistochemical (IHC) profiling.",
    description:
      "This study classifies breast cancer into molecular subtypes (Luminal A, Luminal B, HER2-enriched, Triple-Negative) using IHC markers to guide treatment protocols.",
    status: "Submitted",
    year: "2026",
    field: "Cancer",
    collaborators: ["Department of Histopathology, TMSS Medical College"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Is Bangladeshi Medical Education Ready for Gen Z: A Comprehensive Review.",
    summary:
      "Reviewing local medical curriculum readiness and pedagogical shifts for Gen Z medical learners.",
    description:
      "This educational review analyzes the learning preferences, tech integration, and curriculum changes required to train the upcoming generation of medical students.",
    status: "Submitted",
    year: "2026",
    field: "Education",
    collaborators: ["Medical Education Unit, TMSS Medical College"],
    imageUrl: "",
    featured: false,
  },
  {
    title: "Mutational Profile among different cancers in Bangladesh.",
    summary:
      "Descriptive study of mutational distribution patterns in common cancers in the country.",
    description:
      "A screening research study collecting mutational logs from multiple oncology panels to identify dominant gene mutations (TP53, KRAS, PIK3CA) across Bangladeshi cohorts.",
    status: "Ongoing",
    year: "2025-present",
    field: "Cancer",
    collaborators: ["TMSS Biomolecular Lab"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Beyond the White Coat: Mental Health, Burnout, and Work-Life Balance Among Healthcare Professionals.",
    summary:
      "Cross-sectional survey of psychological burnout and work-life balance in local clinical staff.",
    description:
      "This psychiatric and social survey explores work stress, administrative loads, and quality of life metrics in doctors and nursing staff at a high-volume tertiary hospital.",
    status: "Ongoing",
    year: "2025-present",
    field: "Education",
    collaborators: ["Medical Education Unit, TMSS Medical College"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Histomorphological Spectrum of Colonic Biopsies: A Three-Year Retrospective Study at Two Diagnostic Centers.",
    summary:
      "Three-year retrospective review of histopathological findings in colonic biopsies.",
    description:
      "This study categorizes inflammatory, hyperplastic, and neoplastic mucosal lesions in colonic specimens to establish local pathology patterns.",
    status: "Ongoing",
    year: "2024-present",
    field: "Cytology",
    collaborators: ["TMSS Cyto-Histopathology Laboratory"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Gen Boz learning styles and preferences: A Cross Sectional Study in a Medical College of Bangladesh.",
    summary:
      "Academic survey mapping learning preferences and digital tool use in medical students.",
    description:
      "This study surveys undergraduate students on digital lectures, flipped classrooms, and online case repositories to optimize medical pedagogy.",
    status: "Ongoing",
    year: "2024-present",
    field: "Education",
    collaborators: ["Medical Education Unit, TMSS Medical College"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "BRCA1 and BRCA2 mutation status in Bangladeshi women with positive family history of breast cancer: A Cross-Sectional Study.",
    summary:
      "NGS screening of germline BRCA1/2 mutations in familial high-risk breast cancer patients.",
    description:
      "This research screens high-risk breast cancer cohorts for hereditary pathogenic variants using NGS, aiding patient counselling and preventive screening.",
    status: "Ongoing",
    year: "2025-present",
    field: "Cancer",
    collaborators: ["TMSS Biomolecular Lab", "Department of Oncology"],
    imageUrl: "",
    featured: false,
  },
  {
    title:
      "Healing the Healers: Psychological burn-out and Work-Life Integration among Healthcare Professionals.",
    summary:
      "Interventional study analyzing support mechanisms to mitigate burnout in healthcare workers.",
    description:
      "This research evaluates the efficacy of hospital support networks, peer counselling, and schedule adjustments in reducing workplace stress and burnout.",
    status: "Ongoing",
    year: "2025-present",
    field: "Education",
    collaborators: ["Medical Education Unit, TMSS Medical College"],
    imageUrl: "",
    featured: false,
  },
];

const gallerySeedData = [
  {
    src: "https://i.ibb.co.com/vxkL5zL1/associate-professor2.jpg",
    alt: "Delivering speech in the world cancer day",
    caption: "Delivering speech in the world cancer day",
  },
  {
    src: "https://i.ibb.co.com/SX6bSvpW/workshop-2.jpg",
    alt: "Working with the oncology department of TMSS Medical College",
    caption: "Working with the oncology department of TMSS Medical College",
  },
  {
    src: "https://i.ibb.co.com/9kqDMBgS/associate3.jpg",
    alt: "Agreement Signing Ceremony",
    caption: "Agreement Signing Ceremony",
  },
  {
    src: "https://i.ibb.co.com/Csmb3hQy/assistant-professior.jpg",
    alt: "Working with MiHealthOmics, Australia, to establish the molecular lab",
    caption:
      "Working with MiHealthOmics, Australia, to establish the molecular lab",
  },
  {
    src: "https://i.ibb.co.com/nqv1n827/lab-leadership.jpg",
    alt: "Working to establish a digital pathology platform",
    caption: "Working to establish a digital pathology platform",
  },
  {
    src: "https://i.ibb.co.com/8CKNbsJ/lab-director.jpg",
    alt: "After completion of a successful ISO inspection",
    caption: "After completion of a successful ISO inspection",
  },
  {
    src: "https://i.ibb.co.com/yFksj4Z9/workshop-2.jpg",
    alt: "After completion of a successful ISO inspection",
    caption: "After completion of a successful ISO inspection",
  },
  {
    src: "https://i.ibb.co.com/5XRRfFNv/workshop-3.jpg",
    alt: "Seminar",
    caption: "Seminar",
  },
  {
    src: "https://i.ibb.co.com/39n8Sz85/workshop.jpg",
    alt: "In Biomolecular conference room",
    caption: "In Biomolecular conference room",
  },
  {
    src: "https://i.ibb.co.com/pjt7WF07/clinical-experience.jpg",
    alt: "Doing more thousands of image guided and non guided core biopsies alongside the radiologist",
    caption:
      "Doing more thousands of image guided and non guided core biopsies alongside the radiologist",
  },
  {
    src: "https://i.ibb.co.com/JRhKsDQW/public-engage.jpg",
    alt: 'Seminar on "Why we need a Biomolecular laboratory"',
    caption: 'Seminar on "Why we need a Biomolecular laboratory"',
  },
  {
    src: "https://i.ibb.co.com/LXZdgyHL/public-engage2.jpg",
    alt: 'Seminar on "Why we need a Biomolecular laboratory"',
    caption: 'Seminar on "Why we need a Biomolecular laboratory"',
  },
  {
    src: "https://i.ibb.co.com/Ldjxrsq8/public-engage-3.jpg",
    alt: "Working on the field of precision cancer medicine",
    caption: "Working on the field of precision cancer medicine",
  },
  {
    src: "https://i.ibb.co.com/RkPt9vK4/clinical-experience2.jpg",
    alt: "Signed out more than 500 immunohistochemistry cases",
    caption: "Signed out more than 500 immunohistochemistry cases",
  },
  {
    src: "https://i.ibb.co.com/d4cLMwff/2025-05-10.jpg",
    alt: "Inspection of ISO experts in molecular lab",
    caption: "Inspection of ISO experts in molecular lab",
  },
  {
    src: "https://i.ibb.co.com/HJ8BhbJ/2025-05-10.jpg",
    alt: "Dedicated for patients wellbeing",
    caption: "Dedicated for patients wellbeing",
  },
  {
    src: "https://i.ibb.co.com/jkHyK59g/Whats-App-Image-2025-05-10-at-19-42-22-3d0c34b2.jpg",
    alt: "With ISO expert Dr Patric Mateta and Oncologist Dr. Paul Mainwaring, MD, FRCPA",
    caption:
      "With ISO expert Dr Patric Mateta and Oncologist Dr. Paul Mainwaring, MD, FRCPA",
  },
  {
    src: "https://i.ibb.co.com/7NnCV3VN/18.jpg",
    alt: "With renowned breast surgeon of NHS, UK; Dr SK Farid Ahmed",
    caption: "With renowned breast surgeon of NHS, UK; Dr SK Farid Ahmed",
  },
  {
    src: "https://i.ibb.co.com/p6QFsM7Q/19.jpg",
    alt: "In the histopathology microscopy room",
    caption: "In the histopathology microscopy room",
  },
  {
    src: "https://i.ibb.co.com/67SzKG0q/20.jpg",
    alt: "With Professor MH Alamgir Pavel, honourable executive advisor of TMSS",
    caption:
      "With Professor MH Alamgir Pavel, honourable executive advisor of TMSS",
  },
  {
    src: "https://i.ibb.co.com/cK0RVjKx/21.jpg",
    alt: "Briefing about the molecular lab with Ekhon TV",
    caption: "Briefing about the molecular lab with Ekhon TV",
  },
  {
    src: "https://i.ibb.co.com/Vc1HPf4B/22.jpg",
    alt: "Australian trained biomolecular team",
    caption: "Australian trained biomolecular team",
  },
  {
    src: "https://i.ibb.co.com/Z1Rt8mYQ/23.jpg",
    alt: "In Biomolecular conference room",
    caption: "In Biomolecular conference room",
  },
  {
    src: "https://i.ibb.co.com/DfJfvCjy/24.jpg",
    alt: "Session Moderator in the 10th international public health conference",
    caption:
      "Session Moderator in the 10th international public health conference",
  },
  {
    src: "https://i.ibb.co.com/xSTJTn0m/25.jpg",
    alt: "Mentoring the MBBS students",
    caption: "Mentoring the MBBS students",
  },
  {
    src: "https://i.ibb.co.com/0yRQWGDv/26.jpg",
    alt: "Delivering speech in front of medicine and allied doctors regarding the pathological aspect of image guided intervention",
    caption:
      "Delivering speech in front of medicine and allied doctors regarding the pathological aspect of image guided intervention",
  },
  {
    src: "https://i.ibb.co.com/GvzQMbXd/27.jpg",
    alt: "Leading the energetic TBL team",
    caption: "Leading the energetic TBL team",
  },
  {
    src: "https://i.ibb.co.com/LVbffYm/28.jpg",
    alt: 'Expert panel in the seminar of " Reverse aging"',
    caption: 'Expert panel in the seminar of " Reverse aging"',
  },
  {
    src: "https://i.ibb.co.com/WvY2QrJ3/29.jpg",
    alt: "Working as supervisor of MD phase B residents",
    caption: "Working as supervisor of MD phase B residents",
  },
  {
    src: "https://i.ibb.co.com/YrJ3Vh4/30.jpg",
    alt: "Foreign delegates from the USA in front of Biomolecular lab",
    caption: "Foreign delegates from the USA in front of Biomolecular lab",
  },
  {
    src: "https://i.ibb.co.com/tVsqvHz/Whats-App-Image-2025-05-15-at-13-04-19-8a67fb38.jpg",
    alt: "Delivering speech in SZMCH",
    caption: "Delivering speech in SZMCH",
  },
  {
    src: "https://i.ibb.co.com/Hp4P3JwS/Whats-App-Image-2025-05-15-at-13-04-18-ce8fa643.jpg",
    alt: "CT guided core biopsy with radiology-team",
    caption: "CT guided core biopsy with radiology-team",
  },
  {
    src: "https://i.ibb.co.com/gFHsZKWM/Whats-App-Image-2025-05-15-at-13-04-18-740d433f.jpg",
    alt: "Networking meeting between TMSS and Xing Holdings, Australia",
    caption: "Networking meeting between TMSS and Xing Holdings, Australia",
  },
  {
    src: "https://i.ibb.co.com/ymyYvff2/Whats-App-Image-2025-05-15-at-13-04-19-591c2270.jpg",
    alt: "With the honorable Executive Director of TMSS, Dr. Hosne Ara Begum",
    caption:
      "With the honorable Executive Director of TMSS, Dr. Hosne Ara Begum",
  },
  {
    src: "https://i.ibb.co.com/PZ3y0bhR/Whats-App-Image-2025-05-15-at-13-04-20-760acfb2.jpg",
    alt: "Visit of renowned hematopathologist Dr Sumeet Gujral from Tata Memorial Hospital, Mumbai",
    caption:
      "Visit of renowned hematopathologist Dr Sumeet Gujral from Tata Memorial Hospital, Mumbai",
  },
  {
    src: "https://i.ibb.co.com/MkFNgPyY/Whats-App-Image-2025-05-15-at-13-04-19-5bc94ac9.jpg",
    alt: "In the Histopathology lab",
    caption: "In the Histopathology lab",
  },
  {
    src: "https://i.ibb.co.com/krjy0xH/Whats-App-Image-2025-05-15-at-13-04-20-77382b02.jpg",
    alt: "CT guided bone biopsy with the radiology team",
    caption: "CT guided bone biopsy with the radiology team",
  },
  {
    src: "https://i.ibb.co.com/Ldj6gHYC/Whats-App-Image-2025-05-15-at-13-04-21-465657ba.jpg",
    alt: "Celebrating 1st HRD molecular testing in Bangladesh",
    caption: "Celebrating 1st HRD molecular testing in Bangladesh",
  },
  {
    src: "https://i.ibb.co.com/nqMrMXQB/Whats-App-Image-2025-05-15-at-13-04-21-da6043b4.jpg",
    alt: "With the delegates from Rajshahi Medical University",
    caption: "With the delegates from Rajshahi Medical University",
  },
];

const Blog = mongoose.model("Blog", blogSchema, BLOG_COLLECTION);
const GalleryItem = mongoose.model(
  "GalleryItem",
  gallerySchema,
  GALLERY_COLLECTION,
);
const Project = mongoose.model("Project", projectSchema, PROJECT_COLLECTION);

(async () => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    const force =
      process.argv.includes("--force") || process.env.FORCE_SEED === "true";

    if (force) {
      await Blog.deleteMany({});
      await Blog.insertMany(blogSeedData);
      await GalleryItem.deleteMany({});
      await GalleryItem.insertMany(gallerySeedData);
      await Project.deleteMany({});
      await Project.insertMany(projectSeedData);
      console.log("Force seed: collections replaced with seed data.");
    } else {
      const blogCount = await Blog.countDocuments();
      if (blogCount === 0) {
        await Blog.insertMany(blogSeedData);
        console.log("Seeded blog collection (was empty).");
      } else {
        console.log("Blog collection not empty — skipping seed.");
      }

      const galleryCount = await GalleryItem.countDocuments();
      if (galleryCount === 0) {
        await GalleryItem.insertMany(gallerySeedData);
        console.log("Seeded gallery collection (was empty).");
      } else {
        console.log("Gallery collection not empty — skipping seed.");
      }

      const projectCount = await Project.countDocuments();
      if (projectCount === 0) {
        await Project.insertMany(projectSeedData);
        console.log("Seeded project collection (was empty).");
      } else {
        console.log("Project collection not empty — skipping seed.");
      }
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
