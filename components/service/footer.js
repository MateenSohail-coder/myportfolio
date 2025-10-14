import ImageSvg from "../svgs/logo";
import SocialButtons from "./social";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t border-blue-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="flex items-center gap-5">
          © {new Date().getFullYear()} <ImageSvg height={150} width={150} /> .
          All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          {/* Add more social icons here if needed */}
        </div>
      </div>
    </footer>
  );
}
