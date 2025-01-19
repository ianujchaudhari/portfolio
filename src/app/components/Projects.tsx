"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Section, { SectionTitle } from "./shared/Section";
import Card from "./shared/Card";
import data from "../../data/portfolio-data.json";
import { staggerChildren } from "../utils/animations";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper"; // Import the Swiper type

const Projects = () => {
  const [swiper, setSwiper] = useState(null);
  const itemsPerRow = 3;
  const rowsToShow = 2;
  const totalItemsToShow = itemsPerRow * rowsToShow;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

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
          {data.projects.map((project, index) => (
            <SwiperSlide key={index}>
              <Card
                title={project.title}
                description={project.description}
                image={project.image}
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
