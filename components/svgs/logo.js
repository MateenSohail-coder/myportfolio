import React from "react";

const ImageSvg = ({ height = 300, width = 300, src = "..logo.png" }) => {
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
        href={src}
        className="rounded-full"
      />
    </svg>
  );
};

export default ImageSvg;
