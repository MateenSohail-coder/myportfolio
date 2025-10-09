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
    "Welcome to my portfolio website where I showcase my projects, skills, and experience as a full-stack web developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="robots" content="index, follow" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
