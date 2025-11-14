"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Github, Eye } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Mateen's ChatBot",
    description:
      "An AI-powered chatbot web application that provides real-time responses using OpenAI's GPT-3.5 API with a sleek and responsive design.",
    image: "/chatbot.png",
    color: "#FF6F61",
    link: "https://chatbot-abdulmateen.vercel.app/",
    github: "https://github.com/MateenSohail-coder/chatbot-abdulmateen.git",
    tags: ["Next.js", "React", "Tailwind", "Animation", "Api Integration"],
  },
  {
    title: "Photographer portfolio",
    description:
      "A sleek and modern portfolio website for photographers to showcase their work with dynamic galleries and smooth animations.",
    image: "/photographer.png",
    color: "#CCCCCC",
    link: "https://jassicaphotograpy.vercel.app/",
    github: "https://github.com/MateenSohail-coder/Jassicaphotograpy.git",
    tags: [
      "Next.js",
      "React",
      "Tailwind",
      "Animation",
      "CTA",
      "Rest api",
      "Image gallery",
      "Search engine",
    ],
  },
  {
    title: "Linkhub",
    description:
      "Developed a responsive Linkhub web app that lets users create personalized link pages with authentication and custom themes.",
    image: "/linkhub.png",
    color: "#0D47A1",
    link: "https://linkhub-mauve-six.vercel.app/",
    github: "https://github.com/MateenSohail-coder/linkhub.git",
    tags: [
      "MongoDB",
      "Node.js",
      "express js",
      "Api",
      "React",
      "Nextjs",
      "Framer-Motion",
      "Authentication",
      "CTA",
      "JWT tokens",
    ],
  },
  {
    title: "Weather App",
    description:
      "A sleek weather application that provides real-time forecasts using OpenWeather API with a clean, responsive UI.",
    image: "/weather.png",
    color: "#6A0DAD",
    link: "https://weather-app-alpha-orcin-37.vercel.app/",
    github: "https://github.com/MateenSohail-coder/Weather_App.git",
    tags: [
      "React",
      "Nextjs",
      "Tailwindcss",
      "Axios",
      "Api Integration",
      "Search engine",
    ],
  },
];

export default function Project() {
  const [premium, setpremium] = useState(false);
  return (
    <section className="py-20 bg-white scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2
          className="
            text-4xl md:text-5xl text-stroke font-anton-sc font-extrabold text-gray-900 mb-16
            relative flex items-center justify-center
            before:content-[''] before:text-center before:mx-auto before:relative before:right-0 before:bottom-0 before:h-2 before:bg-blue-600 before:w-1/3 before:rounded-2xl
            after:content-[''] after:text-center after:mx-auto after:relative after:left-0 after:bottom-0 after:h-2 after:bg-blue-600 after:w-1/3 after:rounded-2xl
            mx-auto text-center
          "
        >
          Projects
        </h2>

        {/* Projects List */}
        <div id="projects" className="flex flex-col gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-white/90 via-[#e8f0ff]/80 to-[#d8e0ff]/70 flex flex-col md:flex-row w-full gap-6 md:gap-8 items-center rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 backdrop-blur-sm ${
                premium ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              {/* Left: Image & Title */}
              <div className="w-full md:w-[35%] flex flex-col items-start">
                <h3 className="text-2xl font-bold text-[#225ac0] mb-3 text-center md:text-left w-full">
                  {project.title}
                </h3>
                <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-blue-500 shadow-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right: Description, Tech & Links */}
              <div className="flex flex-col justify-between w-full md:w-[65%] space-y-4">
                <div>
                  <p className="text-gray-800 font-semibold text-xl mb-2">
                    {project.title}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      style={{
                        backgroundColor: project.color,
                        color: "#ffffff", // optional: adjust text color for contrast
                      }}
                      className="font-semibold hover:opacity-80 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center md:justify-start justify-center md:w-auto w-full gap-3 mt-3">
                  {/* Live Demo */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:w-fit w-full gap-2 px-4 py-2 rounded-3xl bg-[#225ac0] text-white font-semibold hover:bg-[#1a4da0] transition duration-200 shadow-md"
                  >
                    <Eye className="w-5 h-5" />
                    Live Demo
                  </a>

                  {/* GitHub */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center md:w-fit w-full justify-center gap-2 px-4 py-2 rounded-3xl border-2 border-[#225ac0] text-[#225ac0] font-semibold hover:bg-[#225ac0] hover:text-white transition duration-200 shadow-md"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
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
