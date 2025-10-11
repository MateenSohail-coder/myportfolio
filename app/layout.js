import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/service/navbar";
import Footer from "../components/service/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abdul-Mateen's Portfolio",
  description:
    "Explore Abdul-Mateen's portfolio showcasing web development projects, skills, and professional experience in full-stack development.",
  keywords: [
    "Abdul Mateen",
    "Web Developer",
    "Full Stack Developer",
    "Portfolio",
    "JavaScript",
    "React",
    "Next.js",
  ],
  author: "Abdul Mateen",
  openGraph: {
    title: "Abdul-Mateen's Portfolio",
    description:
      "Welcome to my personal portfolio — where creativity meets clean code.",
    url: "https://yourdomain.com",
    siteName: "Abdul-Mateen Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ SEO + Base64 favicon */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/jpeg"
          href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDw0NDQ0ODQ0NDhANDQ4NEBsNDg8NFRIXIhURHxkYHiggGBwlGxUfIT0hJTUuLjEuFx8/Oz84Qyk5OisBCgoKDg0OGxAPGisgHyUtLTcvLTItLS0zKzQtLTcrNy0tKystNy01NS0tLTIrNS0tLS0rKy4rNzUrKy0tLS00K//AABEIAKYBMAMBIgACEQEDEQH..."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-50`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
