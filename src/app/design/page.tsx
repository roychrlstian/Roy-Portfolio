import React from 'react'
import Navbar from '../../components/ui/navbar'
import Marquee from '@/components/ui/marquee'
import Footer from '@/components/ui/footer'

const DesignPage = () => {
  return (
      <div className="min-h-screen bg-[#0f1724] text-white">
        <Navbar />
        <main className="max-w-6xl mx-auto p-8">
          <section className="mt-12 animate-fade-up">
            <h1 className="text-4xl font-bold mb-6">Design Page</h1>
            <p className="text-lg">
              This is the design page. You can showcase your design projects here.
            </p>
          </section>
        </main>
        <Footer/>
      </div>
    )
}

export default DesignPage