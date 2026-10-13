/**
 * טעינת פוסטים מ‑Markdown.
 *
 * כל קובץ .md ב‑src/content/posts הופך לפוסט. הפתיח בין שני קווי "---"
 * מכיל: title, date, description, image, tags, draft.
 * אין כאן מה לשנות כדי להוסיף פוסט — רק לכתוב קובץ חדש.
 */

import { format } from "date-fns";
import { he } from "date-fns/locale";

const rawPosts = import.meta.glob("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type Post = {
  slug: string;
  title: string;
  /** ISO, כפי שנכתב בפתיח */
  date: string;
  description: string;
  image?: string;
  tags: string[];
  /** true = לא מוצג באתר */
  draft: boolean;
  body: string;
};

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  const data: Record<string, string> = {};
  if (!match) return { data, body: raw.trim() };

  const front = match[1] ?? "";
  for (const line of front.split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    if (key) data[key] = unquote(line.slice(index + 1));
  }

  return { data, body: raw.slice(match[0].length).trim() };
}

function parseTags(value: string | undefined) {
  if (!value) return [];
  const inner = value.trim().replace(/^\[|\]$/g, "");
  return inner
    .split(",")
    .map((tag) => unquote(tag))
    .filter(Boolean);
}

function toPost(path: string, raw: string): Post {
  const slug = (path.split("/").pop() ?? "post").replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);

  const post: Post = {
    slug,
    title: data["title"] || slug,
    date: data["date"] || "1970-01-01",
    description: data["description"] || "",
    tags: parseTags(data["tags"]),
    draft: (data["draft"] || "").toLowerCase() === "true",
    body,
  };

  const image = data["image"];
  if (image) post.image = image;
  return post;
}

export const posts: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => !post.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function latestPosts(count = 3) {
  return posts.slice(0, count);
}

/** תאריך בעברית, למשל "5 באוקטובר 2026" */
export function formatDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return format(date, "d ב LLLL yyyy", { locale: he });
}
