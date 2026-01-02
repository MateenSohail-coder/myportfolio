"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ImageSvg from "../svgs/logo";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { useTheme } from "next-themes";

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const menuLinksRef = useRef([]);
  const logoRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate navbar entrance
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    }).from(
      logoRef.current,
      {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );
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
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        display: "none",
      });
    }
  }, [isOpen]);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
      { threshold: 0.2, rootMargin: "-100px 0px 0px 0px" }
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
      {/* Floating Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          ref={navRef}
          className={`
            flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500
            ${
              isScrolled
                ? "bg-background/70 backdrop-blur-xl shadow-lg border border-border w-full max-w-5xl"
                : "bg-transparent w-full max-w-7xl"
            }
          `}
        >
          {/* Logo */}
          <div
            ref={logoRef}
            className="flex items-center justify-center cursor-pointer select-none"
          >
            {mounted ? (
              <Image
                src={resolvedTheme === "dark" ? "/dlogo.png" : "/Navlogo.png"}
                alt="logo"
                width={100}
                height={10}
              />
            ) : (
              <div className="w-[100px] h-[10px]" /> /* Placeholder to prevent layout shift */
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-background/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-sm">
            {links.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={`
                  relative px-5 py-2 gfont rounded-full text-sm font-extralight tracking-wide transition-all duration-300
                  ${
                    activeSection === link.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4 md:gap-0">
            <div className="md:mr-4">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                md:hidden p-2 rounded-full transition-colors duration-300
                ${
                  isScrolled
                    ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    : "bg-white/80 dark:bg-black/80 text-gray-900 dark:text-gray-100"
                }
              `}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 right-0 bottom-0 w-[280px] bg-background/95 backdrop-blur-xl shadow-2xl z-50 transform translate-x-full hidden md:hidden border-l border-border"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl gfont text-primary ">MENU</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <X size={24} className="text-muted-foreground" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link, i) => (
              <Link
                key={link.id}
                ref={(el) => (menuLinksRef.current[i] = el)}
                href={`#${link.id}`}
                onClick={() => setIsOpen(false)}
                className={`
                  text-lg gfont font-extralight px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    activeSection === link.id
                      ? "bg-primary/10 text-primary translate-x-2"
                      : "text-muted-foreground hover:bg-accent hover:text-primary"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-border">
            <p className="text-xs text-center text-muted-foreground font-antic">
              © 2024 Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
