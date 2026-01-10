'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import myImg from "../assets/my img1.png";
import TextType from "@/components/TextType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareLinkedin, faSquareGithub, faSquareInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import gsap  from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function HeroSection() {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // --- Image Animation ---
    const imgAnim = gsap.fromTo(
  imgRef.current,
  {
    y: 60,
    opacity: 0,
    filter: "blur(10px)",
  },
  {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
      trigger: imgRef.current,
      start: "top 90%",
    },
    willChange: "transform, opacity",
  }
);

    triggers.push(imgAnim.scrollTrigger!);

    // --- Text Animation ---
    const textAnim = gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        x: -80,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.6,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );

    triggers.push(textAnim.scrollTrigger!);

    // --- Cleanup (Kill only this component triggers) ---
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const icons = [
    { icon: faSquareLinkedin, link: "https://www.linkedin.com/in/yousef-amr-66873224b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "#ff6000" },
    { icon: faSquareGithub, link: "https://github.com/xXyousefXx6768", color: "#ff6000" },
    { icon: faSquareInstagram, link: "https://www.instagram.com/yousef_amr24?igsh=a3I2eTQxZ3M5ZjZ5", color: "#ff6000" },
    { icon: faSquareFacebook, link: "https://www.facebook.com/share/1DMa2oSiss/", color: "#ff6000" },
  ];

  return (
    <section className="relative  overflow-visible flex flex-col-reverse md:flex-row
 w-full justify-around items-center px-10 py-20">
      
      {/* Background effects (unchanged) */}
      <div className="absolute top-30 left-18 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[180px] opacity-10"></div>
      <div className="absolute top-30 right-18 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/60 to-orange-500/30 rounded-full blur-[120px] opacity-50"></div>
         <div className="light-blob"></div>
      {/* LEFT TEXT SECTION */}
     <div
  ref={textRef}
  className="flex flex-col z-10 text-white opacity-0 -translate-x-20"
>

        <p className="text-gray-400 text-lg">Hi I am</p>
        <h1 className="text-5xl font-bold text-orange-500">Yousef Amr</h1>
        <h2 className="text-3xl ml-4 font-semibold text-gray-200 mt-2">(Tito)</h2>

        <TextType 
          text={["full stack developer", "Nextjs developer", "php developer"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-3xl font-semibold shiny-text glow-text text-gray-200 mt-2"
        />

        <div className="flex gap-2 mt-6">
          {icons.map((item, index) => (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={item.icon} size="2xl" style={{ color: item.color }} />
            </a>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] text-white font-semibold py-2 px-5 rounded hover:opacity-90 transition">Hire Me</button>
          <button className="border border-gray-500 text-gray-300 font-semibold py-2 px-5 rounded hover:bg-gray-700 transition">Download CV</button>
        </div>
      </div>

    {/* RIGHT IMAGE SECTION */}
<div ref={imgRef} className="relative z-10 ">

  <div className="relative group w-fit">
  <Image
  src={myImg}
  alt="my img"
  width={300}
  height={300}
  priority
  sizes="(max-width: 768px) 220px, 300px"
  className="rounded-3xl object-cover transition-transform duration-500 group-hover:scale-105"
/>




  {/* Top */}
  <span className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:w-full"></span>

  {/* Bottom */}
  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:w-full"></span>

  {/* Left */}
  <span className="absolute top-0 left-0 w-[3px] h-0 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:h-full"></span>

  {/* Right */}
  <span className="absolute top-0 right-0 w-[3px] h-0 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full transition-all duration-500 group-hover:h-full"></span>
</div>

</div>

    </section>
  );
}

export default HeroSection;
