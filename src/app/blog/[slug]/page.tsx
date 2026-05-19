import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files.map((f) => ({ slug: f.replace(".mdx", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.data.title,
    description: post.data.excerpt,
    openGraph: {
      title: post.data.title,
      description: post.data.excerpt,
      type: "article",
      publishedTime: post.data.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen bg-[var(--bg)] pt-28">
        <article className="mx-auto max-w-[700px] px-6 md:px-10 pb-24">
          <Link
            href="/blog"
            className="eyebrow text-[var(--fg)] opacity-40 hover:opacity-100 hover:text-brand-orange transition-all mb-10 inline-block"
          >
            ← BACK TO BLOG
          </Link>

          <div className="mb-10">
            <div className="eyebrow text-brand-orange mb-4">
              {new Date(post.data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h1
              className="font-display font-black text-[var(--fg)] mb-6"
              style={{
                fontSize: "clamp(2rem, 6vw, 3.8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              {post.data.title}
            </h1>
            {post.data.excerpt && (
              <p
                className="text-[var(--fg)] opacity-60"
                style={{ fontSize: "1.15rem", lineHeight: 1.65 }}
              >
                {post.data.excerpt}
              </p>
            )}
            {post.data.tags && (
              <div className="flex flex-wrap gap-2 mt-5">
                {post.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange"
                    style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <hr className="border-[var(--border)] mb-10" />

          <div className="prose-content">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
