import React, { useState, useEffect } from "react";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { getGallery } from "../lib/cms";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div>
      <Nav></Nav>

      <div className="bg-[#f9fafb]">
        <div className="w-11/12 mx-auto py-10">
          <h2 className="heading text-3xl font-bold text-center mb-2">
            Clinical Gallery
          </h2>
          <p className="font-bold sub-title text-center mb-6">
            Gallery of Clinical Work & Medical Insights
          </p>

          {loading ? (
            <div className="text-center py-16">
              <span className="loading loading-spinner loading-lg text-[#003878]"></span>
              <p className="mt-2 text-gray-500 font-semibold text-sm">
                Loading gallery photos...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-md border border-red-200">
              <p className="text-red-600 text-lg font-semibold mb-3">
                Unable to load gallery images
              </p>
              <p className="text-gray-600 mb-4">
                {error.message || "The backend API is unavailable."}
              </p>
              <p className="text-sm text-gray-500">
                Please verify the CMS backend deployment and its public API
                access.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 object-cover rounded-md shadow-md hover:scale-105 transition-transform"
                  />
                  <p className="mt-2 text-center font-semibold heading">
                    {img.alt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && images.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#003878] mb-2">
                No gallery images found
              </h3>
              <p className="text-gray-500">
                The API returned no gallery items, so this page is showing an
                empty state.
              </p>
            </div>
          )}

          {/* Modal */}
          {selectedImage && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="relative bg-[#f9fafb] rounded-md max-w-3xl w-full mx-4 p-4">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 sub-title hover:text-[#003878] text-2xl"
                >
                  &times;
                </button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full max-h-[70vh] object-contain rounded"
                />
                <p className="text-lg font-semibold sub-title text-center mt-4">
                  {selectedImage.alt}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
