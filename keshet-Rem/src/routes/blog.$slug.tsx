import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Calendar, ChevronLeft, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { home, school } from "@/content/site";
import { formatDate, getPost, posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} | ${school.track}`
          : `בלוג | ${school.name}`,
      },
      {
        name: "description",
        content: loaderData?.description || "פוסט בבלוג המגמה של קשת ראם.",
      },
      {
        property: "og:title",
        content: loaderData?.title || `בלוג | ${school.name}`,
      },
      {
        property: "og:description",
        content: loaderData?.description || "פוסט בבלוג המגמה של קשת ראם.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();
  const others = posts.filter((other) => other.slug !== post.slug).slice(0, 2);

  return (
    <main id="top" className="bg-background text-foreground">
      <SiteHeader />

      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowRight className="size-4" /> חזרה לבלוג
          </Link>

          <div className="mt-8 flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Calendar className="size-4 text-primary" />
            {formatDate(post.date)}
          </div>

          <h1 className="mt-4 text-4xl font-black leading-[1.1] sm:text-6xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-6 text-xl leading-9 text-muted-foreground">
              {post.description}
            </p>
          )}

          {post.image && (
            <img
              src={post.image}
              alt=""
              className="mt-10 w-full rounded-lg object-cover"
            />
          )}

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="markdown mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-border bg-surface-soft py-16">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <h2 className="text-2xl font-black">עוד במגמה</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  to="/blog/$slug"
                  params={{ slug: other.slug }}
                  className="group rounded-lg border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Sparkles className="size-4 text-primary" />
                    {formatDate(other.date)}
                  </div>
                  <h3 className="mt-3 text-xl font-black leading-snug group-hover:text-primary">
                    {other.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    לקריאה <ChevronLeft className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
