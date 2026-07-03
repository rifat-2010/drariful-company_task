import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { ImageGallery } from "./ImageGallery";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function ExperienceCard({ experience }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="experience-card overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl text-blue-600 shadow-sm">
            {experience.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold sub-title">
              {experience.title}
            </h3>
            <div className="flex flex-wrap items-center text-sm primary-text">
              <span>{experience.institution}</span>
              <span className="mx-2 primary-text">•</span>
              <span>{experience.duration}</span>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-full bg-blue-50 p-2"
        >
          <ChevronRight className="h-5 w-5 primary-text" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <CardContent className="border-t border-gray-100  pb-6 pt-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-medium heading">
                    Responsibilities:
                  </h4>
                  <ul className="space-y-2 primary-text">
                    {experience.responsibilities && experience.responsibilities.map((item) => (
                      <li key={`resp-${item}`} className="flex items-start">
                        <span className="mr-2 mt-1 primary-text">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="mb-3 mt-6 font-medium heading">Highlights:</h4>
                  <ul className="space-y-2 primary-text">
                    {experience.highlights && experience.highlights.map((item) => (
                      <li key={`high-${item}`} className="flex items-start">
                        <span className="mr-2 mt-1 primary-text">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start justify-center lg:justify-end">
                  {experience.images && <ImageGallery images={experience.images} />}
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}