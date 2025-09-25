import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'

const AboutPage = () => {
  return (
          <div className="min-h-screen bg-[#0f1724] text-white">
            <Navbar />
            <main className="max-w-6xl mx-auto p-8">
              <section className="mt-12 animate-fade-up">
                <h1 className="text-4xl font-bold mb-6">About Page</h1>
                <p className="text-lg">
                  This is the about page. You can include information about yourself or your portfolio here.
                </p>
              </section>
            </main>
            <Footer/>
          </div>
        )
}

export default AboutPage