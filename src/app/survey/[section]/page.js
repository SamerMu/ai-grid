"use client";

import { useParams, useRouter } from "next/navigation";
import SurveySection from "../../components/SurveySection";
import questionsData  from "../../../../data/questions";

export default function DynamicSurveyPage() {
  const router = useRouter();
  const { section } = useParams();
  
  const questions = questionsData.questions;

  // Convert kebab-case from URL to match actual section name in data
  const formattedSection = section
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const sectionData = questions.find(
    (q) => q.section.toLowerCase() === formattedSection.toLowerCase()
  );

  // Define the index and paths based on the current section
  const currentIndex = questions.findIndex(
    (q) => q.section.toLowerCase() === formattedSection.toLowerCase()
  );

  // Next path calculation (existing)
  const nextPath =
    currentIndex + 1 < questions.length
      ? `/survey/${questions[currentIndex + 1].section
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      : "../../results";

  // New: Previous path calculation
  const prevPath =
    currentIndex > 0
      ? `/survey/${questions[currentIndex - 1].section
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      : "/survey/context"; // or wherever your survey starts

  if (!sectionData) {
    return (
      <div className="p-8 text-center text-red-600">
        Section not found. Please check the URL.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start pt-24 min-h-screen bg-gray-50 p-4">
      <SurveySection 
        sectionData={sectionData} 
        nextPath={nextPath}
        prevPath={prevPath} // Pass the prevPath as a new prop
      />
    </div>
  );
}
