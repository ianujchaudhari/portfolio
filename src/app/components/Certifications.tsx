"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Section, { SectionTitle } from "./shared/Section";
import Card from "./shared/Card";
import { staggerChildren } from "../utils/animations";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Certification = {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  thumbnail: string;
  credentialURL: string;
};

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]); // Store fetched certifications
  const [, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch("/api/certifications");
        if (!response.ok) {
          throw new Error("Failed to fetch certifications");
        }
        const data: Certification[] = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <Section
      id="certifications"
      className="bg-transparent dark:bg-transparent py-32"
    >
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
          {certifications.map((cert) => (
            <SwiperSlide key={cert._id}>
              <Card
                title={cert.name}
                description={cert.issuer}
                image={
                  cert.thumbnail || "/placeholder.svg?height=300&width=400"
                }
                link={cert.thumbnail}
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
