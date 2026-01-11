import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'
import { SmoothCursor } from '@/components/lightswind/smooth-cursor'
import Reveal from '@/components/ui/reveal'
import { logos } from '../about/logos'
import { SlidingLogoMarquee } from '@/components/lightswind/sliding-logo-marquee'
import ProjectCard from '@/components/ui/project-card'
import { supabaseServer } from '@/lib/supabaseServer'

type ProjectRow = {
  id: string
  title: string
  image_url: string | null
  github_url: string | null
  is_published: boolean
  order_index: number | null
}

const ProjectPage = async () => {
  let projects: ProjectRow[] = []
  let fetchError: string | null = null

  try {
    const { data, error } = await supabaseServer
      .from('projects')
      .select('id, title, image_url, github_url, is_published, order_index')
      .eq('is_published', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    projects = (data as ProjectRow[]) ?? []
  } catch (err: unknown) {
    console.error('Failed to load projects:', err)
    fetchError = err instanceof Error ? err.message : String(err)
  }

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

          {/* Projects Grid (sourced from Supabase projects table) */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {fetchError ? (
              <div className="text-rose-400">Failed to load projects: {fetchError}</div>
            ) : projects.length === 0 ? (
              <div className="text-white/60">No projects found</div>
            ) : (
              projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  img={p.image_url ?? undefined}
                  repo={p.github_url ?? undefined}
                  color={undefined}
                />
              ))
            )}
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