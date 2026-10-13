import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  Braces,
  Calendar,
  Check,
  ChevronLeft,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { contact, home, school } from "@/content/site";
import { curriculum, matriculationUnits } from "@/content/curriculum";
import { projects } from "@/content/projects";
import { formatDate, latestPosts } from "@/lib/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "מגמת מדעי המחשב | קשת ראם" },
      {
        name: "description",
        content: "מגלים, יוצרים ומשפיעים במגמת מדעי המחשב של בית ספר קשת ראם.",
      },
      { property: "og:title", content: "מגמת מדעי המחשב | קשת ראם" },
      {
        property: "og:description",
        content:
          "תכנות, אלגוריתמיקה, פיתוח Web, סייבר ובינה מלאכותית — במסלול 5 או 10 יח״ל.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function scrollTo(id: string) {
  document
    .querySelector(`#${id}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function HeroVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[540px]"
      aria-hidden="true"
    >
      <div className="absolute inset-[8%] rounded-full border border-primary/20" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-olive/30" />
      <div className="absolute inset-[29%] grid place-items-center rounded-full bg-surface-deep shadow-2xl shadow-primary/20">
        <Code2 className="size-24 text-primary sm:size-32" strokeWidth={1.35} />
        <div className="absolute inset-x-[12%] top-[30%] h-px bg-primary/50 animate-scan-line" />
      </div>
      <div className="absolute start-[3%] top-[19%] animate-code-float rounded-lg border border-border bg-card p-4 shadow-xl [animation-delay:-1s]">
        <Braces className="size-8 text-amber" />
      </div>
      <div className="absolute end-[4%] top-[16%] animate-code-float rounded-lg border border-border bg-card p-4 shadow-xl [animation-delay:-2.5s]">
        <Cpu className="size-8 text-primary" />
      </div>
      <div className="absolute bottom-[9%] start-[15%] animate-code-float rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm font-semibold text-olive [animation-delay:-3.5s]">
        {"<future />"}
      </div>
      {[
        "top-[9%] start-[42%]",
        "bottom-[22%] end-[5%]",
        "bottom-[2%] start-[51%]",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} size-3 rounded-full bg-amber shadow-[0_0_0_7px_color-mix(in_oklab,var(--amber)_14%,transparent)]`}
        />
      ))}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
        <span className="h-px w-8 bg-primary" />
        {eyebrow}
      </p>
      <h2 className="text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{copy}</p>
    </div>
  );
}

const featureIcons = [Lightbulb, Rocket, Users, GraduationCap];

function Index() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;
  const posts = latestPosts(3);

  return (
    <main id="top" className="bg-background text-foreground">
      <SiteHeader />

      <section className="relative flex min-h-[min(900px,100svh)] items-center overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary">
              <Sparkles className="size-4" /> {home.hero.badge}
            </div>
            <h1 className="text-5xl font-black leading-[1.05] text-foreground sm:text-7xl lg:text-8xl">
              {home.hero.titleTop}
              <br />
              <span className="text-primary">{home.hero.titleBottom}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-muted-foreground sm:text-2xl">
              {home.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo("curriculum")}
                className="h-14 rounded-full px-8 text-base"
              >
                {home.hero.primaryCta} <ArrowLeft className="size-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("projects")}
                className="h-14 rounded-full px-8 text-base shadow-none"
              >
                {home.hero.secondaryCta}
              </Button>
            </div>
          </div>
          <HeroVisual />
        </div>
        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-7 start-1/2 hidden -translate-x-1/2 text-muted-foreground lg:block"
          aria-label="גלילה לאודות"
        >
          <ArrowDown className="size-6 animate-bounce" />
        </button>
      </section>

      <section
        id="about"
        className="scroll-mt-20 bg-surface-deep py-24 text-primary-foreground sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-bold text-amber">
                <span className="h-px w-8 bg-amber" />
                {home.about.eyebrow}
              </p>
              <h2 className="text-4xl font-black leading-tight sm:text-6xl">
                {home.about.titleTop}
                <br />
                {home.about.titleBottom}
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-9 text-primary-foreground/75">
              {home.about.intro}
            </p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg bg-primary-foreground/15 md:grid-cols-2 lg:grid-cols-4">
            {home.about.features.map((feature, index) => {
              const FeatureIcon = featureIcons[index % featureIcons.length] ?? Lightbulb;
              return (
                <article key={feature.title} className="bg-surface-deep p-7 sm:p-9">
                  <FeatureIcon className="mb-7 size-8 text-amber" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-primary-foreground/65">
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="curriculum"
        className="scroll-mt-20 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={home.curriculum.eyebrow}
            title={home.curriculum.title}
            copy={home.curriculum.copy}
          />
          <Tabs defaultValue="ten" dir="rtl" className="mt-14">
            <TabsList className="grid h-auto w-full max-w-xl grid-cols-3 rounded-full bg-secondary p-1.5">
              {Object.entries(curriculum).map(([key, item]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="h-11 rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {item.grade}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(curriculum).map(([key, item]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[1.05fr_.95fr]">
                  <div className="p-7 sm:p-10 lg:p-14">
                    <span className="text-sm font-bold text-primary">
                      {item.grade}
                    </span>
                    <h3 className="mt-3 text-3xl font-black sm:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                      {item.subjects.map((subject) => (
                        <li
                          key={subject}
                          className="flex items-center gap-3 font-semibold"
                        >
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <Check className="size-4" />
                          </span>
                          {subject}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-9 flex gap-3">
                      {matriculationUnits.map((unit) => (
                        <span
                          key={unit}
                          className="rounded-full bg-secondary px-4 py-2 text-sm font-bold"
                        >
                          {unit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-80 overflow-hidden bg-surface-deep p-7 text-primary-foreground sm:p-10 lg:min-h-[430px]">
                    <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:22px_22px]" />
                    <div className="relative flex h-full flex-col justify-between rounded-lg border border-primary-foreground/15 bg-surface-deep/80 p-5 font-mono shadow-2xl">
                      <div className="flex gap-2">
                        <span className="size-3 rounded-full bg-amber" />
                        <span className="size-3 rounded-full bg-primary" />
                        <span className="size-3 rounded-full bg-olive" />
                      </div>
                      <div
                        className="space-y-3 text-left text-base leading-7 sm:text-lg"
                        dir="ltr"
                      >
                        {item.code.map((line, index) => (
                          <p
                            key={line}
                            className={
                              index === 0
                                ? "text-amber"
                                : "text-primary-foreground/80"
                            }
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-t border-primary-foreground/10 pt-4 text-xs text-primary-foreground/50">
                        <span>keshet-ream.cs</span>
                        <span>READY ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section
        id="projects"
        className="scroll-mt-20 bg-surface-soft py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={home.projects.eyebrow}
              title={home.projects.title}
              copy={home.projects.copy}
            />
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <Github className="size-5" /> {home.projects.note}
            </div>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => {
              const ProjectIcon = project.icon;
              return (
                <Dialog key={project.title}>
                  <article className="group overflow-hidden rounded-lg border border-border bg-card transition-transform duration-300 hover:-translate-y-1">
                    <div
                      className={`relative aspect-[16/10] overflow-hidden ${project.tone}`}
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.subtitle}
                          className="absolute inset-0 size-full object-cover"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(var(--primary-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--primary-foreground)_1px,transparent_1px)] [background-size:26px_26px]" />
                          <div className="absolute inset-[14%] rounded-lg border border-primary-foreground/30 bg-surface-deep/90 p-4 shadow-2xl">
                            <div className="mb-5 flex items-center justify-between">
                              <div className="flex gap-1.5">
                                <span className="size-2 rounded-full bg-amber" />
                                <span className="size-2 rounded-full bg-primary" />
                              </div>
                              <ProjectIcon className="size-5 text-primary-foreground" />
                            </div>
                            <div className="grid h-[65%] grid-cols-3 items-end gap-2">
                              {[42, 72, 54, 86, 66, 94]
                                .slice(0, index + 4)
                                .map((height, i) => (
                                  <span
                                    key={i}
                                    className="rounded-sm bg-primary/80"
                                    style={{ height: `${height}%` }}
                                  />
                                ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-black" dir="ltr">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-semibold text-muted-foreground">
                        {project.subtitle}
                      </p>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="mt-5 px-0 text-primary hover:bg-transparent hover:text-olive"
                        >
                          לפרטי הפרויקט <ChevronLeft />
                        </Button>
                      </DialogTrigger>
                    </div>
                  </article>
                  <DialogContent
                    className="max-h-[88vh] max-w-2xl overflow-y-auto rounded-lg p-0"
                    dir="rtl"
                  >
                    <div
                      className={`grid min-h-56 place-items-center ${project.tone}`}
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.subtitle}
                          className="size-full object-cover"
                        />
                      ) : (
                        <ProjectIcon
                          className="size-24 text-primary-foreground"
                          strokeWidth={1.2}
                        />
                      )}
                    </div>
                    <div className="p-7 sm:p-9">
                      <DialogHeader className="text-right">
                        <DialogTitle className="text-3xl font-black" dir="ltr">
                          {project.title}
                        </DialogTitle>
                        <DialogDescription className="text-base font-semibold">
                          {project.subtitle}
                        </DialogDescription>
                      </DialogHeader>
                      <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {project.details || project.description}
                      </p>
                      {project.meta && (
                        <p className="mt-4 text-sm font-bold text-olive">
                          {project.meta}
                        </p>
                      )}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-3 py-1 text-sm font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.demoUrl ? (
                        <Button asChild className="mt-8">
                          <a href={project.demoUrl} target="_blank" rel="noreferrer">
                            הדגמה חיה <ExternalLink />
                          </a>
                        </Button>
                      ) : (
                        <Button className="mt-8" disabled>
                          <ExternalLink /> הדגמה חיה — בקרוב
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blog" className="scroll-mt-20 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={home.blog.eyebrow}
              title={home.blog.title}
              copy={home.blog.copy}
            />
            <Button asChild variant="outline" className="h-12 rounded-full px-7 shadow-none">
              <Link to="/blog">
                {home.blog.cta} <ChevronLeft />
              </Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group overflow-hidden rounded-lg border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
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
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Calendar className="size-4 text-primary" />
                    {formatDate(post.date)}
                  </div>
                  <h3 className="mt-3 text-2xl font-black leading-snug group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={home.contactSection.eyebrow}
            title={home.contactSection.title}
            copy={home.contactSection.copy}
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-9">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-8" />
                  </span>
                  <h3 className="mt-6 text-3xl font-black">ההודעה מוכנה</h3>
                  <p className="mt-3 max-w-sm leading-7 text-muted-foreground">
                    תודה על הפנייה. האתר כרגע בתצוגת הדגמה, ולכן הפרטים לא
                    נשלחו בפועל.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSent(false)}
                    className="mt-6"
                  >
                    שליחת פנייה נוספת
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-bold">
                      שם מלא
                      <Input
                        required
                        name="name"
                        placeholder="איך קוראים לך?"
                        className="h-12"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-bold">
                      טלפון
                      <Input
                        required
                        name="phone"
                        type="tel"
                        placeholder="050-0000000"
                        className="h-12"
                        dir="ltr"
                      />
                    </label>
                  </div>
                  <label className="block space-y-2 text-sm font-bold">
                    דוא״ל
                    <Input
                      required
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12"
                      dir="ltr"
                    />
                  </label>
                  <label className="block space-y-2 text-sm font-bold">
                    במה נוכל לעזור?
                    <Textarea
                      required
                      name="message"
                      placeholder="כתבו לנו כאן..."
                      className="min-h-32 resize-none"
                    />
                  </label>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full sm:w-auto"
                  >
                    שליחת הודעה <Send />
                  </Button>
                </form>
              )}
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <iframe
                title={`מפת ${school.name}`}
                src={mapSrc}
                className="h-72 w-full border-0 grayscale-[20%] lg:h-[300px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <MapPin />
                  </span>
                  <div>
                    <h3 className="text-xl font-black">{school.name}</h3>
                    <p className="mt-1 text-muted-foreground">
                      {contact.address || "כתובת בית הספר תתעדכן כאן."}
                    </p>
                    {contact.coordinator && (
                      <p className="mt-1 font-semibold text-olive">
                        רכז/ת המגמה: {contact.coordinator}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"
                      dir="ltr"
                    >
                      <Phone className="size-4 text-primary" />
                      <span dir="rtl">{contact.phone}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Phone className="size-4 text-primary" /> טלפון יעודכן
                      בקרוב
                    </div>
                  )}
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Mail className="size-4 text-primary" /> {contact.email}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Mail className="size-4 text-primary" /> אימייל יעודכן
                      בקרוב
                    </div>
                  )}
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:text-olive"
                  >
                    פתיחה בניווט <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
