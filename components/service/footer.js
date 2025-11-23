"use client";

import Image from "next/image";
import Link from "next/link";
import SocialButtons from "./social";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-32 h-12">
                 <Image 
                   src="/Navlogo.png" 
                   alt="Logo" 
                   fill
                   className="object-contain object-left"
                 />
              </div>
            </Link>
            <p className="text-gray-500 font-antic text-lg max-w-sm leading-relaxed">
              Crafting exceptional digital experiences with precision, creativity, and modern technology. Let&apos;s build something amazing together.
            </p>
            <div className="pt-4">
              <SocialButtons />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-anton-sc text-gray-900 tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-anton-sc text-gray-900 tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:abdulmateensohailking@gmail.com" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 block break-words">
                  abdulmateensohailking@gmail.com
                </a>
              </li>
              <li className="text-gray-600 font-medium">
                Lahore, Pakistan
              </li>
              <li className="text-blue-600 font-bold">
                Open to Opportunities
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm font-medium">
            © {currentYear} Abdul Mateen. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
            Designed & Built with <span className="text-red-500 animate-pulse">❤</span> by
            <span className="text-gray-900 font-bold">Abdul Mateen</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
