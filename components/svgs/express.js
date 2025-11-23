import React from "react";

// components/icons/ExpressIcon.js

const ExpressIcon = ({ size = 64, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 300 100"
      fill="none"
      className={className}
      role="img"
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={size * 1.3}
        fill="#000"
      >
        express
      </text>
    </svg>
  );
};

export default ExpressIcon;
