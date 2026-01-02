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
    title: "Linkhub",
    description:
      "A comprehensive link management platform. Users can create personalized link pages with custom themes. Features robust authentication, dashboard analytics, and a user-friendly interface.",
    image: "/linkhub.png",
    color: "#0D47A1",
    link: "https://linkhub-links.vercel.app/",
    github: "https://github.com/MateenSohail-coder/linkhub.git",
    tags: ["MERN Stack", "MongoDB", "Express", "Node.js"],
    premium: true,
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
      className="py-24 relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl gfont font-extrabold text-foreground mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-antic">
            A selection of my recent work, showcasing my technical skills and
            creative solutions.
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border aspect-video bg-muted">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
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
                      className="p-3 bg-card rounded-full text-foreground hover:text-primary hover:scale-110 transition-all shadow-lg"
                      title="View Live"
                    >
                      <ExternalLink size={24} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-card rounded-full text-foreground hover:text-primary hover:scale-110 transition-all shadow-lg"
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
                  <span className="text-primary font-bold font-anton-sc text-lg">
                    0{index + 1}
                  </span>
                  <div className="h-px w-12 bg-primary" />
                  {project.premium && (
                    <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 border-none">
                      Premium
                    </Badge>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold font-antonio text-foreground mb-6">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-antic">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20"
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
                    className="flex items-center gap-2 px-6 py-3 bg-primary  text-sm sm:text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    <Eye size={18} />{" "}
                    <div className="hidden sm:inline">Live Demo</div>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-card    text-sm sm:text-foreground border border-border rounded-full font-bold hover:bg-accent hover:border-accent transition-all"
                  >
                    <Github size={18} />{" "}
                    <div className="hidden sm:inline">Source Code</div>
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
