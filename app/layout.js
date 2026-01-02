import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/service/navbar";
import Footer from "../components/service/footer";
import { ThemeProvider } from "../components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ SEO + Base64 favicon */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-background to-muted/30 text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
