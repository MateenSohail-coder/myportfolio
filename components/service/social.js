"use client";
import React from "react";

export default function SocialButtons() {
  return (
    <>
      {/* Define clipPath for squircles */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      {/* Button container */}
      <div className="relative flex items-center justify-center mt-10 bg-blue-600/40 px-3 rounded-2xl shadow-lg max-w-50 mx-auto">
        <div
          onClick={() =>
            window.open(
              "https://github.com/MateenSohail-coder/myportfolio.git",
              "_blank"
            )
          }
          className="relative flex items-end gap-x-2 p-2"
        >
          {/* GitHub */}
          <div className="relative">
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 active:translate-0 hover:shadow-2xl"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          </div>
          {/* LinkedIn */}
          <div
            onClick={() =>
              window.open(
                "https://profile.indeed.com/?hl=en_PK&co=PK&from=gnav-homepage",
                "_blank"
              )
            }
            className="relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl  active:translate-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="white"
                className="h-8 w-8"
              >
                <path d="M19.76 13.745c-3.197 1.64-6.776-1.417-5.661-4.833 1.12-3.417 5.813-3.767 7.423-0.552 1.005 1.973 0.219 4.389-1.761 5.389zM15.469 0.76c3.291-1.197 7.057-1.135 9.875 1.313 0.593 0.489 1.063 1.115 1.364 1.828 0.281 0.916-1-0.095-1.172-0.224-0.891-0.609-1.853-1.099-2.869-1.464-5.552-1.697-10.803 1.396-14.047 6.208-1.323 2.12-2.333 4.423-3 6.833-0.063 0.297-0.156 0.584-0.281 0.86-0.145 0.271-0.068-0.735-0.068-0.765 0.12-1.005 0.313-2.005 0.573-2.985 1.505-5.244 4.839-9.609 9.625-11.609zM15.516 28.755v-11.687c0.333 0.036 0.645 0.052 0.979 0.052 1.516 0.005 3-0.412 4.297-1.193v12.823c0 1.1-0.204 1.907-0.699 2.439-0.495 0.541-1.197 0.839-1.932 0.812-0.724 0.027-1.421-0.271-1.907-0.812-0.489-0.537-0.744-1.349-0.744-2.433z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
