import type { Metadata } from "next";
import { Content } from "./content";
import { StructuredData } from "@/app/blog/post/StructuredData";

export const metadata: Metadata = {
  title: "Mastering Mailto Live - A Productivity Guide for Entrepreneurs",
  description:
    "Learn how to achieve and maintain Mailto Live as an entrepreneur with effective strategies, tools, and tips for efficient email management.",
  alternates: {
    canonical: "/blog/post/inbox-zero-workflow-for-entrepreneurs",
  },
};

export default function Page() {
  return (
    <>
      <StructuredData
        headline="Mailto Live Workflow for Entrepreneurs"
        datePublished="2024-06-27T23:00:00+00:00"
        dateModified="2024-06-27T23:00:00+00:00"
        authorName="Akshat Shah"
        authorUrl="https://getaiblogarticles.com/"
        image={[]}
      />
      <Content />
    </>
  );
}
