"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Section, { SectionTitle } from "./shared/Section";
import Card from "./shared/Card";
import { staggerChildren } from "../utils/animations";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper"; // Import the Swiper type

type Project = {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  github: string;
  demo: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Store fetched projects
  const [ , setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Section id="projects" className="bg-transparent dark:bg-transparent py-32">
      <SectionTitle>My Projects</SectionTitle>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24"
        variants={staggerChildren(0.1)}
        initial="initial"
        animate="animate"
      >
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project._id}>
              <Card
                title={project.title}
                description={project.description}
                image={project.thumbnail}
                link={project.demo || project.github}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Section>
  );
};

export default Projects;
