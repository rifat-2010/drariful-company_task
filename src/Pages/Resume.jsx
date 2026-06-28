import React, { useState, useEffect } from 'react';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Calendar, 
  Shield, 
  ExternalLink,
  ChevronRight,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjects } from '../lib/cms';

const Resume = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await getProjects();
                // Filter ongoing/submitted projects for resume display
                const ongoing = data.filter(p => p.status === 'Ongoing' || p.status === 'Submitted');
                setProjects(ongoing);
            } catch (err) {
                console.error("Error loading resume projects:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="bg-[#f9fafb] min-h-screen">
            <Nav />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* 1. Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-[#001A33] tracking-tight mb-2">
                                Dr. D.M. Arifur Rahman, MD
                            </h1>
                            <p className="text-lg md:text-xl font-semibold text-[#003878] mb-4">
                                Associate Professor of Histopathology & Lab Director
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="px-3 py-1 bg-blue-50 text-[#003878] text-xs font-semibold rounded-full border border-blue-100">
                                    Molecular Pathology
                                </span>
                                <span className="px-3 py-1 bg-blue-50 text-[#003878] text-xs font-semibold rounded-full border border-blue-100">
                                    NGS Cancer Diagnostics
                                </span>
                                <span className="px-3 py-1 bg-blue-50 text-[#003878] text-xs font-semibold rounded-full border border-blue-100">
                                    ISO 15189 QMS
                                </span>
                                <span className="px-3 py-1 bg-blue-50 text-[#003878] text-xs font-semibold rounded-full border border-blue-100">
                                    Clinical Cytology
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#003878] to-[#001A33] text-white px-6 py-4 rounded-xl shadow-md self-stretch md:self-auto flex flex-col justify-center items-center md:items-start">
                            <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">Registration</span>
                            <span className="text-xl font-bold mt-1">BMDC Reg: A57949</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-gray-50 rounded-lg text-[#003878]">
                                <Phone size={18} />
                            </div>
                            <span className="text-sm font-medium">+880 1676 810855</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-gray-50 rounded-lg text-[#003878]">
                                <Mail size={18} />
                            </div>
                            <a href="mailto:arifurrahmandm@gmail.com" className="text-sm font-medium hover:text-[#003878] transition-colors">
                                arifurrahmandm@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-gray-50 rounded-lg text-[#003878]">
                                <Globe size={18} />
                            </div>
                            <a href="https://dmarifurrahman.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#003878] transition-colors flex items-center gap-1">
                                dmarifurrahman.com <ExternalLink size={12} />
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="p-2 bg-gray-50 rounded-lg text-[#003878]">
                                <MapPin size={18} />
                            </div>
                            <span className="text-sm font-medium">Naogaon / Bogura, Bangladesh</span>
                        </div>
                    </div>
                </div>

                {/* 2. Landmark Achievement Banner */}
                <div className="bg-gradient-to-r from-[#001A33] via-[#003878] to-[#012d60] rounded-2xl shadow-lg border-l-8 border-[#e88d67] text-white p-6 md:p-8 mb-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-12">
                        <Shield size={240} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Award className="text-[#e88d67]" size={24} />
                            <span className="text-xs uppercase tracking-widest text-[#e88d67] font-bold">Landmark Achievement</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                            Lab Director of TMSS Biomolecular Lab
                        </h2>
                        <p className="text-[#e88d67] text-lg font-bold mb-4">
                            First & Only ISO 15189:2022 Accredited NGS Lab in South Asia
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                                <span className="block text-xs text-blue-200 uppercase font-semibold">Accreditation Body</span>
                                <span className="text-sm font-bold text-white">EIAC (Emirates Int. Accreditation Centre)</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                                <span className="block text-xs text-blue-200 uppercase font-semibold">International Framework</span>
                                <span className="text-sm font-bold text-white">ILAC Mutual Recognition Arrangement</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                                <span className="block text-xs text-blue-200 uppercase font-semibold">Diagnostic Scope</span>
                                <span className="text-sm font-bold text-white">Molecular Diagnostics of Cancer (NGS)</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                                <span className="block text-xs text-blue-200 uppercase font-semibold">Date Achieved</span>
                                <span className="text-sm font-bold text-white">March 2026</span>
                            </div>
                        </div>

                        <p className="text-sm text-blue-100 leading-relaxed text-justify">
                            <strong className="text-white">Clinical Implication:</strong> This accreditation provides oncologists and clinicians across Bangladesh with the highest level of confidence and trust in NGS-based molecular diagnostic results — enabling precision treatment decisions backed by internationally validated quality assurance. TMSS Biomolecular Lab now delivers cost-effective, world-class cancer genomics testing that was previously unavailable in the region.
                        </p>
                    </div>
                </div>

                {/* 3. Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-4 bg-blue-50 text-[#003878] rounded-xl">
                            <Activity size={32} />
                        </div>
                        <div>
                            <span className="block text-3xl font-extrabold text-[#003878]">&gt;60,000</span>
                            <span className="text-sm font-semibold text-gray-500">Pathology, Cytology & IHC Cases Signed Out</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-4 bg-[#fff9f6] text-[#e88d67] rounded-xl">
                            <Shield size={32} />
                        </div>
                        <div>
                            <span className="block text-3xl font-extrabold text-[#003878]">&gt;1,000</span>
                            <span className="text-sm font-semibold text-gray-500">NGS Cancer Cases Validated & Authorized</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-4 bg-blue-50 text-[#003878] rounded-xl">
                            <BookOpen size={32} />
                        </div>
                        <div>
                            <span className="block text-3xl font-extrabold text-[#003878]">44</span>
                            <span className="text-sm font-semibold text-gray-500">Peer-Reviewed Papers (37 Pub, 7 Sub)</span>
                        </div>
                    </div>
                </div>

                {/* 4. Split Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column (8 cols): Experience & Ongoing Research */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* A. Professional Experience Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-[#003878]/10 text-[#003878] rounded-lg">
                                    <Briefcase size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-[#001A33]">Professional Experience</h2>
                            </div>

                            {/* Timeline container */}
                            <div className="relative border-l-2 border-blue-100 ml-4 pl-6 space-y-8">
                                {/* Role 1: Lab Director */}
                                <div className="relative">
                                    {/* Circle dot on timeline */}
                                    <div className="absolute -left-[31px] top-1 bg-white border-4 border-[#003878] w-4 h-4 rounded-full"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                        <h3 className="text-lg font-bold text-[#001A33]">Laboratory Director</h3>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                            <span className="px-2 py-0.5 bg-gray-100 rounded flex items-center gap-1">
                                                <Calendar size={12} /> Jan 2023 – Present
                                            </span>
                                            <span className="px-2 py-0.5 bg-gray-100 rounded flex items-center gap-1">
                                                <MapPin size={12} /> Bogura
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#003878] mb-3">TMSS Biomolecular Laboratory</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 text-justify">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-[#e88d67] shrink-0 mt-0.5" />
                                            <span><strong>★ FOUNDER:</strong> Established Bangladesh's first ISO 15189:2022 accredited NGS molecular cancer diagnostics laboratory—the only such lab in South Asia.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-[#e88d67] shrink-0 mt-0.5" />
                                            <span>Led the complete ISO 15189:2022 accreditation process with EIAC (ILAC-signatory body) to achieve international quality and competence in cancer genomics (March 2026).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-[#e88d67] shrink-0 mt-0.5" />
                                            <span>Designed and implemented a comprehensive Quality Management System (QMS) encompassing SOPs, internal audits, and LIMS integration.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-[#e88d67] shrink-0 mt-0.5" />
                                            <span>Oversees complete NGS workflows: library preparation, sequencing, bioinformatics pipelines, and clinical report authorization.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-[#e88d67] shrink-0 mt-0.5" />
                                            <span>Validated and authorized <strong>&gt;1,000 NGS-based cancer molecular reports</strong> to guide personalized treatment decisions.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-[#e88d67] shrink-0 mt-0.5" />
                                            <span>Introduced cost-effective cancer genomic panels, ensuring accessibility for underprivileged patients.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Role 2: Associate Professor */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1 bg-white border-4 border-blue-300 w-4 h-4 rounded-full"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                        <h3 className="text-lg font-bold text-[#001A33]">Associate Professor of Histopathology</h3>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                            <span className="px-2 py-0.5 bg-gray-100 rounded flex items-center gap-1">
                                                <Calendar size={12} /> Jan 2023 – Present
                                            </span>
                                            <span className="px-2 py-0.5 bg-gray-100 rounded flex items-center gap-1">
                                                <MapPin size={12} /> Bogura
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#003878] mb-3">TMSS Medical College & Rafatullah Community Hospital</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 text-justify">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                            <span>Teaches and mentors undergraduate and postgraduate medical trainees in histopathology, cytopathology, and molecular pathology.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                            <span>Leads integrated teaching programmes, faculty development initiatives, and medical education innovation for Gen Z learners.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                            <span>Signed out <strong>&gt;60,000 pathology, cytopathology, and immunohistochemistry (IHC) cases</strong>.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                            <span>Member: Tumor Board, TMSS Cancer Centre; Seminar & Integrated Teaching Committee; Journal & Research Committee.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Role 3: Head of Department */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1 bg-white border-4 border-blue-200 w-4 h-4 rounded-full"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                        <h3 className="text-lg font-bold text-[#001A33]">Head of Department</h3>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                            <span className="px-2 py-0.5 bg-gray-100 rounded flex items-center gap-1">
                                                <Calendar size={12} /> Concurrent with above roles
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#003878] mb-3">TMSS Cyto-Histopathology Laboratory</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 text-justify">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-blue-300 shrink-0 mt-0.5" />
                                            <span>Established high-volume histopathology, cytopathology, and IHC diagnostic services.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-blue-300 shrink-0 mt-0.5" />
                                            <span>Developed laboratory quality assurance systems and operational protocols.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Role 4: Assistant Professor */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1 bg-white border-4 border-blue-200 w-4 h-4 rounded-full"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                        <h3 className="text-lg font-bold text-[#001A33]">Assistant Professor of Pathology</h3>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                            <span className="px-2 py-0.5 bg-gray-100 rounded flex items-center gap-1">
                                                <Calendar size={12} /> May 2017 – Jan 2023
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#003878] mb-3">TMSS Medical College, Bogura</h4>
                                    <p className="text-sm text-gray-600 text-justify pl-4">
                                        Led the development and management of histopathology laboratories, mentored medical residents, and initiated academic research.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* B. Ongoing Research Projects Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-[#003878]/10 text-[#003878] rounded-lg">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#001A33]">Ongoing Research Projects</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Actively driving genomic oncology and medical pedagogy research</p>
                                </div>
                            </div>

                            {/* Scrollable list box to keep the layout standard, sleek and not overly long */}
                            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                {loading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <span className="loading loading-spinner loading-md text-[#003878]"></span>
                                    </div>
                                ) : projects.length > 0 ? (
                                    projects.map((project, idx) => (
                                        <div key={project.id || idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors flex gap-4 animate-fade-in">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100/50 text-[#003878] font-bold text-xs shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-[#001a33] font-semibold leading-relaxed">
                                                    {project.title}
                                                </p>
                                                <div className="flex gap-2 mt-1.5">
                                                    <span className="text-[10px] bg-blue-50 text-[#003878] px-2 py-0.5 rounded font-bold border border-blue-100">{project.field}</span>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                                        project.status === 'Submitted'
                                                            ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                                            : 'bg-orange-50 text-orange-700 border border-orange-100'
                                                    }`}>{project.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500 text-sm">
                                        No ongoing research projects listed.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (4 cols): Education, Certifications, Memberships, Awards, References */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* A. Education Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-[#003878]/10 text-[#003878] rounded-lg">
                                    <GraduationCap size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-[#001A33]">Education</h2>
                            </div>

                            <div className="space-y-5">
                                <div className="border-l-2 border-blue-500 pl-4">
                                    <h3 className="text-sm font-bold text-[#001A33]">MD (Pathology)</h3>
                                    <p className="text-xs text-gray-500 font-semibold mb-1">2013 – 2017</p>
                                    <p className="text-xs font-medium text-gray-600">Bangabandhu Sheikh Mujib Medical University (BSMMU), Dhaka</p>
                                </div>
                                <div className="border-l-2 border-blue-300 pl-4">
                                    <h3 className="text-sm font-bold text-[#001A33]">MBBS</h3>
                                    <p className="text-xs text-gray-500 font-semibold mb-1">2005 – 2010</p>
                                    <p className="text-xs font-medium text-gray-600">Mymensingh Medical College</p>
                                </div>
                                <div className="border-l-2 border-gray-200 pl-4">
                                    <h3 className="text-sm font-bold text-[#001A33]">HSC (Science)</h3>
                                    <p className="text-xs text-gray-500 font-semibold mb-1">2004 | GPA 4.9</p>
                                    <p className="text-xs font-medium text-gray-600">Nur Mohammad Rifles Public School & College, Dhaka Board</p>
                                </div>
                                <div className="border-l-2 border-gray-200 pl-4">
                                    <h3 className="text-sm font-bold text-[#001A33]">SSC (Science)</h3>
                                    <p className="text-xs text-gray-500 font-semibold mb-1">2002 | GPA 4.5</p>
                                    <p className="text-xs font-medium text-gray-600">Nur Mohammad Rifles Public School & College, Dhaka Board</p>
                                </div>
                            </div>
                        </div>

                        {/* B. Certifications & Advanced Trainings */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-[#003878]/10 text-[#003878] rounded-lg">
                                    <Award size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-[#001A33]">Certifications & Training</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <CheckCircle size={16} className="text-[#e88d67] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">Advanced Molecular Pathology, QMS & ISO 15189</h4>
                                        <p className="text-xs text-gray-500">Xing Holdings, Brisbane, Australia · 2022–2023</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle size={16} className="text-[#e88d67] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">NGS Library Preparation Training</h4>
                                        <p className="text-xs text-gray-500">NGeneBio Lab, South Korea · September 2025</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle size={16} className="text-[#e88d67] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">NGS Advanced Training</h4>
                                        <p className="text-xs text-gray-500">China · April 2026</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle size={16} className="text-[#e88d67] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">Certified Clinical Trials Course</h4>
                                        <p className="text-xs text-gray-500">Johns Hopkins University (Online) · 2024</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle size={16} className="text-[#e88d67] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">Next Generation Sequencing (NGS) Training</h4>
                                        <p className="text-xs text-gray-500">Central Dogma Lab, Dhaka · December 2024</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle size={16} className="text-[#e88d67] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">Medical Education Certified Course (CMed)</h4>
                                        <p className="text-xs text-gray-500">BIRDEM, Dhaka · 2021 (6 months)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* C. Professional Memberships */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-[#003878]/10 text-[#003878] rounded-lg">
                                    <Shield size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-[#001A33]">Memberships & Roles</h2>
                            </div>

                            <ul className="space-y-2 text-xs font-semibold text-gray-600">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#e88d67] rounded-full shrink-0"></div>
                                    <span>Member, Association of Molecular Pathology, USA (Since 2025)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#e88d67] rounded-full shrink-0"></div>
                                    <span>Member, Tumor Board — TMSS Cancer Centre</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#e88d67] rounded-full shrink-0"></div>
                                    <span>Member, Journal & Research Committee — TMSS</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#e88d67] rounded-full shrink-0"></div>
                                    <span>Assistant Editor — TMSS Medical College Journal</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#e88d67] rounded-full shrink-0"></div>
                                    <span>Social Welfare Secretary — BSMMU Pathology Alumni</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#e88d67] rounded-full shrink-0"></div>
                                    <span>Admin — "Easypathology" & "Bangladesh Surgical Pathology"</span>
                                </li>
                            </ul>
                        </div>

                        {/* D. Awards & Recognition */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-[#003878]/10 text-[#003878] rounded-lg">
                                    <Award size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-[#001A33]">Awards & Recognition</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-50 rounded-lg text-amber-500 mt-0.5">
                                        <Award size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">Annual Performance Award</h4>
                                        <p className="text-xs text-gray-500">TMSS · 2025</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-50 rounded-lg text-amber-500 mt-0.5">
                                        <Award size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">Best Teacher Award</h4>
                                        <p className="text-xs text-gray-500">TMSS Medical College · 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-50 rounded-lg text-amber-500 mt-0.5">
                                        <Award size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#001A33]">TMSS Service Award</h4>
                                        <p className="text-xs text-gray-500">TMSS · 2022 & 2021</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* E. References */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-[#003878]/10 text-[#003878] rounded-lg">
                                    <Globe size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-[#001A33]">References</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <h4 className="text-sm font-bold text-[#001A33]">Dr. Paul Mainwaring</h4>
                                    <p className="text-xs text-gray-500 mb-2">MBBS, MD, FRCPA</p>
                                    <p className="text-xs text-gray-600 flex items-center gap-1.5 mb-1">
                                        <Mail size={12} className="text-gray-400" />
                                        <a href="mailto:drpaulmainwaring@gmail.com" className="hover:text-[#003878]">drpaulmainwaring@gmail.com</a>
                                    </p>
                                    <p className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <Phone size={12} className="text-gray-400" />
                                        <span>+61 405097935</span>
                                    </p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <h4 className="text-sm font-bold text-[#001A33]">Dr. Md Motiur Rahman</h4>
                                    <p className="text-xs text-gray-500 mb-2">MBBS, PhD</p>
                                    <p className="text-xs text-gray-600 flex items-center gap-1.5 mb-1">
                                        <Mail size={12} className="text-gray-400" />
                                        <a href="mailto:tmsshealth@gmail.com" className="hover:text-[#003878]">tmsshealth@gmail.com</a>
                                    </p>
                                    <p className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <Phone size={12} className="text-gray-400" />
                                        <span>+880 1713377022</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 5. Navigation Links & Bottom Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-sm text-gray-500 font-semibold">
                        Looking for the complete list of publications?
                    </span>
                    <Link to="/publication" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003878] text-white font-bold rounded-xl hover:bg-[#001A33] transition-colors shadow-sm">
                        View 44 Peer-Reviewed Publications <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Resume;