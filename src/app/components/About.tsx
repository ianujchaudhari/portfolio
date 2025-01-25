"use client";

import { motion } from "framer-motion";
import { ReactElement } from "react";
import Section, { SectionTitle } from "./shared/Section";
import { fadeInUp } from "../utils/animations";
import useGeneralInfo from "../../hooks/useGeneralInfo";

const About: React.FC = () => {
  const { loading, generalInfo } = useGeneralInfo();

  if (loading) {
    return <></>;
  }

  if (!generalInfo) {
    return <div>Not found</div>;
  }

  // Helper function to parse the about text into paragraphs
  const renderParagraphs = (text: string): ReactElement[] => {
    return text
      .split("\n") // Split text by line breaks
      .filter((paragraph) => paragraph.trim() !== "") // Remove empty lines
      .map((paragraph, index) => (
        <p
          key={index}
          className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
        >
          {paragraph}
        </p>
      ));
  };

  return (
    <Section
      id="about"
      className="bg-transparent dark:transparent py-32 min-h-fit"
    >
      <SectionTitle>About Me</SectionTitle>
      <motion.div className="max-w-5xl mx-auto text-center" {...fadeInUp}>
        {renderParagraphs(generalInfo.about)}
      </motion.div>
    </Section>
  );
};

export default About;
