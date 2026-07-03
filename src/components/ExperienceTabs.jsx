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
      {/* Tab List with Gradient Background - MATCHING 1ST IMAGE */}
      <TabsList className="h-auto w-full justify-start overflow-x-auto whitespace-nowrap rounded-none border-0 p-0 md:flex">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="tab-trigger flex-shrink-0 rounded-none border-b-0 px-6 py-4 text-sm font-semibold text-white data-[state=active]:bg-white data-[state=active]:text-slate-950 transition-all"
          >
            {category.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab Content */}
      {categories.map((category) => (
        <TabsContent
          key={category.id}
          value={category.id}
          className="mt-6 focus:outline-none"
        >
          <div className="space-y-4">
            {category.experiences && category.experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default ExperienceTabs;