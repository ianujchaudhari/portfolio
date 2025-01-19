"use client";

import { motion } from "framer-motion";
import Section, { SectionTitle } from "./shared/Section";
import data from "../../data/portfolio-data.json";
import { staggerChildren, fadeInUp } from "../utils/animations";

const ExperienceCard = ({ job }: { job: any }) => {
  return (
    <motion.div
      className="glass-form bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-6 w-full sm:w-[calc(50%-1rem)] transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-1"
      variants={fadeInUp}
    >
      <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company }</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
        {job.date}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
      <div className="flex flex-wrap gap-2">
        {job.technologies.map((tech: any, index: any) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            {tech}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  // Sort experiences by starting date (assuming date format is "YYYY - Present" or "YYYY - YYYY")
  const sortedExperiences = [...data.experience].sort((a, b) => {
    const getYear = (date: any) => parseInt(date.split(" - ")[0]);
    return getYear(b.date) - getYear(a.date);
  });

  return (
    <Section id="experience" className="bg-transparent dark:bg-transparent py-32">
      <SectionTitle >Work Experience</SectionTitle>
      <motion.div
        className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-24"
        variants={staggerChildren(0.2)}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-wrap justify-between">
          {sortedExperiences.map((job, index) => (
            <ExperienceCard key={index} job={job} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Experience;
