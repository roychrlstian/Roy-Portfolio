import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'

const ProjectPage = () => {
  return (
          <div className="min-h-screen bg-[#0f1724] text-white">
            <Navbar />
            <div className="pt-10">
            <main className="max-w-6xl mx-auto p-8">
              <section className="mt-12 animate-fade-up">
                <h1 className="text-4xl font-bold mb-6">Project Page</h1>
                <p className="text-lg">
                  This is the project page. You can showcase your projects here.
                </p>
              </section>
            </main>
            </div>
            <Footer/>
          </div>
        )
}

export default ProjectPage