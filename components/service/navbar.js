"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const menuLinksRef = useRef([]);

  // Animate navbar appearance
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Animate mobile sidebar
  useEffect(() => {
    if (isOpen) {
      gsap.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        display: "block",
      });
      gsap.fromTo(
        menuLinksRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        display: "none",
      });
    }
  }, [isOpen]);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section highlighting
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "services",
      "skills",
      "projects",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5, rootMargin: "-64px 0px 0px 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-white/80 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-anton text-blue-700 flex items-center gap-2 cursor-pointer select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-8 w-8 fill-blue-600 hover:scale-110 transition-transform"
            >
              <path d="M21.099 0c-0.187 0-0.375 0.052-0.536 0.151..." />
            </svg>
            My Portfolio
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 font-antic font-bold">
            {links.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-4 py-1 rounded-full transition-all duration-300 ${
                  activeSection === link.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-700 hover:text-blue-800"
                }`}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, { scale: 1.08, duration: 0.2 })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                }
              >
                {link.label}
                <span
                  className={`absolute left-1/2 -bottom-1 w-0 h-[2px] bg-blue-600 rounded-full transition-all duration-300 ${
                    activeSection === link.id
                      ? "w-3/4 left-[12.5%]"
                      : "group-hover:w-3/4 group-hover:left-[12.5%]"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden focus:outline-none text-gray-800 hover:text-blue-600 transition"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 bottom-0 w-64 bg-white/95 shadow-2xl z-50 transform -translate-x-full opacity-0 md:hidden rounded-r-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <span className="text-2xl font-anton text-blue-700">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="focus:outline-none text-gray-700 hover:text-blue-600 transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="flex-grow px-6 py-6 space-y-4 font-antic font-bold overflow-y-auto">
            {links.map((link, i) => (
              <Link
                key={link.id}
                ref={(el) => (menuLinksRef.current[i] = el)}
                href={`#${link.id}`}
                onClick={() => setIsOpen(false)}
                className={`block text-lg px-3 py-2 rounded-lg ${
                  activeSection === link.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
