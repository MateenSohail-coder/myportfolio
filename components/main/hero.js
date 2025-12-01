"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const bgShape1Ref = useRef(null);
  const bgShape2Ref = useRef(null);

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Web Developer",
    "Frontend Specialist",
    "Backend Engineer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  // Typewriter Effect
  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    let timeout;

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            currentPhrase.substring(0, displayText.length + (isDeleting ? -1 : 1))
          );
        },
        isDeleting ? 50 : 100
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, phrases]);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Background Shapes Parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bgShape1Ref.current, { x: x * 2, y: y * 2, duration: 1, ease: "power2.out" });
      gsap.to(bgShape2Ref.current, { x: -x, y: -y, duration: 1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Floating Badges Animation
    gsap.to(".floating-badge", {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

    // Entrance Animations
    tl.from(heroRef.current, { opacity: 0, duration: 1 })
      .from(
        textContainerRef.current.children,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        imageContainerRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/A-Mateen's_CV.pdf";
    link.download = "Abdul_Mateen_CV.pdf";
    link.click();
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden pt-40 md:pt-20"
    >
      {/* Background Shapes */}
      <div
        ref={bgShape1Ref}
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl"
      />
      <div
        ref={bgShape2Ref}
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div
          ref={textContainerRef}
          className="text-center md:text-left order-2 md:order-1"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm tracking-wide uppercase">
            Available for work
          </div>
          <h1 className="text-5xl md:text-7xl font-anton-sc font-extrabold text-gray-900 leading-tight mb-4">
            Hi, I&apos;m <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-900">
              Abdul Mateen
            </span>
          </h1>
          <div className="h-12 mb-6">
            <p className="text-2xl md:text-3xl font-antonio text-gray-600">
              I am a{" "}
              <span className="text-blue-600 font-bold">{displayText}</span>
              <span className="animate-pulse text-blue-600">|</span>
            </p>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed font-antic">
            Crafting exceptional digital experiences with modern technologies. I
            build scalable, responsive, and user-centric web applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={downloadCV}
              className="group relative px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-blue-500/30 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={20} /> Download CV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <a
              href="#contact"
              className="px-8 py-3.5 bg-white text-gray-800 border border-gray-200 rounded-full font-bold shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Contact Me
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div
          ref={imageContainerRef}
          className="order-1 md:order-2 flex justify-center relative"
        >
          <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px]">
            {/* Decorative Circle behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full" />

            {/* Image Wrapper with Glassmorphism Border */}
            <div className="absolute inset-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 shadow-2xl overflow-hidden z-10">
              <Image
                src="/Me.avif"
                alt="Abdul Mateen"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Floating Badges */}
            <div className="floating-badge absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl z-20">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="floating-badge absolute bottom-8 -left-8 bg-white px-4 py-2 rounded-xl shadow-xl z-20 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-sm text-gray-700">
                Open to work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
