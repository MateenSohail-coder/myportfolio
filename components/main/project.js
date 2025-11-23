"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Github, Eye, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Mateen's ChatBot",
    description:
      "An AI-powered chatbot web application that provides real-time responses using OpenAI's GPT-3.5 API. Features a sleek, responsive design with seamless API integration for an intuitive user experience.",
    image: "/chat.png",
    color: "#FF5733",
    link: "https://chatbot-abdulmateen.vercel.app/",
    github: "https://github.com/MateenSohail-coder/chatbot-abdulmateen.git",
    tags: ["Next.js", "React", "Tailwind", "OpenAI API"],
    premium: true,
  },
  {
    title: "Photographer Portfolio",
    description:
      "A visually stunning portfolio website designed for photographers. Showcases work through dynamic galleries, smooth transitions, and a modern aesthetic that puts the visual content front and center.",
    image: "/photographer.png",
    color: "#CCCCCC",
    link: "https://jassicaphotograpy.vercel.app/",
    github: "https://github.com/MateenSohail-coder/Jassicaphotograpy.git",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    premium: false,
  },
  {
    title: "Linkhub",
    description:
      "A comprehensive link management platform. Users can create personalized link pages with custom themes. Features robust authentication, dashboard analytics, and a user-friendly interface.",
    image: "/linkhub.png",
    color: "#0D47A1",
    link: "https://linkhub-mauve-six.vercel.app/",
    github: "https://github.com/MateenSohail-coder/linkhub.git",
    tags: ["MERN Stack", "MongoDB", "Express", "Node.js"],
    premium: true,
  },
  {
    title: "Weather App",
    description:
      "A sleek weather application delivering real-time forecasts. Utilizes the OpenWeather API to provide accurate data with a clean, minimalist UI that adapts to current weather conditions.",
    image: "/weather.png",
    color: "#6A0DAD",
    link: "https://weather-app-alpha-orcin-37.vercel.app/",
    github: "https://github.com/MateenSohail-coder/Weather_App.git",
    tags: ["React", "Tailwind", "Axios", "OpenWeather API"],
    premium: false,
  },
];

export default function Project() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Projects Animation
      const projectCards = gsap.utils.toArray(".project-card");
      projectCards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 bg-gray-50 relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-anton-sc font-extrabold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto font-antic">
            A selection of my recent work, showcasing my technical skills and creative solutions.
          </p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-16 items-center`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 aspect-video bg-gray-100">
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Links on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/20 backdrop-blur-sm">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full text-gray-900 hover:text-blue-600 hover:scale-110 transition-all shadow-lg"
                      title="View Live"
                    >
                      <ExternalLink size={24} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full text-gray-900 hover:text-blue-600 hover:scale-110 transition-all shadow-lg"
                      title="View Code"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-blue-600 font-bold font-anton-sc text-lg">
                    0{index + 1}
                  </span>
                  <div className="h-px w-12 bg-blue-600" />
                  {project.premium && (
                    <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 border-none">
                      Premium
                    </Badge>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold font-antonio text-gray-900 mb-6">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-8 font-antic">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                  >
                    <Eye size={18} /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 border border-gray-200 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <Github size={18} /> Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
