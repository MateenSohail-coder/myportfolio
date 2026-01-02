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
    description:
      "Creating responsive and dynamic websites using modern technologies.",
    icon: <Globe className="w-12 h-12 text-primary" />,
    details:
      "I build fast, scalable web applications with React, Next.js, and Node.js. From e-commerce sites to complex web platforms, I ensure optimal performance and user experience.",
  },
  {
    title: "UI/UX Design",
    description:
      "Designing intuitive and beautiful user interfaces and experiences.",
    icon: <Palette className="w-12 h-12 text-primary" />,
    details:
      "Crafting user-centered designs that are both aesthetically pleasing and functionally superior. I use Figma, Adobe XD, and prototyping tools to bring ideas to life.",
  },
  {
    title: "Frontend Development",
    description: "Building interactive and engaging user interfaces.",
    icon: <Code className="w-12 h-12 text-primary" />,
    details:
      "Specializing in frontend technologies like React, Tailwind CSS, and GSAP to create seamless and dynamic user experiences that captivate users.",
  },
  {
    title: "Consulting",
    description:
      "Providing expert advice on technology and development strategies.",
    icon: <Lightbulb className="w-12 h-12 text-primary" />,
    details:
      "Offering strategic guidance on technology stack selection, architecture design, and development best practices. I help businesses optimize their digital presence.",
  },
  {
    title: "Portfolio Development",
    description:
      "Creating personalized portfolios to showcase skills and projects.",
    icon: <FolderOpen className="w-12 h-12 text-primary" />,
    details:
      "I design and develop custom portfolios that highlight your unique skills and projects, ensuring you stand out to potential employers or clients.",
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
      className="py-24 relative overflow-hidden scroll-mt-28"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl gfont font-extrabold text-foreground mb-4">
            My Services
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-antic">
            I offer a comprehensive range of digital services to help bring your
            ideas to life.
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
            <CarouselContent className="-ml-4 py-4">
              {services.map((service, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="service-card h-full group">
                    <div className="bg-card/40 backdrop-blur-xl rounded-3xl p-8 h-full border border-white/20 dark:border-white/5 shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                      {/* Gradient Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 relative z-10">
                        {service.icon}
                      </div>

                      <h3 className="text-2xl gfont font-bold text-foreground mb-4 group-hover:text-primary transition-colors relative z-10">
                        {service.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 font-medium relative z-10">
                        {service.description}
                      </p>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow relative z-10">
                        {service.details}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="static translate-y-0 bg-muted border border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 w-12 h-12" />
              <CarouselNext className="static translate-y-0 bg-muted border border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 w-12 h-12" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
