import React from "react";

const ImageSvg = ({ height = 300, width = 300 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 700 700"
    >
      <image
        x="0"
        y="0"
        width="700"
        height="700"
        xlinkHref="image.png"
        href="../logo.png"
      />
    </svg>
  );
};

export default ImageSvg;
