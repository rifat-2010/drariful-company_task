import React from "react";
import { cn } from "../lib/utils";

const Expertises = () => {
  // এখানে কোনো ডাটাবেস কল বা ডামি ডাটা ইম্পোর্ট রাখবেন না
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Expertise & Specializations</h2>
        {/* আপনার বাকি ডিজাইন কোড এখানে থাকবে */}
        <p className="text-gray-600">Molecular Pathology • Precision Oncology • Digital Pathology</p>
      </div>
    </section>
  );
};
export default Expertises;