"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const aboutData = {
  story: {
    title: "My Story",
    timeline: [
      {
        year: "2022",
        event: "Started learning about the basics of coding.",
        edu: "At Metric (part 1) High School.",
      },
      {
        year: "2023",
        event: "Fully understand what is coding in my school using C language.",
        edu: "At Metric (part 2) Governement High School.",
      },
      {
        year: "2024",
        event:
          "Dive into web development, learning HTML, CSS, and JavaScript. Built my first personal website.",
        edu: "At Inter (part 1) Governement comprehensive college.",
      },
      {
        year: "2025",
        event:
          "Fully understand web development using React.js and Next.js. Including backend using Node.js and databases.",
        edu: "At Inter (part 2) Governement comprehensive college.",
      },
      {
        year: new Date().getFullYear(),
        event:
          "Now I am focusing on improving my skills in full-stack development and exploring new technologies.And continue my studies at university level by doing BSCS",
        edu: "Will start in At BSCS at University.",
      },
    ],
  },
  skills: {
    title: "What I Do",
    content:
      "I specialize in front-end development using React, Next.js, and Tailwind CSS. I'm also proficient in back-end technologies like Node.js and databases. I love working with GSAP for animations and creating interactive user interfaces.",
  },
  hobbies: {
    title: "Beyond Code",
    content:
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities. I believe in continuous learning and staying up-to-date with the latest trends in web development.",
  },
};

const stats = [
  { label: "Years of Experience", value: 1 },
  { label: "Projects Completed", value: 10 },
];

export default function About() {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const counterRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("story");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(imageRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      textRef.current,
      {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    );

    // Additional scroll animation for section background color change
    gsap.to(aboutRef.current, {
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      backgroundColor: "#f0f9ff",
      ease: "none",
    });

    // Interactive image hover effect
    const image = imageRef.current;
    image.addEventListener("mouseenter", () => {
      gsap.to(image, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    image.addEventListener("mouseleave", () => {
      gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
    });

    // Mouse follow effect on background
    const bg = aboutRef.current;
    const handleMouseMove = (e) => {
      const rect = bg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(bg, {
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(59, 130, 246,0.3) 0%, transparent 50%)`,
        duration: 0.5,
      });
    };
    bg.addEventListener("mousemove", handleMouseMove);

    return () => {
      image.removeEventListener("mouseenter", () => {});
      image.removeEventListener("mouseleave", () => {});
      bg.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate counters on scroll
  useEffect(() => {
    gsap.fromTo(
      counterRefs.current,
      { textContent: 0 },
      {
        textContent: (i) => stats[i].value,
        duration: 0,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        stagger: 0.2,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // Typing effect for content
  useEffect(() => {
    if (activeTab !== "story") {
      setDisplayedText("");
      setIsTyping(true);
      const text = aboutData[activeTab].content;
      let i = 0;
      const typeInterval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(typeInterval);
    } else {
      setDisplayedText("");
      setIsTyping(false);
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  };

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-20 bg-white transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="
  text-4xl md:text-5xl text-stroke font-anton-sc font-extrabold text-gray-900 mb-16
  relative flex items-center justify-center
  before:content-[''] before:text-center before:mx-auto before:relative before:right-0 before:bottom-0 before:h-2 before:bg-blue-600 before:w-1/3 before:rounded-2xl
  after:content-[''] after:text-center after:mx-auto after:relative after:left-0 after:bottom-0 after:h-2 after:bg-blue-600 after:w-1/3 after:rounded-2xl
  mx-auto text-center
"
        >
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={imageRef} className="md:w-1/3 cursor-pointer">
            <div className="w-64 h-64 bg-gray-100 rounded-full mx-auto flex items-center justify-center shadow-lg overflow-hidden">
              <Image src="../am.jpg" alt="" className="bg-cover" fill="true" />
            </div>
          </div>
          <div ref={textRef} className="md:w-2/3">
            <div className="flex space-x-4 mb-6">
              {Object.keys(aboutData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {aboutData[tab].title}
                </button>
              ))}
            </div>
            <h3 className="text-2xl font-semibold font-antonio text-gray-900 mb-4">
              {aboutData[activeTab].title}
            </h3>
            {activeTab === "story" ? (
              <div className="space-y-4">
                {aboutData.story.timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-16 text-blue-600 font-bold">
                      {item.year}
                    </div>
                    <div className="flex-2 text-gray-700">
                      <p>{item.event}</p>
                      <p className="text-blue-500 font-bold">{item.edu}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg text-gray-700">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            )}
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 justify-between gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                ref={(el) => (counterRefs.current[index] = el)}
                className="text-4xl font-bold text-blue-600"
              >
                0
              </div>
              <div className="text-lg text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
