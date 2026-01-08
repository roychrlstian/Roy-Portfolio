"use client";
import React, { useRef, useState } from 'react'
import Navbar from '../../components/ui/navbar'
import Footer from '@/components/ui/footer'
import Link from 'next/link'
import Reveal from '@/components/ui/reveal';
import Marquee from '@/components/ui/marquee';
import { SmoothCursor } from '@/components/lightswind/smooth-cursor';
import { ArrowRight } from 'lucide-react';

// If future client-side validation or submission is needed, convert to client component.
const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com/roychrlstian', icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.99 3.63 9.13 8.38 9.93v-7.03H7.9v-2.9h2.34V9.64c0-2.32 1.38-3.6 3.49-3.6.99 0 2.03.18 2.03.18v2.23h-1.14c-1.13 0-1.48.7-1.48 1.42v1.7h2.52l-.4 2.9h-2.12V22c4.75-.8 8.38-4.94 8.38-9.93Z" />
      </svg>) },
  { name: 'Instagram', href: 'https://instagram.com/roychrlstian', icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5Zm4.75-4.25a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25Z" />
      </svg>) },
  { name: 'GitHub', href: 'https://github.com/roychrlstian', icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.2 9.2 0 0 1 2.5-.35 9.2 9.2 0 0 1 2.5.35c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.02 1.63 1.02 2.75 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" clipRule="evenodd" />
      </svg>) },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/roy-christian-cruz-19b699310', icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5.001ZM3 9h4v12H3V9Zm7.5 0h3.8v1.71h.05c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-1.99 1.35-1.99 2.74V21h-4V9Z" />
      </svg>) },
  { name: 'X', href: 'https://x.com/roychrlstian', icon: (
      <span className="font-bold text-sm">X</span>
    ) }
]

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [justCleared, setJustCleared] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // (Future: send data via fetch here)
    e.currentTarget.reset();
    setJustCleared(true);
    // remove flag after a short delay
    setTimeout(() => setJustCleared(false), 2000);
  };
  return (
    <div className="min-h-screen bg-[#0f1724] text-white flex flex-col">
      
      <Navbar />

      <main className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="relative md:flex md:items-start md:gap-20 lg:gap-24">

            {/* Left Intro */}
            <div className="md:w-1/2 pr-0 md:pr-10 space-y-12">
              <p className="text-3xl md:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight max-w-[560px]">
                Have a project in mind or just want to say hello? Feel free to reach out. I&apos;m always open to discussing new ideas, collaborations, or opportunities to create something impactful together.
              </p>
              <div className="pt-2 md:pt-4">
                <p className="mb-4 text-sm md:text-base text-white/60 font-medium">Follow Me:</p>
                <div className="flex items-center gap-4 flex-wrap">
                  {SOCIAL_LINKS.map(link => (
                    <Link key={link.name} href={link.href} aria-label={link.name} target="_blank" className="group">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-white group-hover:scale-110 transition-transform">
                          {link.icon}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="mt-14 md:mt-0 md:w-1/2 md:pl-10 space-y-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                <div className="space-y-8">
                  {/* Name */}
                  <div className="group relative">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name Here"
                      className="w-full bg-transparent border-0 border-b border-white/40 focus:border-white outline-none py-3 text-base placeholder:text-white/40 transition-colors"
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="group relative">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your Email Here"
                      className="w-full bg-transparent border-0 border-b border-white/40 focus:border-white outline-none py-3 text-base placeholder:text-white/40 transition-colors"
                      required
                    />
                  </div>
                  {/* Select */}
                  <div className="group relative">
                    <label htmlFor="topic" className="sr-only">Topic</label>
                    <select
                      id="topic"
                      name="topic"
                      defaultValue=""
                      className="w-full appearance-none bg-[#0f1724] focus:bg-[#0f1724] hover:bg-[#0f1724] border-0 border-b border-white/40 focus:border-white outline-none py-3 text-base pr-6 text-white/90 placeholder:text-white/40 transition-colors"
                      required
                    >
                      <option value="" disabled>How can I help you?</option>
                      <option value="web">Web Development</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="graphic">Graphic Design</option>
                      <option value="collab">Collaboration</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/50 text-sm">▾</span>
                  </div>
                  {/* Message */}
                  <div className="group relative">
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      rows={4}
                      className="w-full resize-y bg-transparent border-0 border-b border-white/40 focus:border-white outline-none py-3 text-base placeholder:text-white/40 transition-colors min-h-[120px]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 hover:border-white px-14 h-14 text-sm tracking-wide font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={justCleared}
                  >
                    <span>{justCleared ? 'CLEARED' : 'LET\'S TALK'}</span>
                    {!justCleared && (
                      <span
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        <ArrowRight />
                      </span>
                    )}
                  </button>
                  <div className="sr-only" aria-live="polite">{justCleared ? 'Form cleared' : ''}</div>
                </div>
              </form>
            </div>
          </div>
          
            <Reveal variant="fade-in">
              <Marquee
                speed={20}
                className="pt-30 pb-20 mx-[calc(50%-50vw)] w-screen px-8 mb-6"
                textClass="text-3xl md:text-7xl font-bold"
              >
                <span className="mx-4">Get In Touch!</span>
                <span className="mx-4">Get In Touch!</span>
                <span className="mx-4">Get In Touch!</span>
              </Marquee>
            </Reveal>

        </div>
      </main>
      <SmoothCursor size={30} color={"#0f1724"} rotateOnMove={true} scaleOnClick={true} glowEffect={true}/> 
      <Footer />
    </div>
  )
}

export default ContactPage