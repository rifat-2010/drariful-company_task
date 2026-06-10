import React, { useState, useEffect } from 'react'
import Nav from '../Header/Nav'
import Footer from '../Footer/Footer'
import { getGallery } from '../lib/cms'

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        setImages(data);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div>
      <Nav></Nav>

      <div className='bg-[#f9fafb]'>
        <div className="w-11/12 mx-auto py-10">
          <h2 className="heading text-3xl font-bold text-center mb-2">Clinical Gallery</h2>
          <p className='font-bold sub-title text-center mb-6'>Gallery of Clinical Work & Medical Insights</p>
          
          {loading ? (
            <div className="text-center py-16">
              <span className="loading loading-spinner loading-lg text-[#003878]"></span>
              <p className="mt-2 text-gray-500 font-semibold text-sm">Loading gallery photos...</p>
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
                  <p className="mt-2 text-center font-semibold heading">{img.alt}</p>
                </div>
              ))}
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
                <p className="text-lg font-semibold sub-title text-center mt-4">{selectedImage.alt}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}
