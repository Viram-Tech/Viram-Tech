# Site content

Lists that grow over time live here as plain JSON — no admin panel needed.
Edit a file, save, and the page updates (`npm run dev` shows it instantly; a
deploy publishes it). Every file is checked when the site builds: a missing
field, a typo'd field name, a bad URL or a duplicate entry stops the build with
a message naming the file, the entry and the field.

| File | Shows up on | Images go in |
|---|---|---|
| `work.json` | `/work` (Our Work) | `public/work/` |
| `careers.json` | `/careers`, one page per role, sitemap | — |
| `recognitions.json` | Footer → "Featured & recognized on" | hosted by the platform |

The blog is the exception: posts are written in Sanity Studio.

## Add a project — `work.json`

1. Save a screenshot to `public/work/`, e.g. `public/work/acme.png`
   (16:10, about 1600×1000, PNG/JPG/WebP).
2. Add an entry to the list:

```json
{
  "title": "Acme",
  "subtitle": "AI platform",
  "link": "https://acme.com",
  "image": "/work/acme.png"
}
```

`image` is optional — leave it out and a branded card with the title is shown.
Order matters: the first project sits top-right of the parallax, the last
bottom-left.

## Add a role — `careers.json`

```json
{
  "slug": "data-engineer",
  "title": "Data Engineer",
  "team": "Engineering",
  "location": "Mumbai · Hybrid",
  "type": "Full-time",
  "summary": "One or two sentences about the role.",
  "responsibilities": ["What they'll do", "…"],
  "requirements": ["What we're looking for", "…"]
}
```

- `slug` becomes the URL (`/careers/data-engineer`): lowercase, dashes only.
- `type` is one of `Full-time`, `Part-time`, `Internship`, `Contract`.
  Internships are grouped under "Internships" automatically.
- A new `team` creates a new group on the page. Close a role by deleting it.
- Applications (with résumés) are saved to a Notion database — see
  `integrations/careers-notion/SETUP.md`.

## Add a badge — `recognitions.json`

```json
{
  "name": "Findly.tools",
  "kicker": "Featured on",
  "href": "https://findly.tools/viramtech",
  "image": "https://findly.tools/badge.svg",
  "width": "250",
  "height": "54"
}
```

`image`, `width` and `height` are optional — without an image a text badge is
drawn. Only add listings ViramTech really has.
