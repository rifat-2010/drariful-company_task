import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

const gallerySeedData = [
  { src: "https://i.ibb.co.com/vxkL5zL1/associate-professor2.jpg", alt: "Delivering speech in the world cancer day", caption: "Delivering speech in the world cancer day" },
  { src: "https://i.ibb.co.com/SX6bSvpW/workshop-2.jpg", alt: "Working with the oncology department of TMSS Medical College", caption: "Working with the oncology department of TMSS Medical College" },
  { src: "https://i.ibb.co.com/9kqDMBgS/associate3.jpg", alt: "Agreement Signing Ceremony", caption: "Agreement Signing Ceremony" },
  { src: "https://i.ibb.co.com/Csmb3hQy/assistant-professior.jpg", alt: "Working with MiHealthOmics, Australia, to establish the molecular lab", caption: "Working with MiHealthOmics, Australia, to establish the molecular lab" },
  { src: "https://i.ibb.co.com/nqv1n827/lab-leadership.jpg", alt: "Working to establish a digital pathology platform", caption: "Working to establish a digital pathology platform" },
  { src: "https://i.ibb.co.com/8CKNbsJ/lab-director.jpg", alt: "After completion of a successful ISO inspection", caption: "After completion of a successful ISO inspection" },
  { src: "https://i.ibb.co.com/yFksj4Z9/workshop-2.jpg", alt: "After completion of a successful ISO inspection", caption: "After completion of a successful ISO inspection" },
  { src: "https://i.ibb.co.com/5XRRfFNv/workshop-3.jpg", alt: "Seminar", caption: "Seminar" },
  { src: "https://i.ibb.co.com/39n8Sz85/workshop.jpg", alt: "In Biomolecular conference room", caption: "In Biomolecular conference room" },
  { src: "https://i.ibb.co.com/pjt7WF07/clinical-experience.jpg", alt: "Doing more thousands of image guided and non guided core biopsies", caption: "Doing more thousands of image guided and non guided core biopsies" },
  { src: "https://i.ibb.co.com/JRhKsDQW/public-engage.jpg", alt: 'Seminar on "Why we need a Biomolecular laboratory"', caption: 'Seminar on "Why we need a Biomolecular laboratory"' },
  { src: "https://i.ibb.co.com/LXZdgyHL/public-engage2.jpg", alt: 'Seminar on "Why we need a Biomolecular laboratory"', caption: 'Seminar on "Why we need a Biomolecular laboratory"' },
  { src: "https://i.ibb.co.com/Ldjxrsq8/public-engage-3.jpg", alt: "Working on the field of precision cancer medicine", caption: "Working on the field of precision cancer medicine" },
  { src: "https://i.ibb.co.com/RkPt9vK4/clinical-experience2.jpg", alt: "Signed out more than 500 immunohistochemistry cases", caption: "Signed out more than 500 immunohistochemistry cases" },
  { src: "https://i.ibb.co.com/d4cLMwff/2025-05-10.jpg", alt: "Inspection of ISO experts in molecular lab", caption: "Inspection of ISO experts in molecular lab" },
  { src: "https://i.ibb.co.com/HJ8BhbJ/2025-05-10.jpg", alt: "Dedicated for patients wellbeing", caption: "Dedicated for patients wellbeing" },
  { src: "https://i.ibb.co.com/jkHyK59g/Whats-App-Image-2025-05-10-at-19-42-22-3d0c34b2.jpg", alt: "With ISO expert Dr Patric Mateta and Oncologist Dr. Paul Mainwaring", caption: "With ISO expert Dr Patric Mateta and Oncologist Dr. Paul Mainwaring" },
  { src: "https://i.ibb.co.com/7NnCV3VN/18.jpg", alt: "With renowned breast surgeon of NHS, UK; Dr SK Farid Ahmed", caption: "With renowned breast surgeon of NHS, UK; Dr SK Farid Ahmed" },
  { src: "https://i.ibb.co.com/p6QFsM7Q/19.jpg", alt: "In the histopathology microscopy room", caption: "In the histopathology microscopy room" },
  { src: "https://i.ibb.co.com/67SzKG0q/20.jpg", alt: "With Professor MH Alamgir Pavel", caption: "With Professor MH Alamgir Pavel" },
  { src: "https://i.ibb.co.com/cK0RVjKx/21.jpg", alt: "Briefing about the molecular lab with Ekhon TV", caption: "Briefing about the molecular lab with Ekhon TV" },
  { src: "https://i.ibb.co.com/Vc1HPf4B/22.jpg", alt: "Australian trained biomolecular team", caption: "Australian trained biomolecular team" },
  { src: "https://i.ibb.co.com/Z1Rt8mYQ/23.jpg", alt: "In Biomolecular conference room", caption: "In Biomolecular conference room" },
  { src: "https://i.ibb.co.com/DfJfvCjy/24.jpg", alt: "Session Moderator in conference", caption: "Session Moderator in conference" },
  { src: "https://i.ibb.co.com/xSTJTn0m/25.jpg", alt: "Mentoring the MBBS students", caption: "Mentoring the MBBS students" },
  { src: "https://i.ibb.co.com/0yRQWGDv/26.jpg", alt: "Delivering speech in medicine seminar", caption: "Delivering speech in medicine seminar" },
  { src: "https://i.ibb.co.com/GvzQMbXd/27.jpg", alt: "Leading the energetic TBL team", caption: "Leading the energetic TBL team" },
  { src: "https://i.ibb.co.com/LVbffYm/28.jpg", alt: 'Expert panel in the seminar', caption: 'Expert panel in the seminar' },
  { src: "https://i.ibb.co.com/WvY2QrJ3/29.jpg", alt: "Supervisor of MD phase B residents", caption: "Supervisor of MD phase B residents" },
  { src: "https://i.ibb.co.com/YrJ3Vh4/30.jpg", alt: "Foreign delegates from the USA", caption: "Foreign delegates from the USA" },
  { src: "https://i.ibb.co.com/tVsqvHz/Whats-App-Image-2025-05-15-at-13-04-19-8a67fb38.jpg", alt: "Delivering speech in SZMCH", caption: "Delivering speech in SZMCH" },
  { src: "https://i.ibb.co.com/Hp4P3JwS/Whats-App-Image-2025-05-15-at-13-04-18-ce8fa643.jpg", alt: "CT guided core biopsy", caption: "CT guided core biopsy" },
  { src: "https://i.ibb.co.com/gFHsZKWM/Whats-App-Image-2025-05-15-at-13-04-18-740d433f.jpg", alt: "Networking meeting Australia", caption: "Networking meeting Australia" },
  { src: "https://i.ibb.co.com/ymyYvff2/Whats-App-Image-2025-05-15-at-13-04-19-591c2270.jpg", alt: "With ED of TMSS, Dr. Hosne Ara Begum", caption: "With ED of TMSS, Dr. Hosne Ara Begum" },
  { src: "https://i.ibb.co.com/PZ3y0bhR/Whats-App-Image-2025-05-15-at-13-04-20-760acfb2.jpg", alt: "Visit of Dr Sumeet Gujral from Tata Memorial", caption: "Visit of Dr Sumeet Gujral from Tata Memorial" },
  { src: "https://i.ibb.co.com/MkFNgPyY/Whats-App-Image-2025-05-15-at-13-04-19-5bc94ac9.jpg", alt: "In the Histopathology lab", caption: "In the Histopathology lab" },
  { src: "https://i.ibb.co.com/krjy0xH/Whats-App-Image-2025-05-15-at-13-04-20-77382b02.jpg", alt: "CT guided bone biopsy", caption: "CT guided bone biopsy" },
  { src: "https://i.ibb.co.com/Ldj6gHYC/Whats-App-Image-2025-05-15-at-13-04-21-465657ba.jpg", alt: "Celebrating 1st HRD molecular testing", caption: "Celebrating 1st HRD molecular testing" },
  { src: "https://i.ibb.co.com/nqMrMXQB/Whats-App-Image-2025-05-15-at-13-04-21-da6043b4.jpg", alt: "With delegates from RMU", caption: "With delegates from RMU" },
];

const Gallery = mongoose.model("Gallery", new mongoose.Schema({ src: String, alt: String, caption: String }));

async function runMigration() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for restoration...");
    
    // শুধু গ্যালারি রিস্টোর করা হচ্ছে
    await Gallery.insertMany(gallerySeedData);
    
    console.log("✅ ৩৯টি গ্যালারি ছবি সফলভাবে রিস্টোর হয়েছে!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runMigration();