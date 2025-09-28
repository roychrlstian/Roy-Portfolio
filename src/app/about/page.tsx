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

                {/* Center image behind text */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[60vw] max-w-[640px] aspect-[3/4] opacity-95">
                    <Image
                      src="/me.png"
                      alt="Silhouette portrait of Roy Cruz"
                      fill
                      priority
                      className="object-contain object-center drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                    />
                  </div>
                  {/* subtle radial gradient vignette for contrast */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,36,0)_0%,rgba(15,23,36,0.65)_70%,rgba(15,23,36,0.9)_100%)]" />
                </div>

                {/* Giant Name */}
                <h1 className="relative z-20 text-[16vw] md:text-[10rem] leading-none font-extrabold tracking-tight text-white text-center">
                  <span className="block">ROY <span className="align-top inline-block text-transparent" style={{ WebkitTextStroke: '2px #ffffff' }}>CRUZ</span></span>
                </h1>

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