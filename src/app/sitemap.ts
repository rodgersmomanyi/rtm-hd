import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rtmhd.tech";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return staticRoutes;

  const blogRoutes: MetadataRoute.Sitemap = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        url: `${base}/blog/${file.replace(".mdx", "")}`,
        lastModified: data.date ? new Date(data.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

  return [...staticRoutes, ...blogRoutes];
}
