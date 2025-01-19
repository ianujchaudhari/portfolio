"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section, { SectionTitle } from "./shared/Section";
import data from "../../data/portfolio-data.json";
import { fadeInUp, staggerChildren } from "../utils/animations";
import {
  Code,
  Server,
  Database,
  Cloud,
  Layers,
  GitBranch,
  Monitor,
  Cpu,
  Globe,
  Terminal,
} from "lucide-react";

// Define a type for the skill icons mapping
type SkillIcons = {
  [key: string]: React.ComponentType<{ className?: string }>;
};

// Define a type for skill data
type Skill = {
  name: string;
  category: string;
};

const skillIcons: SkillIcons = {
  JavaScript: Code,
  React: Layers,
  "Node.js": Server,
  Express: Server,
  MongoDB: Database,
  Docker: Cloud,
  AWS: Cloud,
  "Next.js": Globe,
  TypeScript: Code,
  GraphQL: Database,
};

// Define props type for SkillBadge
type SkillBadgeProps = {
  name: string;
};

const SkillBadge = ({ name }: SkillBadgeProps) => {
  const Icon = skillIcons[name] || Terminal;
  return (
    <motion.div
      className="skill-badge glowing-border w-36 md:w-48 p-4 text-gray-600 hover:text-white"
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5 mr-2 text-inherit" />
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    ...new Set(data.skills.map((skill: Skill) => skill.category)),
  ];

  const filteredSkills =
    filter === "All"
      ? data.skills
      : data.skills.filter((skill: Skill) => skill.category === filter);

  return (
    <Section id="skills" className="bg-transparent dark:bg-transparent py-32 min-h-fit">
      <SectionTitle>My Skills</SectionTitle>
      <motion.div
        className="mb-8 flex justify-center"
        variants={staggerChildren(0.1)}
        initial="initial"
        animate="animate"
      >
        <div className="skill-tabs glass-effect p-1 rounded-full inline-flex my-8 overflow-x-scroll">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                filter === category
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-items-center"
        variants={staggerChildren(0.1)}
        initial="initial"
        animate="animate"
      >
        {filteredSkills.map((skill: Skill, index: number) => (
          <SkillBadge key={index} name={skill.name} />
        ))}
      </motion.div>
    </Section>
  );
};

export default Skills;
