import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import ThreeDImageRing from '@/components/lightswind/3d-image-ring'
import Marquee from '@/components/ui/marquee'

const DesignPage = () => {
  return (
      <div className="min-h-screen bg-[#0f1724] text-white">
        <Navbar />
        <main className="max-w-6xl mx-auto p-8">
          <section className="mt-12 animate-fade-up">
            <h1 className="text-7xl font-bold mb-6">MY DESIGNS</h1>
            <p className="text-xl">
              Welcome to My Designs a collection of creative works that showcase my approach to design, blending aesthetics with functionality. From modern UI layouts to experimental concepts, each piece reflects my focus on clean visuals, user experience, and attention to detail.
            </p>
          </section>

          {/*Triad starts*/}
          <section className="mt-12">
            <div className="flex items-center justify-between mt-6 border-t border-white/6 pt-6">
              <h2 className="text-2xl font-bold">TRIAD COMMUNITY</h2>
              <div className="text-sm text-white/70">CO-FOUNDER<br/>GRAPHICS DESIGNER</div>
            </div>
            {/*carousel starts here*/}
            <div className="mt-6 border-y border-white/6 py-6">
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Announcements</h2>
                  <div className='py-10'>
                    <ThreeDImageRing
                    images={[
                      '/announcement/1.jpg',
                      '/announcement/2.jpg',
                      '/announcement/3.jpg',
                      '/announcement/4.jpg',
                      '/announcement/5.jpg',
                      '/announcement/6.jpg',
                      '/announcement/7.jpg',
                      '/announcement/1.jpg',
                      '/announcement/2.jpg',
                      '/announcement/3.jpg',
                      '/announcement/4.jpg',
                      '/announcement/5.jpg',
                      '/announcement/6.jpg',
                      '/announcement/7.jpg',
                    ]}
                    containerClassName="h-[420px] overflow-visible"
                    width={420}
                    height={440}
                    imageDistance={1000}
                    initialRotation={0}
                    imageFit="contain"
                    />
                  </div>
                </div>
                <div className='mt-6 border-t border-white/6 pt-6'>
                  <h2 className="text-2xl font-bold mb-4">Events</h2>
                  <div className='py-15'>
                  <ThreeDImageRing
                    images={[
                      '/event/1.jpg',
                      '/event/2.jpg',
                      '/event/3.jpg',
                      '/event/4.jpg',
                      '/event/5.png',
                      '/event/6.jpg',
                      '/event/1.jpg',
                      '/event/2.jpg',
                      '/event/3.jpg',
                      '/event/4.jpg',
                      '/event/5.png',
                      '/event/6.jpg',
                    ]}
                    containerClassName="h-[420px] overflow-visible"
                    width={450}
                    height={550}
                    imageDistance={1000}
                    initialRotation={0}
                    imageFit="contain"
                  />
                  </div>
                </div>
              </div>
            </div>
            {/*carousel ends here*/}
          </section>
          {/*Triad ends*/}
          <Marquee
            speed={20}
            className="py-10 mx-[calc(50%-50vw)] w-screen px-8"
            textClass="text-7xl md:text-6xl font-bold"
          >
            <span className="mx-8">Explore My Designs</span>
            <span className="mx-8">Contact Me for Collaborations</span>
          </Marquee>
          {/*LCUP starts*/}
          <section className="mt-12">
            <div className="flex items-center justify-between mt-6 border-t border-white/6 pt-6">
              <h2 className="text-2xl font-bold">LA CONSOLACION UNIVERSITY PHILIPPINES</h2>
              <div className="text-sm text-white/70">CREATIVE MANAGER<br/>GRAPHICS DESIGNER</div>
            </div>
            {/*carousel starts here*/}
            <div className="mt-6 border-y border-white/6 py-6">
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Announcements</h2>
                  <div className='py-10'>
                    <ThreeDImageRing
                    images={[
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
                      "/lcup/11.jpg",
                      "/lcup/12.jpg",
                      "/lcup/13.jpg",
                      "/lcup/14.jpg",
                      "/lcup/15.jpg",
                    ]}
                    containerClassName="h-[420px] overflow-visible"
                    width={420}
                    height={440}
                    imageDistance={1000}
                    initialRotation={0}
                    imageFit="contain"
                    />
                  </div>
                </div>  
              </div>
            </div>
            {/*carousel ends here*/}
          </section>
          {/*LCUP ends*/}
        </main>

        <Footer />
      </div>
    )
}

export default DesignPage