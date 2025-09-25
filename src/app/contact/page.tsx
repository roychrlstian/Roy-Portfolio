import React from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'

const ContactPage = () => {
  return (
        <div className="min-h-screen bg-[#0f1724] text-white">
          <Navbar />
          <main className="max-w-6xl mx-auto p-8">
            <section className="mt-12 animate-fade-up">
              <h1 className="text-4xl font-bold mb-6">Contact Page</h1>
              <p className="text-lg">
                This is the contact page. You can include your contact information or a contact form here.
              </p>
            </section>
          </main>
          <Footer/>
        </div>
      )
}

export default ContactPage