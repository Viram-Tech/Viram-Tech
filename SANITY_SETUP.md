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
2. **Blog post → Create new.** Fill in Title, Category, Excerpt, an optional
   Cover image, and the Article body (headings, lists, links, images).
3. Click **Publish.** The post appears on `/blog` within ~a minute (ISR), no
   code change or redeploy needed.

## Notes

- Slug (the URL) is generated from the title — edit it if you want a cleaner URL.
- Read time is calculated automatically from the body length.
- Posts are ordered by "Published at" (newest first); the newest is featured.
- Remove the two built-in fallback posts (in `lib/content.ts`, `blogPosts`) once
  you have real posts, if you don't want them to show when Sanity is empty.
