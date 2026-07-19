"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  const columnsRef = useRef<HTMLDivElement[]>([]);
  const socialRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        footerRef.current,
        {
          opacity: 0,
          y: 120,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
        }
      )

        .from(
          columnsRef.current,
          {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            ease: "power4.out",
          },
          "-=1"
        )

        .from(
          socialRef.current,
          {
            opacity: 0,
            scale: 0,
            rotate: -180,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.6"
        );

      gsap.to(".footer-glow", {
        scale: 1.25,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  const socials = [
    {
      icon: faGithub,
      link: "https://github.com/xXyousefXx6768",
    },
    {
      icon: faLinkedin,
      link: "https://www.linkedin.com/in/yousef-amr-66873224b",
    },
    {
      icon: faInstagram,
      link: "https://www.instagram.com/yousef_amr24",
    },
    {
      icon: faFacebook,
      link: "https://www.facebook.com/share/1DMa2oSiss/",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full mt-32 border-t border-orange-500/10 overflow-hidden"
    >
      {/* Glow */}
      <div className="footer-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-orange-500/20 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div
            ref={(el) => {
              if (el) columnsRef.current[0] = el;
            }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Yousef Amr
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Front-End & Next.js Developer passionate about building
              interactive, modern and high-performance web experiences.
            </p>
          </div>

          {/* Navigation */}
          <div
            ref={(el) => {
              if (el) columnsRef.current[1] = el;
            }}
          >
            <h3 className="text-white text-lg font-semibold mb-5">
              Navigation
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
                Home
              </li>

              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
                About
              </li>

              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
                Skills
              </li>

              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
                Services
              </li>

              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
                Projects
              </li>

              <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* Social */}
          <div
            ref={(el) => {
              if (el) columnsRef.current[2] = el;
            }}
          >
            <h3 className="text-white text-lg font-semibold mb-5">
              Connect With Me
            </h3>

            <div className="flex gap-6 text-3xl">
              {socials.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => {
                    if (el) socialRef.current[index] = el;
                  }}
                  onMouseEnter={(e) =>
                    gsap.to(e.currentTarget, {
                      y: -8,
                      scale: 1.25,
                      duration: 0.3,
                      ease: "back.out(3)",
                    })
                  }
                  onMouseLeave={(e) =>
                    gsap.to(e.currentTarget, {
                      y: 0,
                      scale: 1,
                      duration: 0.3,
                    })
                  }
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-gray-300 hover:text-orange-500 transition-colors duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Yousef Amr. All rights reserved.
          </p>

          <p className="text-gray-600 text-sm">
            Crafted with React • Next.js • GSAP • Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;