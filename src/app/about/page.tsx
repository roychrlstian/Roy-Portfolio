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
import { supabaseClient } from '@/lib/supabaseClient'

type SkillRow = { name?: string | null; category?: string | null }
type ExperienceRow = {
  id: string
  company?: string | null
  role?: string | null
  date_start?: string | null
  date_end?: string | null
  order_index?: number | null
}

const AboutPage = () => {
  const router = useRouter();
  const [reposKey, setReposKey] = React.useState(0);
  const [reposDisabled, setReposDisabled] = React.useState(false);
  const [devSkills, setDevSkills] = React.useState<string[]>([])
  const [designSkills, setDesignSkills] = React.useState<string[]>([])
  const [skillsLoading, setSkillsLoading] = React.useState(true)
  const [skillsError, setSkillsError] = React.useState<string | null>(null)
  const [experiences, setExperiences] = React.useState<ExperienceRow[]>([])
  const [experiencesLoading, setExperiencesLoading] = React.useState(true)
  const [experiencesError, setExperiencesError] = React.useState<string | null>(null)

  function handleRefresh() {
    if (reposDisabled) return;
    setReposKey(k => k + 1);
    setReposDisabled(true);
    // cooldown 10 seconds to prevent spamming
    setTimeout(() => setReposDisabled(false), 10000);
  }

  React.useEffect(() => {
    let mounted = true
    async function loadSkills() {
      try {
        setSkillsLoading(true)
        const { data, error } = await supabaseClient
          .from('skills')
          .select('name, category')
          .order('name', { ascending: true })

        if (error) throw error
        if (!mounted) return
        const rows = (data as SkillRow[] | null) ?? []
        const dev: string[] = []
        const design: string[] = []
        for (const row of rows) {
          const name = (row.name ?? '').toString()
          const cat = (row.category ?? '').toString().toLowerCase()
          if (cat === 'dev' || cat === 'development') dev.push(name)
          else if (cat === 'design') design.push(name)
        }
        setDevSkills(dev)
        setDesignSkills(design)
        setSkillsError(null)
      } catch (err: unknown) {
        console.error('Failed to load skills from Supabase', err)
        const msg = err instanceof Error ? err.message : String(err)
        setSkillsError(msg)
      } finally {
        if (mounted) setSkillsLoading(false)
      }
    }

    loadSkills()
    return () => { mounted = false }
  }, [])

  React.useEffect(() => {
    let mounted = true
    async function loadExperience() {
      try {
        setExperiencesLoading(true)
        const { data, error } = await supabaseClient
          .from('experience')
          .select('id, company, role, date_start, date_end, order_index')
          .order('order_index', { ascending: true })

        if (error) throw error
        if (!mounted) return
        setExperiences((data as ExperienceRow[]) ?? [])
        setExperiencesError(null)
      } catch (err: unknown) {
        console.error('Failed to load experience from Supabase', err)
        const msg = err instanceof Error ? err.message : String(err)
        setExperiencesError(msg)
      } finally {
        if (mounted) setExperiencesLoading(false)
      }
    }

    loadExperience()
    return () => { mounted = false }
  }, [])
  return (
          <div className="min-h-screen page-bg text-white">
            <Navbar />
            <div className="pt-10">
              <div className='pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0'>
              {/* PixelBlast background */}
              <PixelBlast color="#0f1724" className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
              </div>
            <main className="relative max-w-6xl mx-auto mb-10 p-8">
              
              {/* Hero / Identity Section */}
              <Reveal variant="fade-up">
              <section className="relative mt-12 min-h-[70vh] flex items-center justify-center px-4 md:px-0">
                {/* Tagline (top-left on large screens) */}
                <div className="absolute top-0 left-4 md:left-27 max-w-sm space-y-1 md:space-y-2 font-semibold text-base md:text-[25px] leading-snug z-30 text-left heading-3 text-white">
                  <p className="text-white">Web Developer</p>
                  <p className="text-white">Graphics Designer based</p>
                  <p className="text-white">in Philippines</p>
                </div>

                {/* Accessible heading for SEO & screen readers */}
                <h1 className="sr-only">Roy Cruz</h1>
                
                {/* Layer 1: Filled ROY CRUZ */}
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-10">
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
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-20">
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
                <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-30">
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
                <div className="absolute bottom-4 md:bottom-[10px] left-4 md:left-auto md:right-27 max-w-sm text-xs sm:text-sm md:text-xl leading-relaxed space-y-4 md:space-y-6 z-40 text-left">
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
                <h2 className="heading-2 mb-8">
                  <span className="text-white/70 mr-2">01</span> Software skills
                </h2>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-20">
                  {/* Development & Programming */}
                  <div className="flex-1 max-w-3xl">
                    <h3 className="heading-3 mb-6">Development &amp; Programming</h3>
                    <ul className="columns-3 gap-6 list-disc list-inside font-light text-lg md:text-xl space-y-2">
                      {skillsLoading ? (
                        <li className="col-span-3 text-sm text-white/70">Loading skills…</li>
                      ) : skillsError ? (
                        <li className="col-span-3 text-sm text-rose-400">Failed to load skills</li>
                      ) : devSkills.length === 0 ? (
                        <li className="col-span-3 text-sm text-white/60">No development skills found</li>
                      ) : (
                        devSkills.map((s) => <li key={s}>{s}</li>)
                      )}
                    </ul>
                  </div>
                  {/* Design & Creative Tools */}
                  <div className="flex-1 md:max-w-sm">
                    <h3 className="heading-3 mb-6">Design &amp; Creative Tools</h3>
                    <ul className="space-y-2 list-disc list-inside text-lg md:text-xl font-light">
                      {skillsLoading ? (
                        <li className="text-sm text-white/70">Loading…</li>
                      ) : skillsError ? (
                        <li className="text-sm text-rose-400">Failed to load</li>
                      ) : designSkills.length === 0 ? (
                        <li className="text-sm text-white/60">No design skills found</li>
                      ) : (
                        designSkills.map((s) => <li key={s}>{s}</li>)
                      )}
                    </ul>
                  </div>
                </div>
                <hr className="my-10 border-white/20" />
                {/* 02 Work Experience */}
                <h2 className="heading-2 mb-10">
                  <span className="text-white/70 mr-2">02</span> Work experience
                </h2>
                <div className="flex flex-col gap-6">
                  {experiencesLoading ? (
                    <div className="text-white/70">Loading experience…</div>
                  ) : experiencesError ? (
                    <div className="text-rose-400">Failed to load experience</div>
                  ) : experiences.length === 0 ? (
                    <div className="text-white/60">No experience found</div>
                  ) : (
                    experiences.map((exp: ExperienceRow) => (
                      <div key={exp.id} className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-8 text-lg md:text-xl font-light">
                        <span className="md:w-[20%] font-medium">{exp.company}</span>
                        <span className="md:w-[30%] md:pl-4 md:text-left">{exp.role}</span>
                        <span className="md:w-[10%] md:text-center">{exp.date_start}</span>
                        <span className="md:w-[10%] md:text-center">-</span>
                        <span className="md:w-[10%] md:text-right">{exp.date_end ?? 'Present'}</span>
                      </div>
                    ))
                  )}
                </div>
                <hr className="my-10 border-white/20" />
                {/* 03 Public Repositories */}
                <h2 className="heading-2 mb-6">
                  <span className="text-white/70 mr-2">03</span> Public repositories
                </h2>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                  <p className="text-white/70 text-sm md:text-base m-0">Some of my public projects on GitHub.</p>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={reposDisabled}
                    className={`inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-medium text-white/70 transition-colors ${reposDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/10 hover:text-white'}`}
                    aria-label="Refresh public repositories">
                    {reposDisabled ? 'Refreshing…' : 'Refresh'}
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