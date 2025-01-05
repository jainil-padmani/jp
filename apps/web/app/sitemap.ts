import type { MetadataRoute } from "next";
import { unstable_noStore } from "next/cache";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postSlugsQuery } from "@/sanity/lib/queries";

async function getBlogPosts() {
  const posts = await sanityFetch<{ slug: string; date: string }[]>({
    query: postSlugsQuery,
  });
  return posts.map((post) => ({
    url: `https://www.mailto.live/blog/post/${post.slug}`,
    lastModified: new Date(post.date),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // to try fix caching issue: https://github.com/vercel/next.js/discussions/56708#discussioncomment-10127496
  unstable_noStore();

  const blogPosts = await getBlogPosts();

  const staticUrls = [
    {
      url: "https://www.mailto.live/",
      priority: 1,
    },
    {
      url: "https://www.mailto.live/bulk-email-unsubscriber",
    },
    {
      url: "https://www.mailto.live/ai-automation",
    },
    {
      url: "https://www.mailto.live/email-analytics",
    },
    {
      url: "https://www.mailto.live/block-cold-emails",
    },
    {
      url: "https://www.mailto.live/new-email-senders",
    },
    {
      url: "https://www.mailto.live/privacy",
    },
    {
      url: "https://www.mailto.live/terms",
    },
    {
      url: "https://www.mailto.live/blog",
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://www.mailto.live/blog/post/alternatives-to-skiff-mail",
    },
    {
      url: "https://www.mailto.live/blog/post/best-email-unsubscribe-app",
    },
    {
      url: "https://www.mailto.live/blog/post/bulk-unsubscribe-from-emails",
    },
    {
      url: "https://www.mailto.live/blog/post/escape-email-trap-unsubscribe-for-good",
    },
    {
      url: "https://docs.mailto.live/",
    },
    {
      url: "https://docs.mailto.live/introduction",
    },
    {
      url: "https://docs.mailto.live/essentials/email-ai-automation",
    },
    {
      url: "https://docs.mailto.live/essentials/bulk-email-unsubscriber",
    },
    {
      url: "https://docs.mailto.live/essentials/cold-email-blocker",
    },
  ];

  return [...staticUrls, ...blogPosts];
}
