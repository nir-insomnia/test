<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Content structure

- All editable text lives in `src/content` (`site.ts`, `curriculum.ts`, `projects.ts`,
  `posts/*.md`); route files only render it. Why: staff must be able to change the
  site from GitHub without opening app code.
- Blog posts are plain `.md` files in `src/content/posts` with a frontmatter block
  (`title`, `date`, `description`, `image`, `tags`, `draft`). Adding a post means
  adding a file, never editing a route.
- Photos the site shows go in `public/images/projects` and `public/images/blog`, and
  are referenced by path without the `public` prefix.
- Never invent school facts (coordinator, phone, email, address). Leave the field
  empty in `src/content/site.ts` so the UI shows a "yet to be updated" placeholder.
