import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ExperienceCard } from "./ExperienceCard";

export function ExperienceTabs({ categories }) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className=" z-10 bg-white pb-2 pt-1 shadow-sm">
        <TabsList className="h-auto w-full justify-start overflow-x-auto whitespace-nowrap rounded-none border-b p-0 md:flex">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="tab-trigger flex-shrink-0 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-white data-[state=active]:border-[#0066CB] data-[state=active]:text-[#0066CB]"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map((category) => (
        <TabsContent
          key={category.id}
          value={category.id}
          className="mt-6 focus:outline-none"
        >
          <div className="space-y-4">
            {category.experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
