import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "image.simplecastcdn.com" },
    ],
  },
  // Pin the workspace root to this app. Without it Turbopack walks up and picks
  // the parent directory's lockfile when one happens to exist alongside.
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            // No includeSubDomains/preload — those would also bind any future
            // subdomain (e.g. nms.rtmhd.tech) to HTTPS-only before it is ready.
            value: "max-age=31536000",
          },
        ],
      },
    ];
  },
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
