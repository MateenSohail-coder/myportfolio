"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const messageRef = useRef(null);
useEffect(() => {
  if (submitMessage) {
    const timer = setTimeout(() => {
      setSubmitMessage(""); // clears the message after 2 seconds
    }, 3000);

    return () => clearTimeout(timer); // cleanup on unmount or new message
  }
}, [submitMessage]);
  // Entrance animation
  useEffect(() => {
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
      },
    });
  }, []);

  // Validation
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

  const handleFocus = (index) => {
    gsap.to(inputRefs.current[index], {
      scale: 1.02,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleBlur = (index) => {
    gsap.to(inputRefs.current[index], {
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Shake error fields
      Object.keys(validationErrors).forEach((field) => {
        const index = ["name", "email", "message"].indexOf(field);
        gsap.to(inputRefs.current[index], {
          x: -10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power2.inOut",
        });
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("✅ Message sent successfully!");
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
        gsap.from(messageRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setSubmitMessage("❌ Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error("API request failed:", err);
      setSubmitMessage("❌ Failed to send message. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="
  text-4xl md:text-5xl text-stroke font-anton-sc font-extrabold text-gray-900 mb-16
  relative flex items-center justify-center
  before:content-[''] before:text-center before:mx-auto before:relative before:right-0 before:bottom-0 before:h-2 before:bg-blue-600 before:w-1/3 before:rounded-2xl
  after:content-[''] after:text-center after:mx-auto after:relative after:left-0 after:bottom-0 after:h-2 after:bg-blue-600 after:w-1/3 after:rounded-2xl
  mx-auto text-center
"
        >
          Contact Me
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8"
        >
          {["name", "email", "message"].map((field, idx) => (
            <div className="mb-6" key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-medium mb-2"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>

              {field !== "message" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(idx)}
                  onBlur={() => handleBlur(idx)}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${
                    errors[field]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
              ) : (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(idx)}
                  onBlur={() => handleBlur(idx)}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${
                    errors[field]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
              )}

              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
          <button
            ref={buttonRef}
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-semibold py-3 px-6 rounded-md transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
            } text-white`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {submitMessage && (
            <div
              ref={messageRef}
              className={`mt-4 p-4 rounded-md border ${
                submitMessage.startsWith("✅")
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              }`}
              aria-live="polite"
            >
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
