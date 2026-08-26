import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";
import type { Post } from "@/lib/blog";
import type { Product, Sector } from "@/lib/content";

/** Stable node ids so every graph on the site points at one Organization. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

/* eslint-disable @typescript-eslint/no-explicit-any */
type Schema = Record<string, any>;

/**
 * The publisher entity, emitted site-wide from the root layout.
 *
 * Only facts that appear on the site go in here — Google penalises markup that
 * describes content the page does not show. The contact page's phone number is
 * still a placeholder, so `telephone` is deliberately absent.
 */
export function organizationSchema(): Schema {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    slogan: "Accelerate your business growth with strength-driven technology.",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.svg"),
      caption: `${SITE_NAME} logo`,
    },
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: ["https://www.linkedin.com/company/viram-tech/"],
  };
}

export function websiteSchema(): Schema {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** Trail of [label, path] pairs, root-first. "Home" is prepended for you. */
export function breadcrumbSchema(trail: [string, string][]): Schema {
  const items: [string, string][] = [["Home", "/"], ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

/**
 * Products are sold as enterprise engagements with no public pricing and no
 * published reviews, so they are modelled as `Service` rather than `Product` or
 * `SoftwareApplication` — both of those need `offers`/`aggregateRating` to be
 * valid for rich results and would only raise Search Console warnings here.
 */
export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): Schema {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    // Umbrella classification; serviceType carries the specific capability.
    category: "Enterprise AI",
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Worldwide" },
  };
}

export function productServiceSchema(product: Product): Schema {
  return serviceSchema({
    name: product.name,
    description: product.summary,
    path: `/products/${product.slug}`,
    serviceType: product.kicker,
  });
}

export function sectorServiceSchema(sector: Sector): Schema {
  return serviceSchema({
    name: `Enterprise AI for ${sector.name}`,
    description: sector.overview,
    path: `/industries/${sector.slug}`,
    serviceType: `${sector.name} AI solutions`,
  });
}

/**
 * Blog post. A named author is emitted as a Person when the post has one —
 * search engines weigh a real, attributable byline more heavily than a company
 * one. Posts with no author fall back to the Organization.
 */
export function articleSchema(post: Post): Schema {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const author = post.author
    ? {
        "@type": "Person",
        name: post.author.name,
        ...(post.author.role ? { jobTitle: post.author.role } : {}),
        ...(post.author.bio ? { description: post.author.bio } : {}),
        ...(post.author.imageUrl ? { image: post.author.imageUrl } : {}),
        ...(post.author.linkedin ? { sameAs: [post.author.linkedin] } : {}),
        worksFor: { "@id": ORG_ID },
      }
    : { "@id": ORG_ID };
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.seo.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    inLanguage: "en",
    author,
    publisher: { "@id": ORG_ID },
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ?? post.publishedAt
      ? { dateModified: post.updatedAt ?? post.publishedAt }
      : {}),
    ...(post.seo.imageUrl ?? post.coverImageUrl
      ? { image: post.seo.imageUrl ?? post.coverImageUrl }
      : {}),
  };
}

/** Wraps nodes in a single @graph so one script tag carries the whole page. */
export function graph(...nodes: Schema[]): Schema {
  return { "@context": "https://schema.org", "@graph": nodes };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
