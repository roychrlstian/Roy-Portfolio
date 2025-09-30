"use client";
import Link from "next/link";
import SmokeyCursor from "../components/lightswind/smokey-cursor";
import { SmoothCursor } from "@/components/lightswind/smooth-cursor";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 shadow-2xs bg-[#0f1724]">
      <Link href="/about" className="shine-link text-center text-inter text-3xl text-white text-shadow-2xs font-bold border-5 py-1.5 px-4 rounded-xs rounded-br-xl">
        <span className="label-normal">NEXT</span>
        <span className="label-hover">&gt;&gt;&gt;&gt;</span>
      </Link>
      <SmoothCursor size={30} color={"#0f1724"} rotateOnMove={true} scaleOnClick={true} glowEffect={true}/>
      <SmokeyCursor/>
    </div>
  );
}
