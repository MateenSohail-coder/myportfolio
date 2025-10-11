import SocialButtons from "./social";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          {/* Add more social icons here if needed */}
        </div>
      </div>
      <SocialButtons />
    </footer>
  );
}
