import Hero from "../components/main/hero";
import About from "../components/main/about";
import Services from "../components/main/services";
import Skills from "../components/main/skills";
import Project from "../components/main/project";
import Contact from "../components/main/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Project />
      <Contact />
    </>
  );
}
