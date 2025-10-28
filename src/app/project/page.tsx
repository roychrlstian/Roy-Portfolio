import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'
import { SmoothCursor } from '@/components/lightswind/smooth-cursor'
import Reveal from '@/components/ui/reveal'
import { logos } from '../about/logos'
import { SlidingLogoMarquee } from '@/components/lightswind/sliding-logo-marquee'
import { projectImages } from './project'
import ProjectCard from '@/components/ui/project-card'

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
                    A curated set of builds and experiments. Focusing on interaction, performance, and clean, scalable architecture. Hover on any tile to reveal the project label.
                  </p>
                </section>
              </Reveal>

              {/* Projects Grid (uses provided optimized images) */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                {[
                  { id: 1, title: 'Minimal Chat', img: projectImages[0], repo: 'https://github.com/roychrlstian/minimal_chat', color: 'from-teal-400/0 to-teal-300/10' },
                  { id: 2, title: 'ScholarBlock', img: projectImages[1], repo: 'https://github.com/teyorkk/ScholarBlock', color: 'from-indigo-400/0 to-indigo-300/10' },
                  { id: 3, title: 'Triad Pitch Deck', img: projectImages[2], repo: 'https://github.com/roychrlstian/Triad-Pitch-Deck', color: 'from-pink-400/0 to-pink-300/10' },
                ].map((p) => (
                  <ProjectCard key={p.id} title={p.title} img={p.img} repo={p.repo} color={p.color} />
                ))}
              </div>

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
                className="my-10"
                />
              </Reveal>

            </main>
            </div>
            <SmoothCursor size={30} color={"#0f1724"} rotateOnMove={true} scaleOnClick={true} glowEffect={true}/>
            <Footer/>
          </div>
        )
}

export default ProjectPage