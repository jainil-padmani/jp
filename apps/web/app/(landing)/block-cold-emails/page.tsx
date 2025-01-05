import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/app/(landing)/home/Hero";
import { FeaturesColdEmailBlocker } from "@/app/(landing)/home/Features";
import { Testimonials } from "@/app/(landing)/home/Testimonials";
import { Pricing } from "@/app/(app)/premium/Pricing";
import { FAQs } from "@/app/(landing)/home/FAQs";
import { CTA } from "@/app/(landing)/home/CTA";
import { BasicLayout } from "@/components/layouts/BasicLayout";

export const metadata: Metadata = {
  title: "Effortlessly Block Cold Emails with AI | MailtoLive",
  description:
    "Enhance your email productivity with MailtoLive's AI-powered cold email blocker. Automatically filter and manage unsolicited emails for a cleaner inbox.",
  alternates: { canonical: "/block-cold-emails" },
  keywords: [
    "cold email blocker",
    "AI email management",
    "email filtering",
    "block spam emails",
    "enhance email productivity",
  ],
  openGraph: {
    title: "Effortlessly Block Cold Emails with AI | MailtoLive",
    description:
      "Enhance your email productivity with MailtoLive's AI-powered cold email blocker. Automatically filter and manage unsolicited emails for a cleaner inbox.",
    url: "https://mailto.live/block-cold-emails",
    images: [
      {
        url: "/images/cold-email-blocker.png",
        width: 1200,
        height: 630,
        alt: "Cold Email Blocker Dashboard",
      },
    ],
  },
};

export default function BlockColdEmails() {
  return (
    <BasicLayout>
      <Hero
        title="Effortlessly Block Cold Emails with AI"
        subtitle="Automatically filter and manage unsolicited emails for a cleaner inbox."
        image="/images/cold-email-blocker.png"
      />
      <Testimonials />
      <FeaturesColdEmailBlocker />
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
