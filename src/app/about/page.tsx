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

                {/* Accessible heading for SEO & screen readers */}
                <h1 className="sr-only">Roy Cruz</h1>

                {/* Layer 1: Filled ROY CRUZ */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0">
                  <div className="relative w-[80vw] md:w-[1000px] max-w-[1200px] aspect-[9/2]">
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
                  <div className="relative w-[62vw] max-w-[760px] aspect-[3/4]">
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
                  <div className="relative w-[80vw] md:w-[1000px] max-w-[1200px] aspect-[9/2]">
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
                <div className="absolute bottom-0 right-0 max-w-sm text-sm md:text-base leading-relaxed space-y-6 z-30">
                  <p className="text-white/90">
                    Hi, I&apos;m Roy Cruz — a web developer and Graphics Designer passionate about crafting intuitive, responsive, and visually engaging digital experiences that inspire and connect.
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