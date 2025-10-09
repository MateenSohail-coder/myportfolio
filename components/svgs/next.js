import React from "react";

// components/icons/NextjsIcon.js

const NextjsIcon = ({ size = 64, color = "#000000", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <path d="M12 2L2 22h20L12 2zm0 3.8L18.7 20H5.3L12 5.8z" fill={color} />
      <path d="M10 17h4v2h-4v-2z" fill={color} />
    </svg>
  );
};

export default NextjsIcon;
