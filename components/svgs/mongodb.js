import React from "react";

// components/icons/MongodbIcon.js

const MongodbIcon = ({ size = 64, color = "#47A248", className = "" }) => {
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
      <path
        d="M128 0C57.312 0 0 57.312 0 128c0 70.688 57.312 128 128 128s128-57.312 128-128C256 57.312 198.688 0 128 0zm0 234c-58.453 0-106-47.547-106-106s47.547-106 106-106 106 47.547 106 106-47.547 106-106 106z"
        fill={color}
      />
      {/* Add more paths or modify as per the official logo */}
    </svg>
  );
};

export default MongodbIcon;
