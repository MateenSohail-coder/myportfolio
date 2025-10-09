"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project One",
    description: "A cool project that does amazing things.",
    link: "#",
  },
  {
    title: "Project Two",
    description: "Another awesome project with great features.",
    link: "#",
  },
  {
    title: "Project Three",
    description: "A project showcasing my skills and creativity.",
    link: "#",
  },
];

export default function Project() {
  const projectRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.from(cardRefs.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section id="projects" ref={projectRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-4xl font-anton-sc text-stroke md:text-5xl font-extrabold text-center text-gray-900 mb-16 relative flex items-center justify-center
  before:content-[''] before:text-center before:mx-auto before:relative before:right-0 before:bottom-0 before:h-2 before:bg-blue-600 before:w-1/3 before:rounded-2xl
  after:content-[''] after:text-center after:mx-auto after:relative after:left-0 after:bottom-0 after:h-2 after:bg-blue-600 after:w-1/3 after:rounded-2xl
  mx-auto "
        >
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {project.title}
              </h3>
              <div className="h-60 m-1 rounded-2xl w-full border border-blue-500"></div>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <a
                href={project.link}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
