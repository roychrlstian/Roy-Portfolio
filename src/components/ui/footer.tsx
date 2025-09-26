import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const linkClass =
    "text-sm uppercase tracking-wider text-white/80 hover:text-white transition-colors duration-200";

  return (
  <footer className="w-full bg-[#0B1019] text-white shadow-[0_-1px_0_rgba(255,255,255,0.03)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex flex-col">
              <Link href="#" className="inline-flex items-center gap-3">
                <Image src="/royLogo.svg" alt="Roy Logo" width={48} height={48} priority />
                <span className="font-semibold text-lg">Roy Cruz</span>
              </Link>
              <p className="mt-3 text-sm text-white/70 max-w-md">
                Designed and built with using Next.js, React, and Tailwind CSS. <br/>
                Open to collaborations and opportunities.
              </p>
            </div>

            <nav aria-label="Footer navigation" className="flex gap-8 md:gap-12">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="./project" className={linkClass}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="./design" className={linkClass}>
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="./contact" className={linkClass}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="./about" className={linkClass}>
                    About
                  </Link>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href="https://www.linkedin.com/in/roy-christian-cruz-19b699310/" className={linkClass} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/roychrlstian" className={linkClass} target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </li>
                <li>
                  <a href="mailto:roychristian.cruz@email.lcup.edu.ph?subject=Portfolio Inquiry" className={linkClass} target="_blank" rel="noopener noreferrer">
                    Email
                  </a>
                </li>
                <li>
                  <a href="https://linktr.ee/roychrlstian" className={linkClass} target="_blank" rel="noopener noreferrer">
                    Linktree
                  </a>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li>
                  <a href="http://facebook.com/roychrlstian" className={linkClass} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="http://instagram.com/roychrlstian" className={linkClass} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="http://x.com/roychrlstian" className={linkClass} target="_blank" rel="noopener noreferrer">
                    X
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-white/6 pt-6 text-sm text-white/60">
          © {new Date().getFullYear()} Roy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
