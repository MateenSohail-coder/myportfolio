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
import { Globe, Palette, Code, Lightbulb, FolderOpen, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    description: "Creating responsive and dynamic websites using modern technologies.",
    icon: <Globe className="w-12 h-12 text-blue-600" />,
    details: "I build fast, scalable web applications with React, Next.js, and Node.js. From e-commerce sites to complex web platforms, I ensure optimal performance and user experience.",
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful user interfaces and experiences.",
    icon: <Palette className="w-12 h-12 text-purple-600" />,
    details: "Crafting user-centered designs that are both aesthetically pleasing and functionally superior. I use Figma, Adobe XD, and prototyping tools to bring ideas to life.",
  },
  {
    title: "Frontend Development",
    description: "Building interactive and engaging user interfaces.",
    icon: <Code className="w-12 h-12 text-teal-600" />,
    details: "Specializing in frontend technologies like React, Tailwind CSS, and GSAP to create seamless and dynamic user experiences that captivate users.",
  },
  {
    title: "Consulting",
    description: "Providing expert advice on technology and development strategies.",
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
    details: "Offering strategic guidance on technology stack selection, architecture design, and development best practices. I help businesses optimize their digital presence.",
  },
  {
    title: "Portfolio Development",
    description: "Creating personalized portfolios to showcase skills and projects.",
    icon: <FolderOpen className="w-12 h-12 text-pink-600" />,
    details: "I design and develop custom portfolios that highlight your unique skills and projects, ensuring you stand out to potential employers or clients.",
  },
];

export default function Services() {
  const servicesRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={servicesRef}
      className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden scroll-mt-28"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-anton-sc font-extrabold text-gray-900 mb-4">
            My Services
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto font-antic">
            I offer a comprehensive range of digital services to help bring your ideas to life.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[Autoplay({ delay: 4000 })]}
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="service-card h-full group">
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 h-full border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
                      <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                        {service.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold font-antonio text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 font-medium">
                        {service.description}
                      </p>
                      
                      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">
                        {service.details}
                      </p>

                      <div className="pt-6 border-t border-gray-100 flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all cursor-pointer">
                        Learn More <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="static translate-y-0 bg-gray-300 border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 w-12 h-12" />
              <CarouselNext className="static translate-y-0 bg-gray-300 border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 w-12 h-12" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
