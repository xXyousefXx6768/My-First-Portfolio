import React from 'react'
import Image from "next/image";
import myImg2 from "../assets/my img2.jpg";
function AboutMe() {
  return (
    <main className='flex w-full justify-around items-center px-10 py-20  text-white'>
         <section>
          <h3 className='font-bold text-2xl'>
            About me 
          </h3>
          <div className='w-[660px] scale-90 '>
          <p className=''>
            👋 Hi, I’m Yousef Amr, also known as Tito — a passionate Full-Stack Developer who loves turning ideas into interactive, functional, and visually appealing web experiences.
I’m currently studying at Al-Alsun, Ain Shams University, majoring in Italian, English, and German, which gives me a unique ability to connect with people from different cultures and think creatively in multiple languages.
💻 I’ve completed an online internship with Neuronetix, where I worked on real-world frontend projects and gained hands-on experience with modern technologies like React, Laravel, Tailwind CSS, Bootstrap, and Framer Motion.
What drives me the most is problem-solving — I enjoy building efficient, clean, and user-friendly solutions from scratch.
I also love experimenting with animations and UI effects that bring life to web interfaces.
🚀 My goal is to keep improving my skills every day and collaborate on projects that make an impact, blending creativity with logic to build something meaningful.
When I’m not coding, you’ll probably find me watching hacker movies, exploring new tech trends, or learning new languages.
          </p>
          </div>
         </section>

         <section>
          <Image src={myImg2} alt="my img" width={400} height={400} className='rounded-full' />
         </section>
    </main>
  )
}

export default AboutMe