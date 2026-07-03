/**
 * src/Pages/GalleryPage.jsx - THE PUBLIC VIEW (ULTIMATE VERSION)
 * 1. 100% Dynamic Database Fetch.
 * 2. Visual-first Loading State.
 * 3. Modern Masonry-style Grid with Safeguards.
 */

import React, { useState, useEffect } from "react";
import { getGallery } from "../lib/cms";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { Loader2, ImageIcon } from "lucide-react";

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getGallery();
        setItems(data || []);
      } catch (error) {
        console.error("❌ Gallery Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Nav />
      
      <header className="bg-white border-b border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">
            Clinical & <span className="text-blue-700">Lab Gallery</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold text-sm uppercase tracking-[0.2em]">
            Visual Highlights of our Molecular Endeavors
          </p>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-16 w-full">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-700" />
            <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Processing Visuals...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-50 transition-all duration-500 hover:shadow-2xl">
                <img
                  src={item.src}
                  alt={item.alt || "Clinical Experience"}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {item.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-6">
                    <p className="text-xs font-bold text-white leading-relaxed tracking-wide">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <ImageIcon className="w-10 h-10 text-blue-200" />
            </div>
            <h3 className="text-3xl font-black text-gray-800">Our gallery is currently empty.</h3>
            <p className="text-gray-400 mt-4 font-bold uppercase text-xs tracking-widest">New Clinical captures coming soon</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage;