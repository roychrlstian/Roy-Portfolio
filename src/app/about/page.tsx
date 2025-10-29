"use client";
import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'
import Image from 'next/image'
import Reveal from '@/components/ui/reveal'
import PixelBlast from '@/components/ui/PixelBlast'
import Marquee from '@/components/ui/marquee'
import { useRouter } from 'next/navigation'
import SlideToUnlock from '@/components/ui/slide-to-unlock'
import { ScrollTimeline } from '@/components/lightswind/scroll-timeline'
import { education } from './education'
import { SmoothCursor } from '@/components/lightswind/smooth-cursor';
import { logos } from './logos';
import { SlidingLogoMarquee } from '@/components/lightswind/sliding-logo-marquee';
import GitHubRepos from '@/components/ui/github-repos';

const AboutPage = () => {
  const router = useRouter();
  const [reposKey, setReposKey] = React.useState(0);
  return (
          <div className="min-h-screen page-bg text-white">
            <Navbar />
            <div className="pt-10">
            <main className="max-w-6xl mx-auto mb-10 p-8">
              {/* Hero / Identity Section */}
              <Reveal variant="fade-up">
              <section className="relative mt-12 min-h-[70vh] flex items-center justify-center px-4 md:px-0">
                {/* PixelBlast background */}
                <PixelBlast color="#0f1724" className="absolute inset-0 w-full h-full -z-10 pointer-events-none" />
                {/* Tagline (top-left on large screens) */}
                <div className="absolute top-0 left-4 md:left-27 max-w-sm space-y-1 md:space-y-2 font-semibold text-base md:text-[25px] leading-snug z-30 text-left heading-3 text-white">
                  <p className="text-white">Web Developer</p>
                  <p className="text-white">Graphics Designer based</p>
                  <p className="text-white">in Philippines</p>
                </div>

                {/* Accessible heading for SEO & screen readers */}
                <h1 className="sr-only">Roy Cruz</h1>

                {/* Layer 1: Filled ROY CRUZ */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0">
                  <div className="relative w-screen md:w-[1000px] max-w-[1200px] aspect-[9/2]">
                    <Image
                      src="/optimized/roy/1-1052.webp"
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, 1000px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Layer 2: Portrait PNG */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-10">
                  <div className="relative w-screen md:w-[760px] max-w-[760px] aspect-[3/4]">
                    <Image
                      src="/me.png"
                      alt="Portrait of Roy Cruz"
                      fill
                      priority
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="absolute inset-0" />
                </div>
                {/* Layer 3: Outlined ROY CRUZ */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative w-screen md:w-[1000px] max-w-[1200px] aspect-[9/2]">
                    <Image
                      src="/optimized/roy/2-1052.webp"
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, 1000px"
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* Description + CTA (bottom-right)*/}
                <div className="absolute bottom-4 md:bottom-[10px] left-4 md:left-auto md:right-27 max-w-sm text-xs sm:text-sm md:text-xl leading-relaxed space-y-4 md:space-y-6 z-100 text-left">
                  <SlideToUnlock
                    onComplete={() => router.push('/design')}
                    label="See my works"
                    successLabel=""
                    className="md:ml-auto"
                  />
                </div>
              </section>
              </Reveal>
              
            </main>
            
            </div>
            <Reveal variant="fade-in">
              <Marquee
                speed={20}
                className="py-6 mx-[calc(50%-50vw)] w-screen px-8 mb-6 bg-[#0B1019]"
                textClass="text-2xl md:text-4xl font-semibold"
              >
                <span className="mx-4">Code. Design. Coffee. Repeat.</span>
                <span className="mx-4">Code. Design. Coffee. Repeat.</span>
              </Marquee>
            </Reveal>

            <Reveal>
              <div className='flex items-center justify-between mt-6 mb-[-50px] px-8 max-w-6xl mx-auto'>
              <ScrollTimeline 
                events={education}
                title="My Education"
                subtitle="Scroll to explore the timeline"
                progressIndicator={true}
                cardAlignment="alternating"
                revealAnimation="fade"
              />
              </div>
            </Reveal>

            <Reveal variant="fade-up">
              <SlidingLogoMarquee 
              items={logos} 
              speed={60}
              height="180px"
              enableBlur={true}
              blurIntensity={2}
              pauseOnHover={true}
              showGridBackground={true}
              showControls={false}
              className="mb-20"
              />
            </Reveal>
            
            {/* Skills & Experience Section */}
            <Reveal variant="fade-up">
              <section className="max-w-6xl mx-auto px-8 mt-14 mb-20">
                {/* 01 Software Skills */}
                <h2 className="heading-2 mb-8 gradient-text">
                  <span className="text-white/70 mr-2">01</span> Software skills
                </h2>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-20">
                  {/* Development & Programming */}
                  <div className="flex-1 max-w-3xl">
                    <h3 className="heading-3 mb-6">Development &amp; Programming</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-10 text-lg md:text-xl">
                      <ul className="space-y-2 list-disc list-inside font-light">
                        <li>Java</li>
                        <li>JavaScript</li>
                        <li>Python</li>
                      </ul>
                      <ul className="space-y-2 list-disc list-inside font-light">
                        <li>C#</li>
                        <li>SQL</li>
                        <li>Git</li>
                      </ul>
                      <ul className="space-y-2 list-disc list-inside font-light">
                        <li>React</li>
                        <li>HTML</li>
                        <li>CSS</li>
                      </ul>
                    </div>
                  </div>
                  {/* Design & Creative Tools */}
                  <div className="flex-1 md:max-w-sm">
                    <h3 className="heading-3 mb-6">Design &amp; Creative Tools</h3>
                    <ul className="space-y-2 list-disc list-inside text-lg md:text-xl font-light">
                      <li>Krita</li>
                      <li>Photoshop</li>
                      <li>Canva</li>
                    </ul>
                  </div>
                </div>
                <hr className="my-10 border-white/20" />
                {/* 02 Work Experience */}
                <h2 className="heading-2 mb-10 gradient-text">
                  <span className="text-white/70 mr-2">02</span> Work experience
                </h2>
                <div className="flex flex-col gap-6">
                  {/* Single experience row */}
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-8 text-lg md:text-xl font-light">
                    <span className="md:w-[20%] font-medium">Freelance</span>
                    <span className="md:w-[30%] md:pl-4 md:text-left">Graphics Designer</span>
                    <span className="md:w-[10%] md:text-center">2024</span>
                    <span className="md:w-[10%] md:text-right">Present</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-8 text-lg md:text-xl font-light">
                    <span className="md:w-[20%] font-medium">Journalist</span>
                    <span className="md:w-[30%] md:pl-4 md:text-left">Graphics Designer</span>
                    <span className="md:w-[10%] md:text-center">0000</span>
                    <span className="md:w-[10%] md:text-right">0000</span>
                  </div>
                </div>
                <hr className="my-10 border-white/20" />
                {/* 03 Public Repositories */}
                <h2 className="heading-2 mb-6 gradient-text">
                  <span className="text-white/70 mr-2">03</span> Public repositories
                </h2>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                  <p className="text-white/70 text-sm md:text-base m-0">Some of my public projects on GitHub.</p>
                  <button
                    type="button"
                    onClick={() => setReposKey(k => k + 1)}
                    className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    aria-label="Refresh public repositories">
                    Refresh
                  </button>
                </div>
                <GitHubRepos
                  key={reposKey}
                  cacheBust={reposKey}
                  user="roychrlstian"
                  limit={6}
                  sortBy="updated"
                  className="mt-2"
                />
              </section>
            </Reveal>

            <SmoothCursor size={30} color={"#0f1724"} rotateOnMove={true} scaleOnClick={true} glowEffect={true}/>
            <Footer/>
          </div>
        )
}

export default AboutPage