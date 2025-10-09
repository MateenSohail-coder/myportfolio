"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const bgShapeRef = useRef(null);
  const imageRef = useRef(null);

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const phrases = [
    "Web developer",
    "Frontend developer",
    "Backend developer",
    "UI/UX designer",
    "Problem Solver",
  ];

  // Animate profile image and title intro
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    if (imageRef.current) {
      gsap.from(imageRef.current, {
        y: -200,
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
      });
    }

    const words = ["Hi,", "I'm", "Abdul", "Mateen"];
    titleEl.innerHTML = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.display = "inline-block";
      span.style.whiteSpace = "nowrap";
      span.style.marginRight = "0.25rem";

      if (index >= 2) {
        span.classList.add("text-blue-600");
      }

      titleEl.appendChild(span);
    });

    gsap.fromTo(
      titleEl.querySelectorAll("span"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "bounce.out",
        stagger: 0.1,
      }
    );
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    let timeout;

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }, 500);
    } else {
      timeout = setTimeout(
        () => {
          const updatedText = isDeleting
            ? currentPhrase.slice(0, displayText.length - 1)
            : currentPhrase.slice(0, displayText.length + 1);
          setDisplayText(updatedText);
        },
        isDeleting ? 50 : 100
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, phrases]); // ✅ Added phrases dependency

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Background Shape */}
      <div
        ref={bgShapeRef}
        className="absolute top-10 right-10 w-72 h-72 bg-blue-300 rounded-full opacity-30 filter blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
        {/* Profile Image */}
        <div className="mb-8">
          <Image
            ref={imageRef}
            src="/mypic.png" // ✅ use absolute path
            alt="Profile Picture"
            width={200}
            height={200}
            className="rounded-full mx-auto drop-shadow-xl"
            priority={true}
          />
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-anton-sc font-extrabold text-gray-900 mb-6 flex flex-wrap justify-center gap-2"
        >
          {`Hi, I'm `} <span className="text-blue-600">Abdul Mateen</span>
        </h1>

        {/* Typewriter */}
        <div className="text-xl md:text-2xl gap-2 text-gray-600 mb-8 max-w-xl mx-auto flex items-center justify-center">
          I am a <p className="text-blue-600 ml-2">{displayText}</p>
          <span
            className={`ml-1 text-blue-600 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            |
          </span>
        </div>

        {/* Button */}
        <button
          ref={buttonRef}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-colors duration-300"
          onClick={() => {
            const aboutEl = document.getElementById("about");
            if (aboutEl) {
              aboutEl.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
