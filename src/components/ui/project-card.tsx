"use client"
import React from 'react'
import Image from 'next/image'

type ProjectCardProps = {
  title: string
  img?: string | null
  repo?: string | null
  color?: string
}

export default function ProjectCard({ title, img, repo, color = 'from-teal-400/0 to-teal-300/10' }: ProjectCardProps) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-[#111a27]">
      <div className="absolute inset-0 select-none">
        {img ? (
          <>
            <Image src={img} alt={title} fill className="object-cover" draggable={false} onDragStart={(e) => e.preventDefault()} />
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`} />
          </>
        ) : (
          // If no image, render a subtle background so card still looks intentional
          <div className="absolute inset-0 bg-gradient-to-br from-[#08121a] to-[#0b1320]" />
        )}
        {/* solid dark overlay on hover to ensure text/button contrast */}
        <div className="absolute inset-0 bg-[#0f1724] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-wide mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">{title}</h3>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {repo ? (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm pointer-events-auto z-20">
                View Code
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60">No code available</div>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-lg transition-colors duration-300" />
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35),transparent_60%)] pointer-events-none z-0" />
    </div>
  )
}
