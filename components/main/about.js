"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Code, BookOpen, Heart, Calendar, GraduationCap, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const aboutData = {
  story: {
    title: "My Journey",
    icon: <BookOpen size={18} />,
    timeline: [
      {
        year: "2022",
        title: "The Beginning",
        description:
          "Started my coding journey with C language basics at Metric High School.",
        icon: <Code size={16} />,
      },
      {
        year: "2023",
        title: "Foundations",
        description:
          "Deepened understanding of programming logic and algorithms.",
        icon: <GraduationCap size={16} />,
      },
      {
        year: "2024",
        title: "Web Development",
        description:
          "Dove into HTML, CSS, and JS. Built my first personal website.",
        icon: <Briefcase size={16} />,
      },
      {
        year: "2025",
        title: "Full Stack",
        description:
          "Mastering React, Next.js, Node.js, and databases. Building complex apps.",
        icon: <Code size={16} />,
      },
      {
        year: "2025 - onward",
        title: "Virtual University",
        description:
          "Pursuing BSCS at Virtual University to further elevate my engineering skills.",
        icon: <GraduationCap size={16} />,
      },
    ],
  },
  skills: {
    title: "Expertise",
    icon: <Code size={18} />,
    content:
      "I specialize in building modern, responsive web applications. My core stack includes React, Next.js, and Tailwind CSS for the frontend, paired with Node.js for robust backend solutions. I have a passion for smooth animations using GSAP and creating intuitive user experiences.",
  },
  hobbies: {
    title: "Interests",
    icon: <Heart size={18} />,
    content:
      "I’m deeply interested in artificial intelligence and its role in enhancing modern web applications. As a MERN stack developer, I enjoy exploring how AI can improve user experiences, automate complex tasks, and add intelligent features to full-stack projects. I’m passionate about blending AI with web development to build smarter, more efficient digital solutions.",
  },
};

const stats = [
  { label: "Years Experience", value: "1+" },
  { label: "Projects Built", value: "10+" },
  { label: "Happy Clients", value: "5+" },
];

export default function About() {
  const aboutRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [activeTab, setActiveTab] = useState("story");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section Title Animation
      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Image Animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Content Animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Stats Animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={aboutRef}
      className="py-16 md:py-24 bg-background relative overflow-hidden scroll-mt-28"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[-5%] w-40 h-40 md:w-64 md:h-64 bg-primary/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-[-5%] w-60 h-60 md:w-80 md:h-80 bg-accent/20 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16 section-title">
          <h2 className="text-3xl gfont md:text-5xl font-extrabold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-16 md:w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div
          id="about"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
        >
          {/* Left Column: Image & Stats */}
          <div
            className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col gap-8"
            ref={imageRef}
          >
            <div className="relative group max-w-sm mx-auto md:max-w-none w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-card aspect-[4/5]">
                <Image
                  src="/about.avif"
                  alt="Abdul Mateen"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-antonio text-xl">
                    Web Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-container grid grid-cols-2 gap-3 md:gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`stat-item bg-card p-3 md:p-4 rounded-xl shadow-md border border-border text-center ${
                    index === 2 ? "col-span-2" : ""
                  }`}
                >
                  <div className="text-2xl md:text-3xl gfont font-bold text-primary mb-1 font-anton-sc">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content & Tabs */}
          <div
            className="col-span-1 md:col-span-7 lg:col-span-8 w-full"
            ref={contentRef}
          >
            {/* Tabs Navigation */}
            <div className="grid grid-cols-3 gap-2 mb-6 md:mb-8 bg-card/50 backdrop-blur-sm p-1.5 rounded-2xl md:rounded-full border border-border w-full">
              {Object.keys(aboutData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex items-center justify-center gap-2 px-2 py-2.5 rounded-xl md:rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-all duration-300 w-full
                    ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground shadow-lg scale-100"
                        : "text-muted-foreground hover:bg-card hover:text-primary"
                    }
                  `}
                >
                  <span className="scale-75 md:scale-100">
                    {aboutData[tab].icon}
                  </span>
                  <span className="hidden sm:inline">
                    {aboutData[tab].title}
                  </span>
                  <span className="sm:hidden">
                    {aboutData[tab].title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-card/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-white/5 min-h-[300px] md:min-h-[400px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />

              <h3 className="text-2xl md:text-3xl font-extrabold gfont text-foreground mb-8 flex items-center gap-3 relative z-10">
                <span className="p-3 bg-primary/10 text-primary rounded-xl shadow-inner">
                  {aboutData[activeTab].icon}
                </span>
                {aboutData[activeTab].title}
              </h3>

              {activeTab === "story" ? (
                <div className="relative border-l-2 border-primary/20 pl-6 md:pl-8 space-y-10">
                  {aboutData.story.timeline.map((item, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-background border-4 border-primary group-hover:scale-125 group-hover:bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                        <span className="text-primary font-bold gfont text-lg md:text-xl">
                          {item.year}
                        </span>
                        <h4 className="text-foreground font-bold text-lg md:text-xl font-antonio tracking-wide">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-1 border-l-2 border-transparent group-hover:border-primary/30 transition-all duration-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-lg text-muted-foreground leading-loose font-antic text-justify">
                    {aboutData[activeTab].content}
                  </p>
                  {activeTab === "skills" && (
                    <div className="flex flex-wrap gap-3 mt-8">
                      {[
                        "React",
                        "Next.js",
                        "Tailwind CSS",
                        "Node.js",
                        "GSAP",
                        "MongoDB",
                        "Three.js",
                        "TypeScript",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-card border border-primary/20 text-foreground rounded-xl font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
