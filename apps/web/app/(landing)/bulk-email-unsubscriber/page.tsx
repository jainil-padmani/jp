import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/app/(landing)/home/Hero";
import { FeaturesUnsubscribe } from "@/app/(landing)/home/Features";
import { Testimonials } from "@/app/(landing)/home/Testimonials";
import { Pricing } from "@/app/(app)/premium/Pricing";
import { FAQs } from "@/app/(landing)/home/FAQs";
import { CTA } from "@/app/(landing)/home/CTA";
import { BasicLayout } from "@/components/layouts/BasicLayout";

export const metadata: Metadata = {
  title: "Effortless Bulk Email Unsubscriber | MailtoLive",
  description:
    "Simplify email management with MailtoLive's bulk email unsubscriber. One-click unsubscribe from newsletters and marketing emails for a clutter-free inbox.",
  alternates: { canonical: "/bulk-email-unsubscriber" },
  keywords: [
    "bulk email unsubscriber",
    "unsubscribe emails",
    "email management",
    "inbox cleaner",
    "Gmail bulk unsubscribe",
  ],
  openGraph: {
    title: "Effortless Bulk Email Unsubscriber | MailtoLive",
    description:
      "Simplify email management with MailtoLive's bulk email unsubscriber. One-click unsubscribe from newsletters and marketing emails for a clutter-free inbox.",
    url: "https://mailto.live/bulk-email-unsubscriber",
    images: [
      {
        url: "/images/email-unsubscriber.png",
        width: 1200,
        height: 630,
        alt: "Bulk Email Unsubscribe Dashboard",
      },
    ],
  },
};

export default function NewsletterCleaner() {
  return (
    <BasicLayout>
      <Hero
        title="Bulk Unsubscribe from Marketing Emails and Newsletters"
        subtitle="Simplify your inbox management: one-click unsubscribe, auto archive, or approve."
        image="/images/email-unsubscriber.png"
      />
      <Testimonials />
      <FeaturesUnsubscribe />
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
