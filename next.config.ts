import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    NEXT_PUBLIC_HARVARD_API_KEY: '7d848129-3a3c-4008-b3bf-0ecce51cfd7a',
  }, 
  images: {
    domains: ['openaccess-cdn.clevelandart.org', 'www.artic.edu']
  },
  async headers() {
    return [
      {source: "/(.*)",
        headers: [
          {
            key: 'x-vercel-protection-bypass',
            value: process.env.VERCEL_PROTECTION_BYPASS_SECRET || "",
          }
        ]
      }
    ]
  }
};

export default nextConfig;
