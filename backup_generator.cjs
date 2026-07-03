const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function createBackup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for backup...");

    // Models (একই নাম থাকতে হবে)
    const Blog = mongoose.model("Blog", new mongoose.Schema({}, { strict: false }));
    const Project = mongoose.model("Project", new mongoose.Schema({}, { strict: false }));
    const Gallery = mongoose.model("Gallery", new mongoose.Schema({}, { strict: false }));

    // ডাটাবেস থেকে সব ডাটা নিয়ে আসা হচ্ছে
    const blogs = await Blog.find({});
    const projects = await Project.find({});
    const gallery = await Gallery.find({});

    const fullBackup = {
      blogs: blogs,
      projects: projects,
      gallery: gallery
    };

    // 'final_backup.json' নামে একটি ফাইল তৈরি হবে
    fs.writeFileSync("final_backup.json", JSON.stringify(fullBackup, null, 2));

    console.log(`✅ ব্যাকআপ সফল!`);
    console.log(`ব্লগ সংখ্যা: ${blogs.length}`);
    console.log(`গ্যালারি সংখ্যা: ${gallery.length}`);
    console.log(`এখন 'final_backup.json' ফাইলটি আপনার কম্পিউটারে সেভ করে রাখুন।`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createBackup();