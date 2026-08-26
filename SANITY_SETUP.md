# Blog CMS (Sanity) — setup & authoring

The blog is powered by **Sanity**. Non-devs write posts in the Sanity Studio
dashboard; the site reads them and rebuilds automatically. Until a project is
connected, the site shows the built-in fallback posts — nothing breaks.

## One-time setup (a developer does this once)

1. **Create a free Sanity project**
   ```bash
   npx sanity@latest login      # sign in / create a Sanity account
   npx sanity@latest init --env # creates a project + writes NEXT_PUBLIC_SANITY_* to .env.local
   ```
   (Or create the project at https://sanity.io/manage and copy the **Project ID**
   into `.env.local` — see `.env.local.example`.)

2. **Add the same env vars to your host** (Vercel/Netlify → Project → Environment
   Variables):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
   ```

3. **Publish the Studio dashboard** so writers can log in from anywhere:
   ```bash
   npm run studio:deploy        # deploys to https://<name>.sanity.studio
   ```
   (Locally you can also run `npm run studio:dev` → http://localhost:3333.)

4. **Invite the writers** at https://sanity.io/manage → Members → add them as
   **Editor** (they can write/publish, not change settings).

## Publishing a post (non-devs)

1. Go to the Studio URL (e.g. `https://viramtech.sanity.studio`) and log in.
2. **Blog post → Create new.** The editor has two tabs:
   - **Content** — Title, Author, Category, Excerpt, Cover image and the Article
     body (headings, lists, links, images).
   - **SEO & social** — optional overrides, see below.
3. Click **Publish.** The post appears on `/blog` within ~a minute (ISR), no
   code change or redeploy needed.

## Authors

**Author → Create new** to add a writer once (name, role, photo, short bio,
LinkedIn), then pick them on any post. A post with no author is published under
the ViramTech name.

Naming a real author with a stated role is worth doing: search engines weigh a
credited, attributable byline more heavily than a company one, and the byline is
what appears on the post itself.

## SEO & social (all optional)

Everything on this tab is an override. Leave a field empty and the site falls
back to what the post already has, so a normal post needs nothing here.

| Field | What it does | Falls back to |
| --- | --- | --- |
| Meta title | Headline in Google results. Keep under 60 characters. | The post title |
| Meta description | Snippet under the result. Aim for 120–160 characters. | The excerpt |
| Social share image | Preview card on LinkedIn/Slack/X. 1200×630 is ideal. | The cover image |
| Hide from search engines | Post stays live on the site but Google is told not to index it, and it is dropped from `sitemap.xml` and `llms.txt`. | Off |

**Alternative text** on the cover image and on images inside the body describes
the picture for screen readers and image search. Leave it empty only when the
image is purely decorative.

## Notes

- Slug (the URL) is generated from the title — edit it if you want a cleaner URL.
- Read time is calculated automatically from the body length.
- Posts are ordered by "Published at" (newest first); the newest is featured.
- After changing anything in `sanity/schemaTypes/`, run `npm run studio:deploy`
  so the hosted Studio picks up the new fields.
- Remove the two built-in fallback posts (in `lib/content.ts`, `blogPosts`) once
  you have real posts, if you don't want them to show when Sanity is empty.
