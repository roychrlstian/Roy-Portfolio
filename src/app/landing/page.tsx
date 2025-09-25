import React from 'react'
import Navbar from '../../components/ui/navbar'
import Marquee from '@/components/ui/marquee'

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0f1724] text-white">
      <Navbar />
      <Marquee speed={20} className="py-10" textClass="text-7xl md:text-4x1 font-bold">
        <span className="mx-4">Welcome to My Portfolio</span>
        <span className="mx-4">Explore My Projects</span>
        <span className="mx-4">Contact Me for Collaborations</span>
        <span className="mx-4">Designs and More</span>
      </Marquee>
      <main className="max-w-6xl mx-auto p-8">
        <section className="mt-12 animate-fade-up">
          
        </section>
      </main>
    </div>
  )
}

export default Landing
