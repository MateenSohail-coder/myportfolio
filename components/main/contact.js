"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import SocialButtons from "../service/social";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);

  // Clear message timer
  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info Side Animation
      gsap.from(infoRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Form Side Animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Shake animation for errors
      gsap.to(formRef.current, {
        x: [-5, 5, -5, 5, 0],
        duration: 0.4,
        ease: "power2.inOut",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setSubmitMessage("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      setSubmitMessage("❌ Failed to send message. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden scroll-mt-20"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact Info */}
          <div ref={infoRef} className="space-y-10">
            <div>
              <h2 className="text-5xl md:text-6xl font-anton-sc font-extrabold text-gray-900 mb-6">
                Let&apos;s Work <br />
                <span className="text-blue-600">Together</span>
              </h2>
              <p className="text-lg text-gray-600 font-antic max-w-md leading-relaxed">
                Have a project in mind or just want to say hi? I&apos;m always
                open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href="mailto:abdulmateensohailking@gmail.com"
                    className="
    text-lg
    sm:text-xl
    md:text-2xl
    font-semibold
    text-gray-900
    break-all
    hover:text-blue-600
    transition-colors
  "
                  >
                    abdulmateensohailking@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    Lahore - Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4">
                Socials
              </p>
              <SocialButtons />
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div
            ref={formRef}
            className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.05)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-white border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-bold">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-white border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-bold">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full bg-white border ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  } rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs font-bold">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>

              {submitMessage && (
                <div
                  className={`p-4 rounded-xl text-center text-sm font-bold ${
                    submitMessage.includes("✅")
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-red-50 text-red-600 border border-red-100"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
