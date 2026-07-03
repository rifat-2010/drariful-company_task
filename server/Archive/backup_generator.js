import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env ফাইলটি যদি server ফোল্ডারে থাকে তবে এটি কাজ করবে
dotenv.config({ path: path.join(__dirname, ".env") });

// কানেকশন স্ট্রিং তৈরি করা (আপনার আগের index.js এর মতো)
const mongoUri =
  process.env.MONGO_URI ||
  (process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.DB_CLUSTER
    ? `mongodb+srv://${encodeURIComponent(process.env.DB_USERNAME)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : null);

async function checkAndBackup() {
  try {
    if (!mongoUri) {
      console.error("❌ Error: No MongoDB Credentials found in .env");
      process.exit(1);
    }

    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    const db = mongoose.connection.db;

    // ডাটাবেসের সব কালেকশন চেক করা
    const collections = await db.listCollections().toArray();
    const colNames = collections.map((c) => c.name);
    console.log("📁 Collections in DB:", colNames);

    let allData = {};

    // প্রতিটি কালেকশন থেকে ডাটা রিড করা (যাতে কোনো ডাটা মিস না হয়)
    for (let name of colNames) {
      const data = await db.collection(name).find({}).toArray();
      allData[name] = data;
      console.log(`📊 Found ${data.length} items in [${name}]`);
    }

    // ব্যাকআপ ফাইল সেভ করা
    fs.writeFileSync("emergency_backup.json", JSON.stringify(allData, null, 2));
    console.log("\n✅ Emergency backup created: emergency_backup.json");
    console.log(
      "আপনার ১০টি ব্লগ যদি কোনো কালেকশনে থাকে, তবে এই ফাইলে তা পাওয়া যাবে।",
    );

    process.exit();
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
    process.exit(1);
  }
}

checkAndBackup();
