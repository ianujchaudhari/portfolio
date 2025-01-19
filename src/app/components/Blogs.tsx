'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Section, { SectionTitle } from './shared/Section'
import Card from './shared/Card'
import data from '../../data/portfolio-data.json'
import { staggerChildren } from '../utils/animations'
import type { Swiper as SwiperType } from 'swiper'; 

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBlogs, setFilteredBlogs] = useState(data.blogs)
  const [swiper, setSwiper] = useState(null)

  useEffect(() => {
    const filtered = data.blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.date.includes(searchTerm)
    )
    setFilteredBlogs(filtered)
  }, [searchTerm])

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);


  return (
    <Section id="blogs" className="bg-transparent dark:bg-transparent py-32">
      <SectionTitle>My Writings</SectionTitle>
      <div className="my-16 max-w-md mx-auto ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-2 pl-10 pr-4 rounded-full bg-white dark:bg-gray-800 border placeholder:px-8 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
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
          {filteredBlogs.map((blog, index) => (
            <SwiperSlide key={index}>
              <Card
                title={blog.title}
                description={blog.excerpt}
                image={blog.image || "/placeholder.svg?height=300&width=400"}
                link={blog.link}
                date={blog.date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Section>
  )
}

export default Blogs

