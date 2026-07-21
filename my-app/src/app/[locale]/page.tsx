"use client";
import Image from "next/image";
import NavBar from "../Components/NavBar";
import AboutMe from "../Components/AboutMe";
import ContactMe from "../Components/ContactMe";
import Footer from "../Components/Footer";
import MyProjects from "../Components/MyProjects";
import HeroSection from "../Components/HeroSection";
import Skills from "../Components/Skills";
import Services from "../Components/Services";
import CertificatesSection from "../Components/CertificatesSection";
import IntroScreen from "../Components/IntroScreen";
import { useState } from "react";


export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  return (
    <>  
    {!introFinished && (
    <IntroScreen onComplete={() => setIntroFinished(true)} 
    />
    )}
    <main
  className={`flex flex-col items-center min-h-screen bg-[#0e0b0b] transition-opacity duration-700 ${
    introFinished ? "opacity-100" : "opacity-0"
  }`}
>
    
      <NavBar startAnimation={introFinished}/>

      <section  id="home">
        <HeroSection startAnimation={introFinished}/>
      </section>

      <section id="about">
        <AboutMe />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="projects">
        <MyProjects />
      </section>

      <section id="certificates">
        <CertificatesSection />
      </section>

      <section id="contact">
        <ContactMe />
      </section>

      <Footer />
    </main>
    </>
  );
}