
import Image from "next/image";
import NavBar from "../Components/NavBar";
import AboutMe from "../Components/AboutMe";
import ContactMe from "../Components/ContactMe";
import Footer from "../Components/Footer";
import MyProjects from "../Components/MyProjects";
import HeroSection from "../Components/HeroSection";
import Skills from "../Components/Skills";


export default function Home() {
  return (
    <main className="flex flex-col  items-center min-h-screen bg-[#1E1E1E]">
      <NavBar />
      <HeroSection />
      <AboutMe />
      <Skills />
      <MyProjects />
      <ContactMe />
      <Footer />
    </main>
  );
}
