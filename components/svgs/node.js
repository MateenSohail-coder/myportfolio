import React from "react";

// components/icons/NodejsIcon.js

const NodejsIcon = ({ size = 64, color = "#339933", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 288" // adjust if needed
      fill="none"
      className={className}
      role="img"
    >
      <path
        d="M128 0L14.83 64v160l113.17 64 113.17-64V64L128 0zm0 50.88l72.97 41.27v82.54L128 209.96l-72.97-35.27V92.15L128 50.88zm11.2 35.85v117.54h-22.4V86.73h22.4z"
        fill={color}
      />
    </svg>
  );
};

export default NodejsIcon;
