"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Html5Icon from "../svgs/html";
import Css3Icon from "../svgs/css";
import NodejsIcon from "../svgs/node";
import MongodbIcon from "../svgs/mongodb";
import GsapIcon from "../svgs/gsap";
import ExpressIcon from "../svgs/express";
import TailwindCSSIcon from "../svgs/tailwin";
import ReactIcon from "../svgs/react";
import NextjsIcon from "../svgs/next";
import JavaScriptIcon from "../svgs/js";
import GitBranchIcon from "../svgs/git";
import GithubIcon from "../svgs/github";

const skills = [
  { name: "HTML", level: 90, svg: <Html5Icon />, color: "#E34F26" },
  { name: "CSS", level: 90, svg: <Css3Icon />, color: "#1572B6" },
  { name: "JavaScript", level: 90, svg: <JavaScriptIcon />, color: "#F7DF1E" },
  { name: "React", level: 85, svg: <ReactIcon />, color: "#61DAFB" },
  { name: "Next.js", level: 80, svg: <NextjsIcon />, color: "black" },
  { name: "Mongodb", level: 80, svg: <MongodbIcon />, color: "#47A248" },
  { name: "Github", level: 89, svg: <GithubIcon />, color: "#000000" },
  {
    name: "Tailwind CSS",
    level: 75,
    svg: <TailwindCSSIcon />,
    color: "#38B2AC",
  },
  { name: "GSAP", level: 70, svg: <GsapIcon />, color: "#88CE02" },
  { name: "Git", level: 80, svg: <GitBranchIcon />, color: "#F05032" },

  { name: "Node.js", level: 80, svg: <NodejsIcon />, color: "#339933" },
  { name: "Express.js", level: 75, svg: <ExpressIcon />, color: "#000000" },
];
export default function Skills() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const circumference = 16 * 2 * Math.PI;

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Width of one set of items (since we duplicate 3 times)
    const row1SetWidth = row1Ref.current.scrollWidth / 3;
    const row2SetWidth = row2Ref.current.scrollWidth / 3;

    // Animate row1 scrolling left (negative x)
    gsap.fromTo(
      row1Ref.current,
      { x: 0 },
      {
        x: -row1SetWidth,
        duration: 30,
        ease: "linear",
        repeat: -1,
      }
    );

    // Animate row2 scrolling left (negative x)
    gsap.fromTo(
      row2Ref.current,
      { x: 0 },
      {
        x: -row1SetWidth,
        duration: 20,
        ease: "linear",
        repeat: -1, // infinite loop
      }
    );
  }, []);
  function hexToRgba(hex, alpha) {
    // Remove the # if present
    hex = hex.replace("#", "");

    // Parse r,g,b values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Split skills into two rows
  const row1 = skills.slice(0, 3);
  const row2 = skills.slice(3);

  const renderSkillCard = (skill, index) => (
    <div
      key={`${skill.name}-${index}`}
      style={{
        border: `5px double ${skill.color}`,
        backgroundColor: `${hexToRgba(skill.color, 0.1)}`,
      }}
      className="bg-white rounded-3xl py-3 px-6 sm:py-4 sm:px-10 shadow-md hover:shadow-lg transition-shadow duration-300 text-center mx-2 sm:mx-4 flex-shrink-0"
    >
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-3 sm:mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <circle
            className="progress-circle"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={skill.color || "#000"}
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset:
                circumference - (skill.level / 100) * circumference,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 opacity-70 flex items-center justify-center">
            {skill.svg}
          </div>
          <div
            className="text-xs sm:text-sm font-bold"
            style={{ color: skill.color || "#000" }}
          >
            {skill.level}%
          </div>
        </div>
      </div>

      <h3
        className="text-lg sm:text-2xl font-anton-sc"
        style={{ color: skill.color || "#000" }}
      >
        {skill.name}
      </h3>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-4xl font-anton-sc text-stroke md:text-5xl font-extrabold text-center text-gray-900 mb-8 relative flex items-center justify-center
  before:content-[''] before:text-center before:mx-auto before:relative before:right-0 before:bottom-0 before:h-2 before:bg-blue-600 before:w-1/3 before:rounded-2xl
  after:content-[''] after:text-center after:mx-auto after:relative after:left-0 after:bottom-0 after:h-2 after:bg-blue-600 after:w-1/3 after:rounded-2xl
  mx-auto"
        >
          Skills
        </h2>
        <p className="text-center text-gray-600 mb-16">
          Skills Enhancement: Focused on applying industry best practices,
          modular coding, and Git version control throughout all projects to
          rapidly enhance job-ready skills.
        </p>

        <div className="space-y-8">
          {/* Row 1: Scroll Left */}
          <div className="overflow-hidden">
            <div
              className="flex w-max"
              ref={row1Ref}
              style={{ willChange: "transform" }}
            >
              {[...row1, ...row1, ...row1].map(renderSkillCard)}
            </div>
          </div>

          {/* Row 2: Scroll Right */}
          <div className="overflow-hidden">
            <div
              className="flex w-max"
              ref={row2Ref}
              style={{ willChange: "transform" }}
            >
              {[...row2, ...row2, ...row2].map(renderSkillCard)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
