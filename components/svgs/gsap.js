import React from "react";

// components/icons/GsapIcon.js

const GsapIcon = ({ size = 64, color = "#88CE02", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      className={className}
      role="img"
    >
      {/* This is a placeholder stylized “GSAP / Greensock” shape.
          Replace the <path> d attribute with the official GSAP logo path */}
      <path
        d="M128 0C57.312 0 0 57.312 0 128s57.312 128 128 128 128-57.312 128-128S198.688 0 128 0zM92 184v-32h72v32h-72zm0-72v-32h72v32h-72z"
        fill={color}
      />
    </svg>
  );
};

export default GsapIcon;
