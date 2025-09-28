import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Marquee from '@/components/ui/marquee'
import Reveal from '@/components/ui/reveal'
import CarouselContainer from '@/components/ui/carousel-container'
import { sectionConfigs, ringDefaults } from './image'

const DesignPage = () => {
  return (
      <div className="min-h-screen bg-[#0f1724] text-white overflow-x-hidden">
        <Navbar />
        <div className="pt-10">
          <main className="max-w-6xl mx-auto p-8">
          <Reveal variant="fade-up">
            <section className="mt-12">
              <h1 className="text-7xl font-bold mb-6">MY DESIGNS</h1>
              <p className="text-xl">
                Welcome to My Designs a collection of creative works that showcase my approach to design, blending aesthetics with functionality. From modern UI layouts to experimental concepts, each piece reflects my focus on clean visuals, user experience, and attention to detail.
              </p>
            </section>
          </Reveal>

          {/*Triad starts*/}
          <Reveal variant="fade-up" className="mt-12 block">
            <section className="mt-0">
            <div className="flex items-center justify-between mt-6 border-t border-white/6 pt-6">
              <h2 className="text-4xl font-bold">TRIAD COMMUNITY</h2>
              <div className="text-sm text-white/70">CO-FOUNDER</div>
            </div>
            <CarouselContainer
              items={sectionConfigs.triad.map(item => ({
                title: item.title,
                ...(item.wrapperClassName && { wrapperClassName: item.wrapperClassName }),
                ringProps: {
                  ...ringDefaults,
                  // triad may include ringOverrides only on specific items
                  ...(('ringOverrides' in item) ? (item as any).ringOverrides : {}),
                  images: item.images,
                },
              }))}
            />
            </section>
          </Reveal>
          {/*Triad ends*/}

          <Reveal variant="fade-in">
            <Marquee
              speed={20}
              className="py-10 mx-[calc(50%-50vw)] w-screen px-8"
              textClass="text-3xl md:text-6xl font-bold"
            >
              <span className="mx-4">Explore My Designs</span>
              <span className="mx-4">Explore My Designs</span>
            </Marquee>
          </Reveal>

          {/*LCUP starts*/}
          <Reveal variant="fade-up" className="block">
            <section className="mt-0">
            <div className="flex items-center justify-between mt-6 border-t border-white/6 pt-6">
              <h2 className="text-4xl font-bold">LA CONSOLACION UNIVERSITY PHILIPPINES</h2>
              <div className="text-sm text-white/70">CREATIVE MANAGER</div>
            </div>
            <CarouselContainer
              items={sectionConfigs.lcup.map(item => ({
                title: item.title,
                ...(item.wrapperClassName && { wrapperClassName: item.wrapperClassName }),
                ringProps: {
                  ...ringDefaults,
                  images: item.images,
                },
              }))}
            />
            </section>
          </Reveal>
          {/*LCUP ends*/}

          <Reveal variant="fade-in">
            <Marquee
              speed={20}
              className="py-10 mx-[calc(50%-50vw)] w-screen px-8"
              textClass="text-3xl md:text-6xl font-bold"
            >
              <span className="mx-4">Contact Me for Collaborations</span>
              <span className="mx-4">Contact Me for Collaborations</span>
            </Marquee>
          </Reveal>

          {/*Freelance starts*/}
          <Reveal variant="fade-up" className="block">
            <section className="mt-0">
            <div className="flex items-center justify-between mt-6 border-t border-white/6 pt-6">
              <h2 className="text-4xl font-bold">FREELANCER</h2>
              <div className="text-sm text-white/70">GRAPHICS DESIGNER</div>
            </div>
            <CarouselContainer
              items={sectionConfigs.freelance.map(item => ({
                title: item.title,
                ...(item.wrapperClassName && { wrapperClassName: item.wrapperClassName }),
                ringProps: {
                  ...ringDefaults,
                  images: item.images,
                },
              }))}
            />
            </section>
          </Reveal>
          {/*Freelance ends*/}
          </main>
        </div>
        <Footer />
      </div>
    )
}

export default DesignPage
