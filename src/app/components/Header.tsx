"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeProvider";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-screen z-50 transition-all overflow-x-hidden duration-300 ${
        isScrolled ? "glass-effect shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className=" mx-auto md:px-6 py-4 flex max-w-full  justify-around md:justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-semibold text-[#333333] dark:text-white text-nowrap">
            Anuj Chaudhari
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          <div className="tabs bg-transparent shadow-none dark:text-white">
            <input type="radio" id="radio-about" name="tabs" defaultChecked />
            <label
              className="tab w-20"
              htmlFor="radio-about"
              onClick={() => {
                const section = document.getElementById("about");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              About
            </label>
            <input type="radio" id="radio-skills" name="tabs" />
            <label
              className="tab w-20"
              htmlFor="radio-skills"
              onClick={() => {
                const section = document.getElementById("skills");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Skills
            </label>
            <input type="radio" id="radio-projects" name="tabs" />
            <label
              className="tab w-20"
              htmlFor="radio-projects"
              onClick={() => {
                const section = document.getElementById("projects");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Projects
            </label>
            <input type="radio" id="radio-blogs" name="tabs" />
            <label
              className="tab w-20"
              htmlFor="radio-blogs"
              onClick={() => {
                const section = document.getElementById("blogs");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Blogs
            </label>
            <span className="glider"></span>
          </div>

          <label className="switch scale-75">
            <span className="sun">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="#ffd43b">
                  <circle r="5" cy="12" cx="12"></circle>
                  <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                </g>
              </svg>
            </span>
            <span className="moon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
              </svg>
            </span>
            <input
              type="checkbox"
              className="input"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
