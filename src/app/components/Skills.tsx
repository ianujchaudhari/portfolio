"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section, { SectionTitle } from "./shared/Section";
import { fadeInUp, staggerChildren } from "../utils/animations";
import {
  Code,
  Server,
  Database,
  Cloud,
  Layers,
  Brain,
  Layout,
  Terminal,
} from "lucide-react";

type CategoryIcons = {
  [key: string]: React.ComponentType<{ className?: string }>;
};

// Define a type for skill data
type Skill = {
  _id: string;
  name: string;
  category: string;
};

const categoryIcons: CategoryIcons = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  DevOps: Layers,
  General: Code,
  Cloud: Cloud,
  AI: Brain,
};

// Define props type for SkillBadge
type SkillBadgeProps = {
  name: string;
  category: string;
};

const SkillBadge = ({ name, category }: SkillBadgeProps) => {
  const Icon = categoryIcons[category] || Terminal;
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
  const [skills, setSkills] = useState<Skill[]>([]); // Store fetched skills
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data: Skill[] = await response.json();
        setSkills(data);

        // Extract unique categories and set them
        const uniqueCategories = [
          "All",
          ...new Set(data.map((skill: Skill) => skill.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills =
    filter === "All"
      ? skills
      : skills.filter((skill: Skill) => skill.category === filter);

  return (
    <Section
      id="skills"
      className="bg-transparent dark:bg-transparent py-32 min-h-fit"
    >
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
        {
        filteredSkills.map((skill: Skill) => (
          <SkillBadge
            key={skill._id}
            name={skill.name}
            category={skill.category}
          />
        ))}
      </motion.div>
    </Section>
  );
};

export default Skills;
