"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Section, { SectionTitle } from "./shared/Section";
import data from "../../data/portfolio-data.json";
import { fadeInUp, staggerChildren } from "../utils/animations";
import { IoIosSend } from "react-icons/io";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Section id="contact" className="bg-transparent dark:bg-transparent">
      <SectionTitle>Let's Connect</SectionTitle>
      <div className="w-full max-w-7xl gap-4 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.div
          className="flex flex-col lg:flex-row gap-8 justify-between items-center"
          variants={staggerChildren(0.1)}
          initial="initial"
          animate="animate"
        >
          {/* Contact Form */}
          <motion.div className="w-full mb-8 lg:mb-0" variants={fadeInUp}>
            <form
              onSubmit={handleSubmit}
              className="glass-form p-8 rounded-lg shadow-lg py-16"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent glowing-border"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent glowing-border"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-700 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent glowing-border"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full glowing-border inline-flex justify-center gap-1 items-center text-gray-700 px-4 py-2 rounded-md font-semibold"
                whileHover={{}}
                whileTap={{}}
              >
               <p className=" text-lg text-inherit">Send</p><IoIosSend className="h-5 w-5 text-inherit" />
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="w-fit md:ml-16 flex justify-center lg:justify-end"
            variants={fadeInUp}
          >
            <div className="glass-form p-4 sm:p-6 rounded-full shadow-lg bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 backdrop-filter backdrop-blur-lg ">
              <div className="flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-6">
                {[
                  { icon: FaGithub, link: data.social.github },
                  { icon: FaXTwitter, link: data.social.twitter },
                  { icon: FaDiscord, link: data.social.discord },
                  { icon: FaLinkedin, link: data.social.linkedin },
                  { icon: TbBrandLeetcode, link: data.social.leetcode },
                  { icon: MdEmail, link: `mailto:${data.social.email}` },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button glowing-border flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
