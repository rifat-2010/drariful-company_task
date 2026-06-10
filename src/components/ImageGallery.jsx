import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function ImageGallery({ images }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the lightbox with a specific image
  const openLightbox = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 w-full">
      <div className="grid grid-cols-3 gap-3">
        {images.slice(0, 3).map((image) => (
          <motion.div
            key={image.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm"
            onClick={() => openLightbox(image)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity hover:opacity-100">
              <div className="absolute bottom-2 left-2 text-xs font-medium text-white">
                {image.caption}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {images.length > 3 && (
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
          onClick={() => openLightbox(images[0])}
        >
          View All ({images.length})
        </Button>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedImage && (
            <div className="flex flex-col">
              <DialogTitle className="sr-only">
                {selectedImage.caption} - {selectedImage.alt}
              </DialogTitle>
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{selectedImage.caption}</h3>
                <p className="text-sm text-gray-500">{selectedImage.alt}</p>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50 p-4">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-md ${
                      selectedImage.id === image.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
