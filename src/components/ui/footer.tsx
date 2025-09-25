import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const linkClass =
    "text-sm uppercase tracking-wider text-white/80 hover:text-white transition-colors duration-200";

  return (
  <footer className="fixed bottom-0 left-0 right-0 w-full bg-[#0B1019] text-white z-50 shadow-[0_-1px_0_rgba(255,255,255,0.03)]">
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
                  <Link href="#" className={linkClass}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    About
                  </Link>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="#" className={linkClass}>
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    Email
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    Linktree
                  </Link>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="#" className={linkClass}>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className={linkClass}>
                    X
                  </Link>
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
