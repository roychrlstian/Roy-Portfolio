import React from 'react'
import Navbar from '../../components/ui/navbar'

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0f1724] text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto p-8">
        <section className="mt-12 animate-fade-up">
          <h1 className="text-4xl font-bold">Welcome to the landing page</h1>
          <p className="mt-4 text-lg text-white/80">This is the landing area. Replace with your content.</p>
        </section>
      </main>
    </div>
  )
}

export default Landing
