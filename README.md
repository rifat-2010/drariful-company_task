# Professional Experience Section

A reusable React component for displaying professional experience with a tabbed interface, expandable cards, and a lightbox image gallery. This version is built with JavaScript instead of TypeScript.

## Features

- Tab-based categories for different types of experience
- Expandable experience cards with details
- Image gallery with lightbox functionality
- Smooth animations with Framer Motion
- Responsive design with Tailwind CSS

## Installation

1. Install the required dependencies:

```bash
bun install
```

2. Start the development server:

```bash
bun run dev
```

## Using the ExperienceSection Component

To use this component in your own project:

1. Copy the required files:
   - `src/components/` directory
   - `src/data/` directory
   - `src/ui/` directory
   - `src/lib/utils.js`
   - `src/ExperienceSection.jsx`

2. Install the necessary dependencies:

```bash
bun add @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-tabs class-variance-authority clsx framer-motion lucide-react tailwind-merge
```

3. Import and use the component in your application:

```jsx
import { ExperienceSection } from './path/to/ExperienceSection';

function App() {
  return (
    <div>
      <header>...</header>
      <main>
        <ExperienceSection />
      </main>
      <footer>...</footer>
    </div>
  );
}
```

## Customizing the Experience Data

To customize the experience data, edit the `src/data/experience-data.js` file. The data structure follows this pattern:

```js
export const experienceData = [
  {
    id: "category-id",
    title: "Category Title",
    experiences: [
      {
        id: "experience-id",
        title: "Job Title",
        institution: "Company/Institution",
        duration: "2020 - Present",
        icon: "🏢", // Emoji or any icon
        responsibilities: [
          "Responsibility 1",
          "Responsibility 2",
        ],
        highlights: [
          "Achievement 1",
          "Achievement 2",
        ],
        images: [
          {
            id: "img1",
            src: "https://example.com/image.jpg",
            alt: "Alt text",
            caption: "Image caption",
          }
        ],
      }
    ],
  }
];
```

## Styling

This component uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the Tailwind classes in the component files
2. Updating the theme in `tailwind.config.js`
3. Adding custom styles in your CSS file

The primary color is set to blue-500 (`#3b82f6`) by default, which can be changed in the Tailwind configuration.
