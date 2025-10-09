import React from "react";

// components/icons/ExpressIcon.js

const ExpressIcon = ({ size = 64, color = "#000000", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 64"
      fill="none"
      className={className}
      role="img"
    >
      <path d="M0 32h256v32H0z" fill={color} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={size * 0.4}
        fill="#ffffff"
      >
        EXPRESS
      </text>
    </svg>
  );
};

export default ExpressIcon;
