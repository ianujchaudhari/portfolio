"use client";

import { motion } from "framer-motion";
import Section, { SectionTitle } from "./shared/Section";
import data from "../../data/portfolio-data.json";
import { fadeInUp } from "../utils/animations";

const About = () => {
  return (
    <Section
      id="about"
      className="bg-transparent dark:transparent py-32 min-h-fit"
    >
      <SectionTitle>About Me</SectionTitle>
      <motion.div className="max-w-5xl mx-auto text-center" {...fadeInUp}>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-16">
          {data.about}
        </p>
      </motion.div>
    </Section>
  );
};

export default About;
