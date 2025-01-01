import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/app/(landing)/home/Hero";
import { Testimonials } from "@/app/(landing)/home/Testimonials";
import { Pricing } from "@/app/(app)/premium/Pricing";
import { FAQs } from "@/app/(landing)/home/FAQs";
import { CTA } from "@/app/(landing)/home/CTA";
import { FeaturesStats } from "@/app/(landing)/home/Features";
import { BasicLayout } from "@/components/layouts/BasicLayout";

export const metadata: Metadata = {
  title: "Elevate Productivity with AI Email Analytics | MailtoLive",
  description:
    "Unlock email insights to boost productivity. Analyze patterns and manage your inbox intelligently with MailtoLive's email analytics.",
  alternates: { canonical: "/email-analytics" },
  keywords: [
    "AI email analytics",
    "email management",
    "productivity tools",
    "email insights",
    "Mailto Live method",
  ],
  openGraph: {
    title: "Elevate Productivity with AI Email Analytics | MailtoLive",
    description:
      "Unlock email insights to boost productivity. Analyze patterns and manage your inbox intelligently with MailtoLive's email analytics.",
    url: "https://mailto.live/email-analytics",
    images: [
      {
        url: "/images/analytics.png",
        width: 1200,
        height: 630,
        alt: "Email Analytics Dashboard",
      },
    ],
  },
};

export default function EmailAnalytics() {
  return (
    <BasicLayout>
      <Hero
        title="Understand Your Inbox with AI-Driven Email Analytics"
        subtitle="Unlock insights to enhance productivity: analyze email patterns and streamline your inbox management."
        image="/images/analytics.png"
      />
      <Testimonials />
      <FeaturesStats />
      <Suspense>
        <div className="pb-32">
          <Pricing />
        </div>
      </Suspense>
      <FAQs />
      <CTA />
    </BasicLayout>
  );
}
