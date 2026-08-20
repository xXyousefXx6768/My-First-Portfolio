"use client";

import React from "react";
import gsap from "gsap";
import AnimatedTitle from "./custom-sections/AnimatedTitle";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

function ContactMe() {

  const handleCardEnter = (
  e: React.MouseEvent<HTMLAnchorElement>
) => {
  const card = e.currentTarget;

  const fill = card.querySelector(".contact-fill");
  const content = card.querySelectorAll(".contact-content");
  const icon = card.querySelector(".contact-icon");

  if (!fill) return;

  gsap.killTweensOf([fill, content, icon]);

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  // الخلفية تطلع من تحت
  tl.to(
    fill,
    {
      height: "100%",
      borderRadius: "0%",
      duration: 0.65,
    },
    0
  );

  // النص
  tl.to(
    content,
    {
      color: "#000",
      y: -3,
      duration: 0.35,
      stagger: 0.03,
    },
    0.18
  );

  // الـ Icon
  if (icon) {
    tl.to(
      icon,
      {
        color: "#000",
        scale: 1.12,
        rotation: -5,
        duration: 0.35,
        ease: "back.out(1.7)",
      },
      0.12
    );
  }
};


const handleCardLeave = (
  e: React.MouseEvent<HTMLAnchorElement>
) => {
  const card = e.currentTarget;

  const fill = card.querySelector(".contact-fill");
  const content = card.querySelectorAll(".contact-content");
  const icon = card.querySelector(".contact-icon");

  if (!fill) return;

  gsap.killTweensOf([fill, content, icon]);

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.inOut",
    },
  });

  // رجوع المحتوى
  tl.to(
    content,
    {
      color: "",
      y: 0,
      duration: 0.3,
      stagger: 0.02,
    },
    0
  );

  // رجوع الـ Icon للبرتقالي
  if (icon) {
    tl.to(
      icon,
      {
        color: "#f97316",
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power3.out",
      },
      0
    );
  }

  // اختفاء الخلفية
  tl.to(
    fill,
    {
      height: "0%",
      borderRadius: "50% 50% 0 0",
      duration: 0.55,
    },
    0.05
  );
};


  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-16 text-white "
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/50 to-orange-500/30 rounded-full blur-[120px] opacity-40" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-r from-orange-500/50 to-red-500/20 rounded-full blur-[120px] opacity-40" />

      {/* Title */}
      <AnimatedTitle
        title="Let's Work Together"
        className="text-orange-400"
      />

      <p className="text-center text-gray-400 max-w-2xl mx-auto mt-4 mb-14">
        Have a project in mind or want to discuss an opportunity?
        Feel free to reach out through any of the platforms below.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

      <a
  href="mailto:ya839327@gmail.com"
  onMouseEnter={handleCardEnter}
  onMouseLeave={handleCardLeave}
  className="
    group
    relative
    overflow-hidden
    p-6
    rounded-3xl
    bg-black/40
    border
    border-white/10
    backdrop-blur-xl
    transition-all
    duration-300
  "
>
  {/* Animated Fill */}
  <div
    className="
      contact-fill
      absolute
      left-0
      bottom-0
      w-full
      h-0
      bg-orange-500
      rounded-[50%_50%_0_0]
      pointer-events-none
      z-0
    "
  />

  {/* Content */}
  <div className="contact-content relative z-10">
    <FaEnvelope className=" contact-icon text-4xl text-orange-500 mb-4" />

    <h3 className="text-xl font-semibold">
      Email
    </h3>

    <p className=" mt-2">
      Send me an email anytime.
    </p>
  </div>
</a>

      <a
  href="https://www.linkedin.com/in/yousef-amr-66873224b"
  target="_blank"
  rel="noopener noreferrer"
  onMouseEnter={handleCardEnter}
  onMouseLeave={handleCardLeave}
  className="
    group
    relative
    overflow-hidden
    p-6
    rounded-3xl
    bg-black/40
    border
    border-white/10
    backdrop-blur-xl
    transition-all
    duration-300
  "
>
  <div
    className="
      contact-fill
      absolute
      left-0
      bottom-0
      w-full
      h-0
      bg-orange-500
      rounded-[50%_50%_0_0]
      pointer-events-none
      z-0
    "
  />

  <div className="contact-content relative z-10">
    <FaLinkedin className="  contact-icon  text-4xl text-orange-500 mb-4" />

    <h3 className="text-xl font-semibold">
      LinkedIn
    </h3>

    <p className=" mt-2">
      Connect and let's discuss opportunities.
    </p>
  </div>
</a>
      <a
  href="https://github.com/xXyousefXx6768"
  target="_blank"
  rel="noopener noreferrer"
  onMouseEnter={handleCardEnter}
  onMouseLeave={handleCardLeave}
  className="
    group
    relative
    overflow-hidden
    p-6
    rounded-3xl
    bg-black/40
    border
    border-white/10
    backdrop-blur-xl
    transition-all
    duration-300
  "
>
  <div
    className="
      contact-fill
      absolute
      left-0
      bottom-0
      w-full
      h-0
      bg-orange-500
      rounded-[50%_50%_0_0]
      pointer-events-none
      z-0
    "
  />

  <div className="contact-content relative z-10">
    <FaGithub className=" contact-icon  text-4xl text-orange-500 mb-4" />

    <h3 className="text-xl font-semibold">
      GitHub
    </h3>

    <p className=" mt-2">
      Explore my projects and code.
    </p>
  </div>
</a>
      <a
  href="https://wa.me/201000000000"
  target="_blank"
  rel="noopener noreferrer"
  onMouseEnter={handleCardEnter}
  onMouseLeave={handleCardLeave}
  className="
    group
    relative
    overflow-hidden
    p-6
    rounded-3xl
    bg-black/40
    border
    border-white/10
    backdrop-blur-xl
    transition-all
    duration-300
  "
>
  <div
    className="
      contact-fill
      absolute
      left-0
      bottom-0
      w-full
      h-0
      bg-orange-500
      rounded-[50%_50%_0_0]
      pointer-events-none
      z-0
    "
  />

  <div className="contact-content relative z-10">
    <FaWhatsapp className="  contact-icon  text-4xl text-orange-500 mb-4" />

    <h3 className="text-xl font-semibold">
      WhatsApp
    </h3>

    <p className=" mt-2">
      Quick communication for projects.
    </p>
  </div>
</a>

      </div>

      {/* CTA */}
      <div className="flex justify-center mt-14">
        <a
          href="mailto:yourmail@gmail.com"
          className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
        >
          Start a Conversation
        </a>
      </div>
    </section>
  );
}

export default ContactMe;
