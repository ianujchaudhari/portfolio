"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Section, { SectionTitle } from "./shared/Section";
import Card from "./shared/Card";
import { staggerChildren } from "../utils/animations";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Define the Blog type to match the database schema
type Blog = {
  _id: string;
  title: string;
  link: string;
  summary: string;
  thumbnail: string;
  publishDate: string;
};

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]); // Store fetched blogs
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]); // Store filtered blogs
  const [, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await response.json();
        setBlogs(data);
        setFilteredBlogs(data); // Initialize filtered blogs with all blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.publishDate.includes(searchTerm)
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  return (
    <Section id="blogs" className="bg-transparent dark:bg-transparent py-32">
      <SectionTitle>My Writings</SectionTitle>
      <div className="my-16 max-w-md mx-auto">
        <div className="search relative">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-2 pl-10 pr-4 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
        </div>
      </div>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
          {filteredBlogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <Card
                title={blog.title}
                description={blog.summary}
                image={
                  blog.thumbnail || "/placeholder.svg?height=300&width=400"
                }
                link={blog.link}
                date={blog.publishDate}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Section>
  );
};

export default Blogs;
