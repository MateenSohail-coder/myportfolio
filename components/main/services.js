"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    description:
      "Creating responsive and dynamic websites using modern technologies.",
    icon: "🌐",
    details:
      "I build fast, scalable web applications with React, Next.js, and Node.js. From e-commerce sites to complex web platforms, I ensure optimal performance and user experience.",
  },
  {
    title: "UI/UX Design",
    description:
      "Designing intuitive and beautiful user interfaces and experiences.",
    icon: "🎨",
    details:
      "Crafting user-centered designs that are both aesthetically pleasing and functionally superior. I use Figma, Adobe XD, and prototyping tools to bring ideas to life.",
  },
  {
    title: "Frontend Development",
    description: "Building interactive and engaging user interfaces.",
    icon: "💻",
    details:
      "Specializing in frontend technologies like React, Tailwind CSS, and GSAP to create seamless and dynamic user experiences that captivate users.",
  },
  {
    title: "Consulting",
    description:
      "Providing expert advice on technology and development strategies.",
    icon: "💡",
    details:
      "Offering strategic guidance on technology stack selection, architecture design, and development best practices. I help businesses optimize their digital presence.",
  },
  {
    title: "Portfolio Development",
    description:
      "Creating personalized portfolios to showcase skills and projects.",
    icon: "📁",
    details:
      "I design and develop custom portfolios that highlight your unique skills and projects, ensuring you stand out to potential employers or clients.",
  },
];

export default function Services() {
  const servicesRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    gsap.from(carouselRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section id="services" ref={servicesRef} className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-4xl font-anton-sc text-stroke md:text-5xl font-extrabold text-center text-gray-900 mb-16 relative flex items-center justify-center
          before:content-[''] before:text-center before:mx-auto before:relative before:right-0 before:bottom-0 before:h-2 before:bg-blue-600 before:w-1/3 before:rounded-2xl
          after:content-[''] after:text-center after:mx-auto after:relative after:left-0 after:bottom-0 after:h-2 after:bg-blue-600 after:w-1/3 after:rounded-2xl
          mx-auto"
        >
          Services
        </h2>
        {/* Make container relative and overflow visible */}
        <div
          ref={carouselRef}
          className="max-w-4xl mx-auto relative overflow-visible"
        >
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center h-full">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <p className="text-sm text-gray-600">{service.details}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Absolute positioned prev/next buttons */}
            <div className="w-1/2 absolute top-[110%] left-10 -translate-y-1/2 z-50 p-2">
              <CarouselPrevious
                className="w-full h-12 bg-blue-600/80 hover:bg-blue-600 active:bg-blue-600 text-white rounded flex items-center justify-center cursor-pointer"
                aria-label="Previous"
              />
            </div>
            <div className="w-1/2 absolute top-[110%] right-10 -translate-y-1/2 z-50 p-2">
              <CarouselNext
                className="w-full h-12 bg-blue-600/80 active:bg-blue-600 hover:bg-blue-600 text-white rounded flex items-center justify-center cursor-pointer"
                aria-label="Next"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
