'use client';
import React from "react";
import Image from "next/image";
import myImg from "../assets/my img.jpg";
import TextType from "@/components/TextType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquareLinkedin,faSquareGithub,faSquareInstagram,faSquareFacebook} from '@fortawesome/free-brands-svg-icons'

function HeroSection() {
  const icons = [
    {
      icon: faSquareLinkedin,
      link: "https://www.linkedin.com/in/yousef-amr-66873224b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "#ff6000"
    },
    {
      icon: faSquareGithub,
      link: "https://github.com/xXyousefXx6768",
      color: "#ff6000",
    },
    {
      icon: faSquareInstagram,
      link: "https://www.instagram.com/yousef_amr24?igsh=a3I2eTQxZ3M5ZjZ5",
      color: "#ff6000",
    },
    {
      icon: faSquareFacebook,
      link: "https://www.facebook.com/share/1DMa2oSiss/",
      color: "#ff6000",
    },
  ]
  return (
    <section className="relative overflow-visible flex  flex-row w-full justify-around items-center px-10 py-20 ">
      
      <div className="absolute top-30   left-18 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[180px] opacity-10"></div>
        <div className="absolute light-blob"></div>

        <div className="absolute top-30   right-18 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[120px] opacity-50"></div>

    
      <div className="flex flex-col z-10 text-white">
        <p className="text-gray-400 text-lg">Hi I am</p>
        <h1 className="text-5xl font-bold text-orange-500">Yousef Amr</h1>
        <h2 className="text-3xl ml-4 font-semibold text-gray-200 mt-2">
          (Tito)
        </h2>

        <TextType 
  text={["full stack developer", "Nextjs developer", "php developer"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
  className="text-3xl font-semibold shiny-text glow-text text-gray-200 mt-2"
/>
        

        <div className="flex gap-2 mt-6">
          {icons.map((icon, index) => (
            <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={icon.icon} size="2xl" style={{ color: icon.color }} />
            </a>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] text-white font-semibold py-2 px-5 rounded hover:opacity-90 transition">
            Hire Me
          </button>
          <button className="border border-gray-500 text-gray-300 font-semibold py-2 px-5 rounded hover:bg-gray-700 transition">
            Download CV
          </button>
        </div>
      </div>

      
      <div className="flex overflow-hidden flex-col rounded-3xl z-10">
        <Image
          src={myImg}
          alt="my img"
          width={300}
          height={300}
          className="scale-110 rounded-3xl"
        />
      </div>
    </section>
  );
}

export default HeroSection;
