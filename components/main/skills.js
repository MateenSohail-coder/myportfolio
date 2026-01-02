"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  frontend: [
    { name: "HTML5", icon: <Html5Icon className="w-full h-full" />, color: "#E34F26" },
    { name: "CSS3", icon: <Css3Icon className="w-full h-full" />, color: "#1572B6" },
    { name: "JavaScript", icon: <JavaScriptIcon className="w-full h-full" />, color: "#F7DF1E" },
    { name: "React", icon: <ReactIcon className="w-full h-full" />, color: "#61DAFB" },
    { name: "Next.js", icon: <NextjsIcon className="w-full h-full" />, color: "#000000" },
    { name: "Tailwind", icon: <TailwindCSSIcon className="w-full h-full" />, color: "#38B2AC" },
    { name: "GSAP", icon: <GsapIcon className="w-full h-full" />, color: "#88CE02" },
  ],
  backend: [
    { name: "Node.js", icon: <NodejsIcon className="w-full h-full" />, color: "#339933" },
    { name: "Express", icon: <ExpressIcon className="w-full h-full" />, color: "#000000" },
    { name: "MongoDB", icon: <MongodbIcon className="w-full h-full" />, color: "#47A248" },
  ],
  tools: [
    { name: "Git", icon: <GitBranchIcon className="w-full h-full" />, color: "#F05032" },
    { name: "GitHub", icon: <GithubIcon className="w-full h-full" />, color: "#181717" },
  ],
};

export default function Skills() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial Fade In
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Orbit Animations
      const orbits = [".orbit-ring-1", ".orbit-ring-2", ".orbit-ring-3"];
      const durations = [20, 30, 40]; // Different speeds for each ring

      orbits.forEach((orbit, i) => {
        gsap.to(orbit, {
          rotation: 360,
          duration: durations[i],
          repeat: -1,
          ease: "linear",
        });

        // Counter-rotate icons to keep them upright
        const icons = gsap.utils.toArray(`${orbit} .skill-icon-container`);
        gsap.to(icons, {
          rotation: -360,
          duration: durations[i],
          repeat: -1,
          ease: "linear",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause animation on hover
  const handleMouseEnter = () => {
    gsap.globalTimeline.pause();
  };

  const handleMouseLeave = () => {
    gsap.globalTimeline.play();
    setHoveredSkill(null);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20 bg-background relative overflow-hidden flex flex-col items-center md:justify-center scroll-mt-20"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 text-center gfont mb-12 md:mb-0">
        <h2 className="text-4xl hidden md:block md:text-6xl gfont  font-extrabold text-foreground mb-4 tracking-wider">
          Tech Ecosystem
        </h2>
        <h2 className="text-4xl md:text-6xl block md:hidden gfont  font-extrabold text-foreground mb-4 tracking-wider">
          My Core Expertise
        </h2>
        <p className="text-muted-foreground gfont text-lg max-w-xl mx-auto">
          A living universe of technologies revolving around my core expertise.
        </p>
      </div>

      {/* Desktop Orbital View */}
      <div
        ref={containerRef}
        className="hidden md:flex relative w-[900px] h-[900px] items-center justify-center scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform duration-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Core */}
        <div className="absolute z-20 w-32 h-32 bg-card rounded-full shadow-[0_0_50px_rgba(var(--primary),0.3)] flex items-center justify-center animate-pulse border border-primary/20">
          <div className="text-center gfont">
            <span className="block text-3xl font-bold text-foreground">AM</span>
            <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
              Developer
            </span>
          </div>
        </div>

        {/* Ring 1: Frontend */}
        <div className="orbit-ring-1 absolute w-[350px] h-[350px] border border-primary/40 rounded-full">
          {skillsData.frontend.map((skill, i) => {
            const angle = (i / skillsData.frontend.length) * 360;
            return (
              <div
                key={skill.name}
                className="skill-icon-container absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                style={{
                  transformOrigin: `50% 175px`, // Half of ring width (350/2)
                  transform: `rotate(${angle}deg) translateY(-175px)`,
                }}
              >
                <div
                  className="w-16 h-16 bg-card/80 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-sm rounded-full p-3 flex items-center justify-center hover:scale-125 hover:border-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300 cursor-pointer group"
                  onMouseEnter={() => setHoveredSkill(skill)}
                >
                  {skill.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ring 2: Backend */}
        <div className="orbit-ring-2 absolute w-[600px] h-[600px] border border-primary/30 rounded-full">
          {skillsData.backend.map((skill, i) => {
            const angle = (i / skillsData.backend.length) * 360;
            return (
              <div
                key={skill.name}
                className="skill-icon-container absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20"
                style={{
                  transformOrigin: `50% 300px`, // Half of ring width (600/2)
                  transform: `rotate(${angle}deg) translateY(-300px)`,
                }}
              >
                <div
                  className="w-20 h-20 bg-card/80 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-sm rounded-full p-4 flex items-center justify-center hover:scale-125 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(skill)}
                >
                  {skill.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ring 3: Tools */}
        <div className="orbit-ring-3 absolute w-[850px] h-[850px] border border-primary/20 rounded-full">
          {skillsData.tools.map((skill, i) => {
            const angle = (i / skillsData.tools.length) * 360;
            return (
              <div
                key={skill.name}
                className="skill-icon-container absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14"
                style={{
                  transformOrigin: `50% 425px`, // Half of ring width (850/2)
                  transform: `rotate(${angle}deg) translateY(-425px)`,
                }}
              >
                <div
                  className="w-14 h-14 bg-card/80 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-sm rounded-full p-3 flex items-center justify-center hover:scale-125 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(skill)}
                >
                  {skill.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Panel (Center Overlay) */}
        {hoveredSkill && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <div className="bg-card/90 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl p-6 rounded-2xl text-center min-w-[200px] animate-in fade-in zoom-in duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-2 font-antonio">
                {hoveredSkill.name}
              </h3>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary" style={{ width: "90%" }} />
              </div>
              <p className="text-primary text-sm font-bold">
                Expert Proficiency
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Galaxy Stream View */}
      <div className="md:hidden w-full px-6 mt-12 space-y-12 pb-20 relative z-20">
        {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
          <div
            key={category}
            className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: `${categoryIndex * 200}ms` }}
          >
            <h3 className="text-3xl font-extrabold text-foreground capitalize gfont flex items-center gap-4 relative">
              <span className="absolute -left-4 w-1 h-8 bg-primary rounded-r-full"></span>
              {category}
            </h3>
            <div className="grid grid-cols-2 xs:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group bg-card/60 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 p-2.5 bg-background/50 rounded-2xl shadow-inner border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                    {skill.icon}
                  </div>
                  <span className="text-foreground/90 font-bold text-sm font-antonio tracking-wide group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
