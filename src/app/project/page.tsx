import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'
import { SmoothCursor } from '@/components/lightswind/smooth-cursor'
import Reveal from '@/components/ui/reveal'

const ProjectPage = () => {
  return (
          <div className="min-h-screen bg-[#0f1724] text-white">
            <Navbar />
            <div className="pt-10">
            <main className="max-w-6xl mx-auto p-8">

              <Reveal variant="fade-up">
                <section className="mt-12">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">MY PROJECTS</h1>
                  <p className="text-lg md:text-xl max-w-4xl leading-relaxed text-white/90">
                    A curated set of builds and experiments—focusing on interaction, performance, and clean, scalable architecture. Hover (or tap) on any tile to reveal the project label.
                  </p>
                </section>
              </Reveal>

              {/* 2x2 Project Grid */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {[
                  { id: 1, title: 'PROJECT 01', desc: 'Description', href: '#', color: 'from-teal-400/0 to-teal-300/10' },
                  { id: 2, title: 'PROJECT 02', desc: 'Description', href: '#', color: 'from-indigo-400/0 to-indigo-300/10' },
                  { id: 3, title: 'PROJECT 03', desc: 'Description', href: '#', color: 'from-pink-400/0 to-pink-300/10' },
                  { id: 4, title: 'PROJECT 04', desc: 'Description', href: '#', color: 'from-amber-400/0 to-amber-300/10' },
                ].map((p) => (
                  <div key={p.id} className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-[#111a27]">
                    {/* Subtle gradient accent */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    {/* Overlay content */}
                    <a href={p.href} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-wide mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{p.title}</h3>
                      <p className="text-sm md:text-base text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{p.desc}</p>
                    </a>
                    {/* Base idle indicator (center dot) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white/20 group-hover:scale-0 transition-transform duration-300" />
                    </div>
                    {/* Hover ring */}
                    <div className="pointer-events-none absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-lg transition-colors duration-300" />
                    {/* Radial reveal mask */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
                  </div>
                ))}
              </div>
            </main>
            </div>
            <SmoothCursor size={30} color={"#0f1724"} rotateOnMove={true} scaleOnClick={true} glowEffect={true}/>
            <Footer/>
          </div>
        )
}

export default ProjectPage