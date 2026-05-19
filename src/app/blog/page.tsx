import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Network engineering insights, career stories, and technical deep-dives from Rodgers T. Momanyi — RTM-HD.",
};

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
}

function getPosts(): PostMeta[] {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(".mdx", ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        coverImage: data.coverImage,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <main className="min-h-screen bg-[var(--bg)] pt-28 pb-0">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <div className="mb-12">
            <span className="eyebrow text-brand-orange block mb-4">Blog</span>
            <h1
              className="font-display font-black text-[var(--fg)]"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Thoughts on<br />
              <span className="text-brand-orange">Networks &amp; Beyond.</span>
            </h1>
          </div>

          {posts.length === 0 ? (
            <p className="text-[var(--fg)] opacity-50">No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block border border-[var(--border)] rounded-2xl p-7 md:p-9 hover:border-brand-orange transition-colors duration-300"
                >
                  <div className="eyebrow text-brand-orange mb-3">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h2
                    className="font-display font-bold text-[var(--fg)] group-hover:text-brand-orange transition-colors mb-3"
                    style={{
                      fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-[var(--fg)] opacity-60 mb-5"
                    style={{ fontSize: "1rem", lineHeight: 1.6 }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange"
                        style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="eyebrow text-[var(--fg)] opacity-40 group-hover:text-brand-orange group-hover:opacity-100 transition-all">
                    READ MORE →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
