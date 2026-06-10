import React from 'react';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resume = () => {
    return (
        <div>
            <Nav></Nav>
            <div className='bg-[#f9fafb]'>
                <div className="w-5/6 mx-auto min-h-screen py-10 font-sans primary-text">
                    <div className="text-center primary-text mb-10">
                        <h1 className="text-3xl font-bold mb-2 heading">Dr. DM Arifur Rahman</h1>
                        <p className="text-lg italic">
                            Associate Professor of Histopathology
                        </p>
                        {/* skills  */}
                        <div >
                            <p className='text-sm  font-semibold mb-2 sub-title'>Clinical cytology | Histopathology | Molecular pathology | Medical education | Precision cancer medicine</p>
                        </div>
                    </div>



                    {/* about  */}
                    <div>
                        <p className="mb-10 text-justify">
                            I am a motivated Associate Professor with experienced in the field of Clinical cytology, Histopathology, Molecular pathology, Medical education, and Precision cancer medicine. My objective is to establish an ISO 15189:2022 accredited laboratory in low resource setting, providing excellence to the underprivileged cancer patients through precision cancer medicine and development of an integrated undergraduate medical curriculum in Bangladesh.
                        </p>
                    </div>

                    {/* first section  */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        {/* first  column */}
                        <div>

                            {/* Professional Experience Section */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2 sub-title">Professional Experience</h2>
                                <div className="mb-6">
                                    <p className="font-bold heading italic">Associate Professor of Histopathology</p>
                                    <p className="text-justify">Working in TMSS Medical College and Rafatullah Community Hospital as an Associate Professor of Histopathology since 2023  and assistant professor of Histopathology since May 2017. Working as a key person in the development of a Histopathology and Immunohistochemistry Laboratory in the 750 bedded hospital. Signed out approximately 31,000 surgical pathology, cytopathology and Immunohistochemistry cases so far. Also skilled in Image guided FNAC and core biopsy procedure. As a medical educationist runs a couple of faculty development programme in my medical college.</p>
                                </div>

                                <div className='mb-6'>
                                    <p className="font-bold heading italic">Laboratory Director of TMSS Biomolecular Laboratory</p>
                                    <p className="text-justify">Now I am working as a laboratory director of TMSS Biomolecular Laboratory, the first molecular cancer diagnostics lab in Bangladesh. I have got training in the field of molecular pathology operation, laboratory information management system, Quality management system and development of ISO 15189 accredited laboratory from Xing Holdings, Auatralia. Already we have developed a molecular laboratory with NGS facility and now working on ISO 15189 Accreditation process.</p>
                                </div>
                                <div className='mb-6'>
                                    <p className="font-bold heading italic">Research Experience</p>

                                    <p className="text-justify">I am an enthusiastic researcher with 32 publications so far focusing on Nephropathology, Gynaepathology, Lymphoreticular pathology, Head neck pathology and molecular pathology. My carrier focus is translational cancer research, precision cancer medicine and clinical trial.</p>
                                </div>
                                <div>
                                    <p className="font-bold heading italic">Training in Molecular Pathology</p>

                                    <p className="text-justify">Training in the field of molecular pathology operation, Quality management system and development of ISO 15189 accredited laboratory from Xing Holdings, Auatralia. My trainers are Dr. Paul Mainwaring, MD, FRCPA, Dr. Kevin KOO, PHD and Rebecca Perkins, MPH.</p>
                                </div>
                            </div>

                        </div>

                        {/* second column */}
                        <div>
                            {/* Education Section */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2 sub-title">Education</h2>
                                <div className="mb-2">
                                    <p className="font-bold heading italic">MD(Pathology)</p>
                                    <p>March 2013 to August 2017</p>
                                    <p>Bangabandhu Sheikh Mujib Medical University</p>
                                </div>
                                <div className='mb-2'>
                                    <p className="font-bold heading italic">MBBS</p>
                                    <p>January 2005 to May 2010</p>
                                    <p>Mymensingh Medical College</p>
                                </div>
                                <div className='mb-2'>
                                    <p className="font-bold heading italic">Higher Secondary Certificate (HSC)</p>
                                    <p>GPA 4.9 in 2004</p>
                                    <p>Nur Mohammad Rifles Public School & College</p>
                                </div>
                                <div>
                                    <p className="font-bold heading italic">Secondary School Certificate(SSC)</p>
                                    <p>GPA 4.5 in 2002</p>
                                    <p>Nur Mohammad Rifles Public School & College</p>
                                </div>
                            </div>

                            {/* Professional Awards */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2 sub-title mt-5">Professional Awards</h2>
                                <ul className='list-disc pl-8 space-y-2'>
                                    <li>Best teacher Award 2023</li>
                                    <li>TMSS service award 2022</li>
                                    <li>Mujib Year service Award 2021</li>
                                </ul>
                            </div>

                            {/* Research Interests & Projects */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2 sub-title mt-5">Research Interests & Projects</h2>
                                <ul className='list-disc pl-8 space-y-2'>
                                    <li>Translational cancer research</li>
                                    <li>Precision cancer medicine</li>
                                    <li>Clinical trials</li>
                                    <li>Nephropathology, Breast cancer, Head & Neck pathology</li>
                                    <li>Undergraduate medical pedagogy using digital platforms</li>
                                </ul>
                            </div>
                            {/* publication  */}
                            <div>
                                <h2 className="text-xl font-semibold mb-1 sub-title mt-5">My Publications</h2>
                                <Link className='italic heading font-semibold' to={'/publication'}>Click here</Link> 
                            </div>
                        </div>
                    </section>

                    {/* second section  */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-10">
                        {/* Graduate Training and Experience */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 sub-title">Summary of Post Graduate Training and Experience</h2>
                            <div className="mb-4">

                                <ul class="list-disc pl-8 space-y-2 text-justify">
                                    <li>Lecturer, Genesis, Post Graduate Medical Orientation Programme, Shahbag, Dhaka. (From January 2014 to December 2015)</li>
                                    <li>  Lecturer, TMSS Medical Technology Institute, Bogra. (From February 2012 to December 2012)</li>
                                    <li>ICU Medical Officer in Dhanmondi General & Kidney Hospital, Dhaka. (From 01/06/2013 to 31/12/2016)</li>
                                    <li>Participation in 9th Postgraduate Course on Histopathology and Cytopathology organized by Bangladesh Academy of Pathology (29/11/2014 to 03/12/2014)</li>
                                    <li>Participation in 10th Postgraduate Course on Histopathology and Cytopathology organized by Bangladesh Academy of Pathology (on 05/10/2015)</li>
                                    <li>Participation in 3rd South Asian Conference in Histopathology organized by Bangladesh Academy of Pathology (02/10/2015 to 04/10/2015)</li>
                                    <li>Resident, Bangabandhu Sheikh Mujib Medical University (BSMMU) (From 01/03/2013 to 28/02/2017)</li>
                                </ul>

                            </div>
                        </div>

                        {/* Working Experience as a Medical Educationist */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 sub-title">Working Experience as a Medical Educationist</h2>
                            <div className="mb-4">

                                <ul class="list-disc pl-8 space-y-2 text-justify">
                                    <li>Trained in teaching methodology at Centre for Medical Education (22/06/2017 to 26/06/2017)</li>
                                    <li>Attended South East Asia Regional Association for Medical Education (SEARAME) Conference in 2021</li>
                                    <li>Admin: easypathology (Facebook group) - Academic site for undergraduate medical students</li>
                                    <li>Admin: Bangladesh Surgical Pathology (Facebook group) - Academic & professional group of histopathologists, pathologists, pathology trainees & residents</li>
                                    <li>Completed a six-month certified course in Medical Education from BIRDEM (CMed)</li>
                                    <li>Conducted integrated teaching workshop at TMSS Medical College in 2022</li>
                                    <li>Currently working as a faculty member in the Medical Education Unit of TMSS Medical College</li>
                                </ul>


                            </div>
                        </div>

                    </section>

                    {/* last section  */}
                    <section className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-6'>
                        {/* References */}
                        <div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2 sub-title">References</h2>
                                {/* References 1 */}
                                <div>
                                    <p className="font-semibold heading italic">Dr. Paul Mainwaring, MBBS, MD, FRCPA</p>
                                    <p>
                                        <span className='font-bold'>Email:</span>
                                        <a className='italic' href="mailto:drpaulmainwaring@gmail.com"> drpaulmainwaring@gmail.com</a>
                                    </p>
                                    <p>
                                        <span className='font-bold'>Mobile: </span>
                                        +61 405097935</p>
                                </div>
                                {/* References 2 */}
                                <div className='mt-2'>
                                    <p className="font-semibold heading italic">Dr. Md Motiur Rahman, MBBS, PhD</p>
                                    <p>
                                        <span className='font-bold'>Email:</span>
                                        <a className='italic' href="mailto:tmsshealth@gmail.com"> tmsshealth@gmail.com</a>
                                    </p>
                                    <p>
                                        <span className='font-bold'>Mobile: </span>
                                        +88017 13377022</p>
                                </div>
                            </div>

                        </div>
                        {/* Contact  */}
                        <div className='space-y-2'>
                            <h2 className="text-xl font-semibold sub-title">Contact</h2>
                            <p>
                                <span className='font-semibold'>Permanent address: </span>
                                <br />
                                Kalupara, Naogaon sadar, Baluvora Naogaon.
                            </p>
                            <p>
                                <span className='font-semibold'>Present address: </span>
                                <br />
                                Rangpur road, Thengamara, Bogura sadar, Gokul-5800, Bogura
                            </p>
                            <p className='font-semibold'>
                                Email:
                                <a className='heading italic' href="mailto:drpaulmainwaring@gmail.com"> arifurrahmandm@gmail.com</a>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Resume;