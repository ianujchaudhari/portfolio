"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import Section from "./shared/Section";
import { fadeInUp } from "../utils/animations";
import useGeneralInfo from "../../hooks/useGeneralInfo";
import Loader from "../components/Loader";

// Define types for positions
type Position = { x: number; y: number };

// Helper function to generate a random integer within a range
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to check if two positions are within a certain "buffer" distance
function isTooClose(posA: Position, posB: Position, buffer: number): boolean {
  const dx = posA.x - posB.x;
  const dy = posA.y - posB.y;
  return Math.sqrt(dx * dx + dy * dy) < buffer;
}

// Generate a non-overlapping position
function generateNonOverlappingPos(
  usedPositions: Position[],
  buffer: number = 10
): Position {
  let tries = 0;
  while (tries < 50) {
    const x = Math.random() * 100; // 0 to 100%
    const y = Math.random() * 100;
    const overlap = usedPositions.some((pos) =>
      isTooClose({ x, y }, pos, buffer)
    );
    if (!overlap) {
      return { x, y };
    }
    tries++;
  }
  // If we fail to find a non-overlapping spot, just return something random
  return { x: Math.random() * 100, y: Math.random() * 100 };
}

const quotes = [
  "Where code meets creativity, magic happens",
  "Innovate. Create. Inspire.",
  "Turning ideas into reality",
  "Building the future, one line at a time",
  "Embracing the power of technology",
  "Solving problems with elegant solutions",
  "Driving transformation through resilient code.",
  "Harnessing the cloud to elevate possibilities.",
  "Transforming concepts into code",
  "Empowering through innovation",
];

const Hero = () => {
  // Define type for floating quotes

  const { generalInfo, loading } = useGeneralInfo();

  type FloatingQuote = {
    quote: string;
    fontSize: number;
    initialX: string;
    initialY: string;
    finalX: string;
    finalY: string;
    duration: number;
  };

  const [floatingQuotes, setFloatingQuotes] = useState<FloatingQuote[]>([]);

  useEffect(() => {
    const usedPositions: Position[] = [];
    const quoteSettings = quotes.map((quote): FloatingQuote => {
      const fontSize = randomInt(20, 34);

      // Choose a random start corner
      const corners: Position[] = [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
      ];
      const startCornerIndex = randomInt(0, corners.length - 1);
      const initialPos = corners[startCornerIndex];

      // Generate a unique final position (non-overlapping)
      const finalPos = generateNonOverlappingPos(usedPositions, 10);
      usedPositions.push(finalPos);

      // Random duration between 15s and 25s
      const duration = randomInt(15, 25);

      return {
        quote,
        fontSize,
        initialX: `${initialPos.x}%`,
        initialY: `${initialPos.y}%`,
        finalX: `${finalPos.x}%`,
        finalY: `${finalPos.y}%`,
        duration,
      };
    });

    setFloatingQuotes(quoteSettings);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!generalInfo) {
    return <div>Error loading data</div>;
  }

  return (
    <Section
      id="hero"
      className="relative overflow-hidden animated-bg text-white"
    >
      {/* Floating Quotes */}
      {floatingQuotes.map((item, index) => (
        <motion.div
          key={index}
          className="absolute w-full h-full text-white opacity-10 pointer-events-none"
          style={{ fontSize: `${item.fontSize}px` }}
          initial={{ x: item.initialX, y: item.initialY }}
          animate={{ x: item.finalX, y: item.finalY }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          {item.quote}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="container relative z-10 mx-auto px-6 gap-6 text-center"
        {...fadeInUp}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <Image
            src={"/avatar.JPG"}
            alt="Anuj Chaudhari"
            width={200}
            height={200}
            className="mx-auto mb-8 rounded-full border-4 border-white shadow-lg"
          />
        </motion.div>

        <motion.h1
          className="mb-8 text-5xl font-bold text-shadow-strong"
          {...fadeInUp}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text text-nowrap">{generalInfo.name}</span>
        </motion.h1>

        <motion.p className="mb-12 text-2xl text-shadow-strong" {...fadeInUp}>
          {generalInfo.title}
        </motion.p>

        <motion.div
          className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
          {...fadeInUp}
        >
          <a
            href="#projects"
            className="glowing-border border-2 border-white bg-transparent px-8 py-3 rounded-full text-base font-semibold text-white hover:bg-white transition-colors hover-lift"
          >
            View My Work
          </a>
          <a
            href={generalInfo.resumeURL}
            className="glowing-border border-2 border-white bg-transparent px-8 py-3 rounded-full text-base font-semibold text-white hover:bg-white  transition-colors hover-lift"
            download
            target="_blank"
          >
            Download CV
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <FaArrowDown className="text-4xl" />
      </motion.div>
    </Section>
  );
};

export default Hero;
