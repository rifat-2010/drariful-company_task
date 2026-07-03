import React, { useState, useEffect } from "react";
import { getGallery } from "../lib/cms";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchItems = async () => {
      try {
        const data = await getGallery();
        setItems(data);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visual highlights of our biomolecular lab, seminars, and clinical experiences.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all hover:shadow-md">
                <img
                  src={item.src}
                  alt={item.alt || "Gallery Image"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm text-white line-clamp-2">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No gallery items available at the moment.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage;