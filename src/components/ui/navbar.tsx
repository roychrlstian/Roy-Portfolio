"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <Image src="/royLogo.svg" alt="Roy Logo" width={40} height={40} priority />
        <span className="text-white font-bold">Roy</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavLink href="/project">Projects</NavLink>
        <NavLink href="/design">Design</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>

      <button
        className="md:hidden p-2 rounded bg-white/10"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#2038A9] md:hidden py-4">
          <div className="flex flex-col items-center gap-3">
            <NavLink href="/project">Projects</NavLink>
            <NavLink href="/design">Design</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative inline-block text-white font-medium py-1 px-2 overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </Link>
  );
}
