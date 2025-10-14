"use client";
import Link from "next/link";
import SmokeyCursor from "../components/lightswind/smokey-cursor";
import { SmoothCursor } from "@/components/lightswind/smooth-cursor";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen page-bg py-10">
      <Link href="/about" className="shine-link heading-hero gradient-text font-bold py-2 px-6 rounded-md shadow-glow">
        <span className="label-normal">NEXT</span>
        <span className="label-hover">&gt;&gt;&gt;&gt;</span>
      </Link>
      <SmoothCursor size={30} color={"#0f1724"} rotateOnMove={true} scaleOnClick={true} glowEffect={true}/>
      <SmokeyCursor/>
    </div>
  );
}
