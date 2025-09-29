"use client";
import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'
import Image from 'next/image'
import Reveal from '@/components/ui/reveal'
import Marquee from '@/components/ui/marquee'
import { useRouter } from 'next/navigation'
import SlideToUnlock from '@/components/ui/slide-to-unlock'
import { ScrollTimeline } from '@/components/lightswind/scroll-timeline'
import { education } from './education'

const AboutPage = () => {
  const router = useRouter();
  return (
          <div className="min-h-screen bg-[#0f1724] text-white">
            <Navbar />
            <div className="pt-10">
            <main className="max-w-6xl mx-auto mb-10 p-8">
              {/* Hero / Identity Section */}
              <Reveal variant="fade-up">
              <section className="relative mt-12 min-h-[70vh] flex items-center justify-center px-4 md:px-0">
                {/* Tagline (top-left on large screens) */}
                <div className="absolute top-0 left-4 md:left-27 max-w-sm space-y-1 md:space-y-2 font-semibold text-base md:text-xl leading-snug z-30 text-left">
                  <p>Web Developer</p>
                  <p>Graphics Designer based</p>
                  <p>in Philippines</p>
                </div>

                {/* Accessible heading for SEO & screen readers */}
                <h1 className="sr-only">Roy Cruz</h1>

                {/* Layer 1: Filled ROY CRUZ */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0">
                  <div className="relative w-screen md:w-[1000px] max-w-[1200px] aspect-[9/2]">
                    <Image
                      src="/roy/1.png"
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
                      src="/roy/2.png"
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, 1000px"
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* Description + CTA (bottom-right)*/}
                <div className="absolute bottom-4 md:bottom-[-30px] left-4 md:left-auto md:right-0 max-w-sm text-xs sm:text-sm md:text-base leading-relaxed space-y-4 md:space-y-6 z-30 text-left">
                  <p className="text-white/90">
                    Hi, I&apos;m Roy Cruz — a web developer and Graphics Designer passionate about crafting intuitive, responsive, and visually engaging digital experiences that inspire and connect.
                  </p>
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
                <span className="mx-4">Developer • Designer • Innovator | Always learning, always creating</span>
              </Marquee>
            </Reveal>

            <Reveal>
            <ScrollTimeline 
              events={education}
              title="My Education"
              subtitle="Scroll to explore the timeline"
              progressIndicator={true}
              cardAlignment="alternating"
              revealAnimation="fade"
            />
            </Reveal>
            
            <Footer/>
          </div>
        )
}

export default AboutPage