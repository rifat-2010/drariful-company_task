import { isFirebaseConfigured, auth, db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Use the deployed backend API only. UI should fetch from the production
// backend endpoint so the public app shows database-driven blog, gallery,
// and project content or empty state when the API cannot return data.
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://drariful-adminpannel-backend-5uzaf7jsw.vercel.app/api"
).replace(/\/$/, "");

const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;
  const maxRetries = 3;
  const timeoutMs = 8000;

  const token = localStorage.getItem("adminToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timer);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        const location = response.headers.get("location");
        throw new Error(
          `API error ${response.status} ${response.statusText} from ${url}${
            location ? ` redirect -> ${location}` : ""
          }: ${errorText || "No response body"}`,
        );
      }

      if (response.status === 204) return null;

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const bodyText = await response.text().catch(() => "");
        throw new Error(
          `Invalid API response from ${url} (status ${response.status}, content-type ${contentType}). Response body: ${bodyText.slice(0, 240)}`,
        );
      }

      return await response.json();
    } catch (err) {
      clearTimeout(timer);
      lastError = err;

      // Don't retry on auth errors or client errors (4xx)
      if (err.message && err.message.includes("API error 4")) {
        throw err;
      }

      // If not last attempt, wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
        console.warn(`API request attempt ${attempt} failed for ${url}, retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  throw new Error(
    `Network error fetching ${url}: ${lastError?.message || "Failed to fetch after " + maxRetries + " attempts"}`,
  );
};

// Seed Data
const defaultGallery = [
  {
    id: "1",
    src: "https://i.ibb.co.com/vxkL5zL1/associate-professor2.jpg",
    alt: "Delivering speech in the world cancer day",
  },
  {
    id: "2",
    src: "https://i.ibb.co.com/SX6bSvpW/workshop-2.jpg",
    alt: "Working with the oncology department of TMSS Medical College",
  },
  {
    id: "3",
    src: "https://i.ibb.co.com/9kqDMBgS/associate3.jpg",
    alt: "Agreement Signing Ceremony",
  },
  {
    id: "4",
    src: "https://i.ibb.co.com/Csmb3hQy/assistant-professior.jpg",
    alt: "Working with MiHealthOmics, Australia, to establish the molecular lab",
  },
  {
    id: "5",
    src: "https://i.ibb.co.com/nqv1n827/lab-leadership.jpg",
    alt: "Working to establish a digital pathology platform",
  },
  {
    id: "6",
    src: "https://i.ibb.co.com/8CKNbsJ/lab-director.jpg",
    alt: "After completion of a successful ISO inspection",
  },
  {
    id: "7",
    src: "https://i.ibb.co.com/yFksj4Z9/workshop-2.jpg",
    alt: "After completion of a successful ISO inspection",
  },
  {
    id: "8",
    src: "https://i.ibb.co.com/5XRRfFNv/workshop-3.jpg",
    alt: "Seminar",
  },
  {
    id: "9",
    src: "https://i.ibb.co.com/39n8Sz85/workshop.jpg",
    alt: "In Biomolecular conference room",
  },
  {
    id: "10",
    src: "https://i.ibb.co.com/pjt7WF07/clinical-experience.jpg",
    alt: "Doing more thousands of image guided and non guided core biopsies alongside the radiologist",
  },
  {
    id: "11",
    src: "https://i.ibb.co.com/JRhKsDQW/public-engage.jpg",
    alt: 'Seminar on "Why we need a Biomolecular laboratory"',
  },
  {
    id: "12",
    src: "https://i.ibb.co.com/LXZdgyHL/public-engage2.jpg",
    alt: 'Seminar on "Why we need a Biomolecular laboratory"',
  },
  {
    id: "13",
    src: "https://i.ibb.co.com/Ldjxrsq8/public-engage-3.jpg",
    alt: "Working on the field of precision cancer medicine",
  },
  {
    id: "14",
    src: "https://i.ibb.co.com/RkPt9vK4/clinical-experience2.jpg",
    alt: "Signed out more than 500 immunohistochemistry cases",
  },
  {
    id: "15",
    src: "https://i.ibb.co.com/d4cLMwff/2025-05-10.jpg",
    alt: "Inspection of ISO experts in molecular lab",
  },
  {
    id: "16",
    src: "https://i.ibb.co.com/HJ8BhbJ/2025-05-10.jpg",
    alt: "Dedicated for patients wellbeing",
  },
  {
    id: "17",
    src: "https://i.ibb.co.com/jkHyK59g/Whats-App-Image-2025-05-10-at-19-42-22-3d0c34b2.jpg",
    alt: "With ISO expert Dr Patric Mateta and Oncologist Dr. Paul Mainwaring, MD, FRCPA",
  },
  {
    id: "18",
    src: "https://i.ibb.co.com/7NnCV3VN/18.jpg",
    alt: "With renowned breast surgeon of NHS, UK; Dr SK Farid Ahmed",
  },
  {
    id: "19",
    src: "https://i.ibb.co.com/p6QFsM7Q/19.jpg",
    alt: "In the histopathology microscopy room",
  },
  {
    id: "20",
    src: "https://i.ibb.co.com/67SzKG0q/20.jpg",
    alt: "With Professor MH Alamgir Pavel, honourable executive advisor of TMSS",
  },
  {
    id: "21",
    src: "https://i.ibb.co.com/cK0RVjKx/21.jpg",
    alt: "Briefing about the molecular lab with Ekhon TV",
  },
  {
    id: "22",
    src: "https://i.ibb.co.com/Vc1HPf4B/22.jpg",
    alt: "Australian trained biomolecular team",
  },
  {
    id: "23",
    src: "https://i.ibb.co.com/Z1Rt8mYQ/23.jpg",
    alt: "In Biomolecular conference room",
  },
  {
    id: "24",
    src: "https://i.ibb.co.com/DfJfvCjy/24.jpg",
    alt: "Session Moderator in the 10th international public health conference",
  },
  {
    id: "25",
    src: "https://i.ibb.co.com/xSTJTn0m/25.jpg",
    alt: "Mentoring the MBBS students",
  },
  {
    id: "26",
    src: "https://i.ibb.co.com/0yRQWGDv/26.jpg",
    alt: "Delivering speech in front of medicine and allied doctors regarding the pathological aspect of image guided intervention",
  },
  {
    id: "27",
    src: "https://i.ibb.co.com/GvzQMbXd/27.jpg",
    alt: "Leading the energetic TBL team",
  },
  {
    id: "28",
    src: "https://i.ibb.co.com/LVbffYm/28.jpg",
    alt: 'Expert panel in the seminar of " Reverse aging"',
  },
  {
    id: "29",
    src: "https://i.ibb.co.com/WvY2QrJ3/29.jpg",
    alt: "Working as supervisor of MD phase B residents",
  },
  {
    id: "30",
    src: "https://i.ibb.co.com/YrJ3Vh4/30.jpg",
    alt: "Foreign delegates from the USA in front of Biomolecular lab",
  },
  {
    id: "31",
    src: "https://i.ibb.co.com/tVsqvHz/Whats-App-Image-2025-05-15-at-13-04-19-8a67fb38.jpg",
    alt: "Delivering speech in SZMCH",
  },
  {
    id: "32",
    src: "https://i.ibb.co.com/Hp4P3JwS/Whats-App-Image-2025-05-15-at-13-04-18-ce8fa643.jpg",
    alt: "CT guided core biopsy with radiology-team",
  },
  {
    id: "33",
    src: "https://i.ibb.co.com/gFHsZKWM/Whats-App-Image-2025-05-15-at-13-04-18-740d433f.jpg",
    alt: "Networking meeting between TMSS and Xing Holdings, Australia",
  },
  {
    id: "34",
    src: "https://i.ibb.co.com/ymyYvff2/Whats-App-Image-2025-05-15-at-13-04-19-591c2270.jpg",
    alt: "With the honorable Executive Director of TMSS, Dr. Hosne Ara Begum",
  },
  {
    id: "35",
    src: "https://i.ibb.co.com/PZ3y0bhR/Whats-App-Image-2025-05-15-at-13-04-20-760acfb2.jpg",
    alt: "Visit of renowned hematopathologist Dr Sumeet Gujral from Tata Memorial Hospital, Mumbai",
  },
  {
    id: "36",
    src: "https://i.ibb.co.com/MkFNgPyY/Whats-App-Image-2025-05-15-at-13-04-19-5bc94ac9.jpg",
    alt: "In the Histopathology lab",
  },
  {
    id: "37",
    src: "https://i.ibb.co.com/krjy0xH/Whats-App-Image-2025-05-15-at-13-04-20-77382b02.jpg",
    alt: "CT guided bone biopsy with the radiology team",
  },
  {
    id: "38",
    src: "https://i.ibb.co.com/Ldj6gHYC/Whats-App-Image-2025-05-15-at-13-04-21-465657ba.jpg",
    alt: "Celebrating 1st HRD molecular testing in Bangladesh",
  },
  {
    id: "39",
    src: "https://i.ibb.co.com/nqMrMXQB/Whats-App-Image-2025-05-15-at-13-04-21-da6043b4.jpg",
    alt: "With the delegates from Rajshahi Medical University",
  },
];

const defaultBlogs = [
  {
    id: "blog1",
    title: "Advancement of Precision Cancer Medicine in Bangladesh",
    coverImage: "https://i.ibb.co.com/nqv1n827/lab-leadership.jpg",
    category: "Precision Medicine",
    content: `Precision medicine is transforming cancer care globally. By analyzing the genetic profile of a patient's tumor, oncologists can select therapies that are specifically designed to target the mutations driving the cancer's growth. 

In Bangladesh, we are making significant strides in establishing biomolecular laboratories to provide these cutting-edge diagnostic tests locally. Previously, tissue samples were sent abroad for molecular profiling, which was expensive and time-consuming. Today, with state-of-the-art facilities like the TMSS Biomolecular Lab, we are performing HRD testing and immunohistochemistry panels in-country.

This article reviews the current state of precision cancer medicine in Bangladesh, the challenges of infrastructure development, and the future outlook for genomic diagnostics in oncology.`,
    author: "Dr. DM Ariful Rahman",
    date: "2026-05-15",
  },
  {
    id: "blog2",
    title: "Understanding Immunohistochemistry (IHC) in Tumor Pathology",
    coverImage: "https://i.ibb.co.com/p6QFsM7Q/19.jpg",
    category: "Pathology",
    content: `Immunohistochemistry (IHC) is a vital tool in modern diagnostic pathology. It involves using labeled antibodies to detect specific proteins (antigens) in cells within a tissue section.

For oncologists, IHC is crucial because it helps:
1. Distinguish between different types of cancer (e.g., carcinoma vs. lymphoma).
2. Determine the primary site of a metastatic tumor.
3. Identify prognostic and predictive biomarkers (such as HER2, ER, PR in breast cancer, or PD-L1 in immunotherapy selection).

With over 500 IHC cases signed out under our digital pathology and molecular initiatives, we have seen firsthand how accurate IHC staining can refine a patient's diagnosis and optimize their treatment pathway.`,
    author: "Dr. DM Ariful Rahman",
    date: "2026-04-22",
  },
];

const defaultProjects = [
  {
    id: "proj_msi",
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
    id: "proj_hpv",
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
    id: "proj_fb",
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
    id: "proj_tbl1",
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
    id: "proj_tbl2",
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
    id: "proj_tbl3",
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
    id: "proj_tbl4",
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
    id: "proj_tbl5",
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
    id: "proj_tbl6",
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
    id: "proj_tbl7",
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
    id: "proj_tbl8",
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
    id: "proj_tbl9",
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
    id: "proj_tbl10",
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
    id: "proj_cv1",
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
    id: "proj_cv2",
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
    id: "proj_cv3",
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
    id: "proj_cv4",
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
    id: "proj_cv5",
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
    id: "proj_cv6",
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
    id: "proj_cv7",
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
    id: "proj_cv8",
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
    id: "proj_cv9",
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

// Initialize localStorage keys with empty arrays when missing. This is only
// used for auth fallback; CMS content should always come from the API.
const initLocalStorage = () => {
  if (!localStorage.getItem("blogs")) {
    localStorage.setItem("blogs", JSON.stringify([]));
  }
  if (!localStorage.getItem("gallery")) {
    localStorage.setItem("gallery", JSON.stringify([]));
  }
  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify([]));
  }
};

// Ensure keys exist (empty) so fallback returns empty arrays rather than
// previously seeded content.
initLocalStorage();

/**
 * AUTHENTICATION SERVICES
 */
export const login = async (email, password) => {
  if (isFirebaseConfigured) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      console.error("Firebase Login Error:", error);
      throw error;
    }
  } else {
    // Try backend login first
    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (data && data.token) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("mockUser", JSON.stringify(data.user));
        window.dispatchEvent(new Event("auth-change"));
        return data.user;
      }
    } catch (backendError) {
      console.warn("Backend login unreachable, using local fallback:", backendError.message);
      // If it's a 401 (wrong password), don't fallback — throw immediately
      if (backendError.message && backendError.message.includes("API error 401")) {
        throw new Error("Invalid admin credentials");
      }
    }

    // Local fallback when backend is unreachable
    if (email === "admin@drariful.com" && password === "adminpassword") {
      const user = { email: "admin@drariful.com", uid: "mock-admin-uid" };
      localStorage.setItem("mockUser", JSON.stringify(user));
      window.dispatchEvent(new Event("auth-change"));
      return user;
    } else {
      throw new Error("Invalid admin credentials");
    }
  }
};

export const logout = async () => {
  if (isFirebaseConfigured) {
    await signOut(auth);
  } else {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("mockUser");
    window.dispatchEvent(new Event("auth-change"));
  }
};

export const getCurrentUser = () => {
  if (isFirebaseConfigured) {
    return auth.currentUser;
  } else {
    try {
      const userStr = localStorage.getItem("mockUser");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }
};

export const subscribeToAuth = (callback) => {
  if (isFirebaseConfigured) {
    return onAuthStateChanged(auth, callback);
  } else {
    // Handle mock auth change subscribing
    const handler = () => {
      callback(getCurrentUser());
    };
    window.addEventListener("auth-change", handler);
    // Initial trigger
    handler();
    return () => window.removeEventListener("auth-change", handler);
  }
};

/**
 * BLOG SERVICES
 */
export const getBlogs = async () => {
  const response = await apiRequest("/blogs");
  return response || [];
};

export const addBlog = async (blogData) => {
  const newBlog = {
    ...blogData,
    date: new Date().toISOString().split("T")[0],
  };

  try {
    return await apiRequest("/blogs", {
      method: "POST",
      body: JSON.stringify(newBlog),
    });
  } catch (error) {
    console.error("MongoDB addBlog failed:", error);
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    return await apiRequest(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(blogData),
    });
  } catch (error) {
    console.error("MongoDB updateBlog failed:", error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    await apiRequest(`/blogs/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error("MongoDB deleteBlog failed:", error);
    throw error;
  }
};

/**
 * GALLERY SERVICES
 */
export const getGallery = async () => {
  const response = await apiRequest("/gallery");
  return response || [];
};

export const addGalleryItem = async (itemData) => {
  try {
    return await apiRequest("/gallery", {
      method: "POST",
      body: JSON.stringify(itemData),
    });
  } catch (error) {
    console.error("MongoDB addGalleryItem failed:", error);
    throw error;
  }
};

export const updateGalleryItem = async (id, itemData) => {
  try {
    return await apiRequest(`/gallery/${id}`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    });
  } catch (error) {
    console.error("MongoDB updateGalleryItem failed:", error);
    throw error;
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    await apiRequest(`/gallery/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error("MongoDB deleteGalleryItem failed:", error);
    throw error;
  }
};

/**
 * IMAGE COMPRESSION & UPLOAD UTILITIES
 */
export const compressAndConvertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG at 70% quality
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const uploadImageFile = async (file) => {
  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (err) {
      console.error(
        "Firebase Storage upload failed, falling back to ImgBB:",
        err,
      );
    }
  }

  // Primary fallback: Upload to ImgBB (free, CDN-backed, permanent URLs)
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || "81d3a84c4355522a5772250fb757fe39";
  try {
    const base64Raw = await compressAndConvertToBase64(file);
    // ImgBB expects raw base64 without the data:image/...;base64, prefix
    const base64Clean = base64Raw.includes(",") ? base64Raw.split(",")[1] : base64Raw;

    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", base64Clean);
    formData.append("name", `${Date.now()}_${file.name.replace(/\.[^/.]+$/, "")}`);

    const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (imgbbResponse.ok) {
      const imgbbData = await imgbbResponse.json();
      if (imgbbData && imgbbData.data && imgbbData.data.url) {
        console.log("Image uploaded to ImgBB:", imgbbData.data.url);
        return imgbbData.data.url;
      }
    }
    throw new Error("ImgBB upload did not return a valid URL");
  } catch (imgbbError) {
    console.warn("ImgBB upload failed, trying backend upload:", imgbbError.message);
  }

  // Secondary fallback: Upload to backend local uploads folder
  try {
    const base64Data = await compressAndConvertToBase64(file);
    const result = await apiRequest("/upload", {
      method: "POST",
      body: JSON.stringify({ image: base64Data, name: file.name }),
    });
    if (result && result.url) {
      return result.url;
    }
    throw new Error("Failed to retrieve image URL from backend");
  } catch (backendError) {
    console.warn("Backend image upload also failed:", backendError.message);
  }

  // Last resort: return compressed base64 data URL (not ideal but UI won't break)
  console.warn("All upload methods failed. Using inline base64 as last resort.");
  return await compressAndConvertToBase64(file);
};

/**
 * RESEARCH PROJECT SERVICES
 */
export const getProjects = async () => {
  const response = await apiRequest("/projects");
  return response || [];
};

export const addProject = async (projectData) => {
  const newProj = {
    ...projectData,
    featured: projectData.featured || false,
    collaborators: Array.isArray(projectData.collaborators)
      ? projectData.collaborators
      : typeof projectData.collaborators === "string"
        ? projectData.collaborators
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
  };

  try {
    return await apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(newProj),
    });
  } catch (error) {
    console.error("MongoDB addProject failed:", error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  const updatedProj = {
    ...projectData,
    collaborators: Array.isArray(projectData.collaborators)
      ? projectData.collaborators
      : typeof projectData.collaborators === "string"
        ? projectData.collaborators
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
  };

  try {
    return await apiRequest(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProj),
    });
  } catch (error) {
    console.error("MongoDB updateProject failed:", error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await apiRequest(`/projects/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error("MongoDB deleteProject failed:", error);
    throw error;
  }
};
