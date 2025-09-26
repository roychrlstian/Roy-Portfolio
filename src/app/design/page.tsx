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
                  <div className='py-20'>
                    <ThreeDImageRing
                    images={[
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
                    imageDistance={500}
                    initialRotation={0}
                    imageFit="contain"
                    />
                  </div>
                  
                </div>
                <div className='mt-6 border-t border-white/6 pt-6'>
                  <h2 className="text-2xl font-bold mb-4">Events</h2>
                  <div className='py-20'>
                  <ThreeDImageRing
                    images={[
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
                    imageDistance={400}
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
          
        </main>
        <Marquee speed={20} className="py-10" textClass="text-7xl md:text-4x1 font-bold">
          <span className="mx-4">Welcome to My Portfolio</span>
          <span className="mx-4">Explore My Projects</span>
          <span className="mx-4">Contact Me for Collaborations</span>
          <span className="mx-4">Designs and More</span>
        </Marquee>
        <Footer />
      </div>
    )
}

export default DesignPage