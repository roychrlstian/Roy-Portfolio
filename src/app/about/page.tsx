import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'
import Image from 'next/image'
import Reveal from '@/components/ui/reveal'
import Link from 'next/link'

const AboutPage = () => {
  return (
          <div className="min-h-screen bg-[#0f1724] text-white">
            <Navbar />
            <div className="pt-10">
            <main className="max-w-6xl mx-auto p-8">
              {/* Hero / Identity Section */}
              <Reveal variant="fade-up">
              <section className="relative mt-12 min-h-[70vh] flex items-center justify-center">
                {/* Tagline (top-left on large screens) */}
                <div className="absolute top-0 left-0 max-w-sm space-y-2 font-semibold text-lg md:text-xl leading-snug z-30">
                  <p>Web Developer</p>
                  <p>Graphics Designer based</p>
                  <p>in Philippines</p>
                </div>

                {/* Layer 1: Filled ROY CRUZ (base) */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
                  <h1 aria-hidden className="text-white font-extrabold leading-none tracking-tight text-center text-[16vw] md:text-[10rem]">
                    ROY CRUZ
                  </h1>
                </div>

                {/* Layer 2: Portrait PNG */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-10">
                  <div className="relative w-[62vw] max-w-[760px] aspect-[3/4]">
                    <Image
                      src="/me.png"
                      alt="Portrait of Roy Cruz"
                      fill
                      priority
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,36,0)_0%,rgba(15,23,36,0.65)_70%,rgba(15,23,36,0.9)_100%)]" />
                </div>

                {/* Layer 3: Outlined ROY CRUZ (front) */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
                  <h1 className="font-extrabold leading-none tracking-tight text-center text-transparent text-[16vw] md:text-[10rem]" style={{ WebkitTextStroke: '2px #ffffff' }}>
                    ROY CRUZ
                  </h1>
                </div>

                {/* Description + CTA (bottom-right) */}
                <div className="absolute bottom-0 right-0 max-w-sm text-sm md:text-base leading-relaxed space-y-6 z-30">
                  <p className="text-white/90">
                    Hi, I'm Roy Cruz — a web developer and Graphics Designer passionate about crafting intuitive, responsive, and visually engaging digital experiences that inspire and connect.
                  </p>
                  <Link
                    href="/design"
                    className="group inline-flex items-center gap-3 bg-white text-black rounded-full px-7 py-4 font-medium text-sm md:text-base shadow-lg shadow-black/30 hover:shadow-black/50 transition hover:bg-white/90"
                    aria-label="See my works"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full bg-black text-white group-hover:scale-110 transition-transform">→</span>
                    <span>See my works</span>
                  </Link>
                </div>
              </section>
              </Reveal>
            </main>
            </div>
            <Footer/>
          </div>
        )
}

export default AboutPage