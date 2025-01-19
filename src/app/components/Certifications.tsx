"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Section, { SectionTitle } from "./shared/Section";
import Card from "./shared/Card";
import data from "../../data/portfolio-data.json";
import { staggerChildren } from "../utils/animations";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Certifications = () => {
  const [swiper, setSwiper] = useState(null);
  const itemsPerRow = 3;
  const rowsToShow = 2;
  const totalItemsToShow = itemsPerRow * rowsToShow;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <Section id="certifications" className="bg-transparent dark:bg-transparent py-32">
      <SectionTitle>Certifications</SectionTitle>
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
          {data.certifications.map((cert, index) => (
            <SwiperSlide key={index}>
              <Card
                title={cert.title}
                description={cert.provider}
                image="/placeholder.svg?height=300&width=400"
                link={cert.link}
                date={cert.date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Section>
  );
};

export default Certifications;
