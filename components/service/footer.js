import ImageSvg from "../svgs/logo";
import SocialButtons from "./social";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-blue-500 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-10 text-center flex flex-col items-center gap-6">
        {/* Logo and copyright */}
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden">
            <ImageSvg height={55} width={55} />
          </div>{" "}
          <span className="text-gray-600 font-medium">
            © {new Date().getFullYear()}. All rights reserved.
          </span>
        </div>

        {/* Footer note */}
        <p className="text-sm text-gray-500">
          Designed & Built by Your <strong>ABDUL MATEEN</strong> | MERN Stack
          Developer
        </p>
      </div>
    </footer>
  );
}
