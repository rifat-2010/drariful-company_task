const fs = require('fs');

const publications = JSON.parse(fs.readFileSync('src/data/publications.json', 'utf8'));

// We only want to keep the original 32.
const originalPublications = publications.slice(0, 32);

const newItems = [
  {
    id: "33",
    title: "Challenges and Prospects of Establishing Genome Sequencing Laboratory in Bangladesh",
    journal: "Bangladesh Journal of Histopathology & Cytopathology",
    status: "Published",
    authorship: "Principal author",
    year: "2024",
    field: ["Cancer"],
    abstract: "This paper analyzes the opportunities, infrastructure demands, and clinical challenges of establishing a next-generation genome sequencing laboratory in Bangladesh.",
    downloadAvailable: false
  },
  {
    id: "34",
    title: "Primary Squamous Cell Carcinoma of Breast in a Lactating Mother: A Rare Case Report",
    journal: "Bangladesh Journal of Histopathology & Cytopathology",
    status: "Published",
    authorship: "Principal author",
    year: "2024",
    field: ["Cancer"],
    abstract: "A rare clinical case report describing the histopathological diagnosis and clinical management of primary squamous cell carcinoma of the breast in a lactating patient.",
    downloadAvailable: false
  },
  {
    id: "35",
    title: "Digital Pathology: Prospects and Challenges",
    journal: "Bangladesh Journal of Histopathology & Cytopathology",
    status: "Published",
    authorship: "Principal author",
    year: "2024",
    field: ["Education"],
    abstract: "An overview of the prospects of digital pathology platforms, virtual microscopy, and AI-assisted diagnostics in low-resource medical centers.",
    downloadAvailable: false
  },
  {
    id: "36",
    title: "A Case of Angiomyofibroblastoma in a 23-Year-Old Male",
    journal: "TMSS Medical College Journal",
    status: "Published",
    authorship: "Co author",
    year: "2024",
    field: ["Education"],
    abstract: "This case report details the rare occurrence of angiomyofibroblastoma in a male patient, focusing on histological features and differential diagnosis.",
    downloadAvailable: false
  },
  {
    id: "37",
    title: "A Rare Case of Intrapulmonary Schwannoma in a 30-Year-Old Female",
    journal: "Tairunnessa Memorial Medical College Journal",
    status: "Submitted",
    authorship: "Principal author",
    year: "2026",
    field: ["Cancer"],
    abstract: "A clinical case report analyzing the diagnostic challenges and histopathological features of a rare intrapulmonary schwannoma.",
    downloadAvailable: false
  },
  {
    id: "38",
    title: "Is the Medical Education of Bangladesh Ready for Gen Z: A Mini Review",
    journal: "TMSS Medical College Journal",
    status: "Submitted",
    authorship: "Principal author",
    year: "2026",
    field: ["Education"],
    abstract: "A critical mini-review exploring the learning preferences of Gen Z medical students and evaluating the readiness of the undergraduate curriculum in Bangladesh.",
    downloadAvailable: false
  },
  {
    id: "39",
    title: "Study of Knowledge and Practice about Breast Self-Examination Among Reproductive Aged Women",
    journal: "Asia Pacific Journal of Cancer Care",
    status: "Published",
    authorship: "Co author",
    year: "2025",
    field: ["Cancer"],
    abstract: "A cross-sectional study evaluating the levels of awareness, knowledge, and clinical practices regarding breast self-examination in reproductive-aged women.",
    downloadAvailable: false
  },
  {
    id: "40",
    title: "Histomorphological Spectrum of Colonic Biopsies",
    journal: "TMSS Medical College Journal",
    status: "Published",
    authorship: "Co author",
    year: "2024",
    field: ["Cytology"],
    abstract: "A retrospective review investigating the diverse range of histopathological findings from colonic biopsy specimens in a tertiary referral hospital.",
    downloadAvailable: false
  },
  {
    id: "41",
    title: "Molecular Classification of Invasive Breast Cancer Using Immunohistochemical Study: A Cross-Sectional Study",
    journal: "Bangladesh Journal of Histopathology & Cytopathology",
    status: "Submitted",
    authorship: "Principal author",
    year: "2026",
    field: ["Cancer"],
    abstract: "A cross-sectional study using immunohistochemical markers to categorize invasive breast cancers into molecular subtypes for targeted therapeutic selection.",
    downloadAvailable: false
  },
  {
    id: "42",
    title: "PDL1 Immunoexpression in Triple Negative Breast Cancer and Its Association with BRCA Variants Expressed by Next Generation Sequencing",
    journal: "Asia Pacific Journal of Cancer Care",
    status: "Submitted",
    authorship: "Co author",
    year: "2026",
    field: ["Cancer"],
    abstract: "This study investigates PD-L1 expression levels in triple-negative breast cancer and its correlation with BRCA1/2 genomic variants determined by next-generation sequencing.",
    downloadAvailable: false
  },
  {
    id: "43",
    title: "BRAF V600E-Positive Classical Papillary Thyroid Carcinoma: Integrating Histopathological Diagnosis with NGS for Personalized Oncological Management — A Case Report",
    journal: "Bangladesh Journal of Histopathology & Cytopathology",
    status: "Submitted",
    authorship: "Principal author",
    year: "2026",
    field: ["Cancer"],
    abstract: "A clinical case report illustrating the integration of surgical pathology with next-generation sequencing to identify BRAF V600E mutations and customize patient management.",
    downloadAvailable: false
  },
  {
    id: "44",
    title: "MMR-Proficient Endometrial Adenocarcinoma with PTEN and CTNNB1 Mutations: Molecular Characterisation by NGS and Implications for Personalised Management",
    journal: "Frontiers in Pathology",
    status: "Submitted",
    authorship: "Principal author",
    year: "2026",
    field: ["Cancer"],
    abstract: "A detailed molecular study utilizing NGS to characterize mutations in PTEN and CTNNB1 in mismatch repair (MMR) proficient endometrial adenocarcinoma, exploring treatment pathways.",
    downloadAvailable: false
  }
];

const updated = [...originalPublications, ...newItems];
fs.writeFileSync('src/data/publications.json', JSON.stringify(updated, null, 2), 'utf8');
console.log('Successfully updated publications.json with 44 items.');
