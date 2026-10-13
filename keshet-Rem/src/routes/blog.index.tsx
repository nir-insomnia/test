import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ChevronLeft, Sparkles } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { home, school } from "@/content/site";
import { formatDate, posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `בלוג | ${school.track} | ${school.name}` },
      {
        name: "description",
        content:
          "עדכונים, פעילויות וסיפורים של תלמידים ממגמת מדעי המחשב בבית ספר קשת ראם.",
      },
      { property: "og:title", content: `בלוג המגמה | ${school.name}` },
      {
        property: "og:description",
        content: "עדכונים, פעילויות וסיפורים של תלמידים ממגמת מדעי המחשב.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main id="top" className="bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
            <span className="h-px w-8 bg-primary" />
            {home.blog.eyebrow}
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] sm:text-7xl">
            {home.blog.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted-foreground">
            {home.blog.copy}
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {posts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card p-14 text-center">
              <Sparkles className="mx-auto size-10 text-primary" />
              <h2 className="mt-5 text-2xl font-black">עוד לא יש פוסטים</h2>
              <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
                כדי לפרסם פוסט ראשון, יוצרים קובץ חדש בתיקיית
                <span className="font-mono" dir="ltr">
                  {" "}
                  src/content/posts
                </span>
                . ההסבר המלא נמצא בקובץ
                <span className="font-mono" dir="ltr">
                  {" "}
                  src/content/README.md
                </span>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-surface-deep">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="grid size-full place-items-center">
                        <Sparkles className="size-10 text-primary/70" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Calendar className="size-4 text-primary" />
                      {formatDate(post.date)}
                    </div>
                    <h2 className="mt-3 text-2xl font-black leading-snug group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 leading-7 text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                      לקריאה <ChevronLeft className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
