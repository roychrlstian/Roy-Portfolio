import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Explicitly set turbopack.root to this project's directory to avoid
  // Next.js inferring a different workspace root when multiple lockfiles
  // exist on the filesystem (e.g. a global `package-lock.json` under
  // `C:\Users\royli`).
  turbopack: {
    // path.resolve(__dirname) resolves to this project's absolute path.
    root: path.resolve(__dirname),
  },
  // Allow Next/Image to load images from the Supabase storage public URL for this project.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL
          ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
          : 'qgufibdmpkbuthbsxcel.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
