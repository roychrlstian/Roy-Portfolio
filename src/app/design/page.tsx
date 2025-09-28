import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import ThreeDImageRing from '@/components/lightswind/3d-image-ring'
import Marquee from '@/components/ui/marquee'
import Reveal from '@/components/ui/reveal'
import CarouselContainer from '@/components/ui/carousel-container'

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
              <div className="text-sm text-white/70">CO-FOUNDER<br/>GRAPHICS DESIGNER</div>
            </div>
            <CarouselContainer
              items={[
                {
                  title: 'Announcements',
                  wrapperClassName: 'py-10',
                  ringProps: {
                    images: [
                      '/triad/announcement/1.jpg',
                      '/triad/announcement/2.jpg',
                      '/triad/announcement/3.jpg',
                      '/triad/announcement/4.jpg',
                      '/triad/announcement/5.jpg',
                      '/triad/announcement/6.jpg',
                      '/triad/announcement/7.jpg',
                      '/triad/announcement/1.jpg',
                      '/triad/announcement/2.jpg',
                      '/triad/announcement/3.jpg',
                      '/triad/announcement/4.jpg',
                      '/triad/announcement/5.jpg',
                      '/triad/announcement/6.jpg',
                      '/triad/announcement/7.jpg',
                    ],
                    containerClassName: 'h-[420px] overflow-hidden',
                    width: 420,
                    height: 440,
                    imageDistance: 1000,
                    inertiaPower: 0.01,
                    initialRotation: 0,
                    imageFit: 'contain',
                  }
                },
                {
                  title: 'Events',
                  wrapperClassName: 'py-15',
                  ringProps: {
                    images: [
                      '/triad/event/1.jpg',
                      '/triad/event/2.jpg',
                      '/triad/event/3.jpg',
                      '/triad/event/4.jpg',
                      '/triad/event/5.png',
                      '/triad/event/1.jpg',
                      '/triad/event/2.jpg',
                      '/triad/event/3.jpg',
                      '/triad/event/4.jpg',
                      '/triad/event/5.png',
                      '/triad/event/6.jpg',
                    ],
                    containerClassName: 'h-[420px] overflow-hidden',
                    width: 450,
                    height: 550,
                    imageDistance: 1000,
                    inertiaPower: 0.01,
                    initialRotation: 0,
                    imageFit: 'contain',
                  }
                }
              ]}
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
              <div className="text-sm text-white/70">CREATIVE MANAGER<br/>GRAPHICS DESIGNER</div>
            </div>
            <CarouselContainer
              items={[{
                title: 'Public Materials',
                wrapperClassName: 'py-10',
                ringProps: {
                  images: [
                    '/lcup/1.jpg',
                    '/lcup/2.jpg',
                    '/lcup/3.jpg',
                    '/lcup/4.jpg',
                    '/lcup/5.jpg',
                    '/lcup/6.jpg',
                    '/lcup/7.jpg',
                    '/lcup/8.jpg',
                    '/lcup/9.jpg',
                    '/lcup/10.jpg',
                    '/lcup/11.jpg',
                    '/lcup/12.jpg',
                    '/lcup/13.jpg',
                    '/lcup/14.jpg',
                    '/lcup/15.jpg',
                  ],
                  containerClassName: 'h-[420px] overflow-hidden',
                  width: 420,
                  height: 440,
                  imageDistance: 1000,
                  inertiaPower: 0.01,
                  initialRotation: 0,
                  imageFit: 'contain',
                }
              }]} 
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
              <h2 className="text-4xl font-bold">FREELANCE</h2>
              <div className="text-sm text-white/70">GRAPHICS DESIGNER</div>
            </div>
            <CarouselContainer
              items={[
                {
                  title: 'Logo',
                  ringProps: {
                    images: [
                      '/freelance/logo/1.png',
                      '/freelance/logo/2.jpg',
                      '/freelance/logo/3.jpg',
                      '/freelance/logo/4.jpg',
                      '/freelance/logo/5.jpg',
                      '/freelance/logo/1.png',
                      '/freelance/logo/2.jpg',
                      '/freelance/logo/3.jpg',
                      '/freelance/logo/4.jpg',
                      '/freelance/logo/5.jpg',
                      '/freelance/logo/1.png',
                      '/freelance/logo/2.jpg',
                      '/freelance/logo/3.jpg',
                      '/freelance/logo/4.jpg',
                    ],
                    containerClassName: 'h-[420px] overflow-hidden',
                    width: 420,
                    height: 440,
                    imageDistance: 1000,
                    inertiaPower: 0.01,
                    initialRotation: 0,
                    imageFit: 'contain',
                  }
                },
                {
                  title: 'Banners',
                  wrapperClassName: 'py-10',
                  ringProps: {
                    images: [
                      '/freelance/banner/1.jpg',
                      '/freelance/banner/2.jpg',
                      '/freelance/banner/3.jpg',
                      '/freelance/banner/4.jpg',
                      '/freelance/banner/5.jpg',
                      '/freelance/banner/6.jpg',
                      '/freelance/banner/7.jpg',
                      '/freelance/banner/1.jpg',
                      '/freelance/banner/2.jpg',
                      '/freelance/banner/3.jpg',
                      '/freelance/banner/4.jpg',
                      '/freelance/banner/5.jpg',
                      '/freelance/banner/6.jpg',
                      '/freelance/banner/7.jpg',
                    ],
                    containerClassName: 'h-[420px] overflow-hidden',
                    width: 420,
                    height: 440,
                    imageDistance: 1000,
                    inertiaPower: 0.01,
                    initialRotation: 0,
                    imageFit: 'contain',
                  }
                }
              ]}
            />
            </section>
          </Reveal>
          {/*Freelance ends*/}
          </main>
        </div>
        <Reveal variant="fade-in">
            <Marquee
              speed={20}
              className="py-10 pb-20 mx-[calc(50%-50vw)] w-screen px-8"
              textClass="text-3xl md:text-6xl font-bold"
            >
              <span className="mx-4">Contact Me for Collaborations</span>
              <span className="mx-4">Contact Me for Collaborations</span>
            </Marquee>
          </Reveal>

        <Footer />
      </div>
    )
}

export default DesignPage
