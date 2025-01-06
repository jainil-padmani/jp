import Link from "next/link";

const navigation = {
  main: [
    { name: "Bulk Email Unsubscriber", href: "/bulk-email-unsubscriber" },
    { name: "Cold Email Blocker", href: "/block-cold-emails" },
    { name: "Email Analytics", href: "/email-analytics" },
    { name: "Email AI Assistant", href: "/ai-automation" },
    { name: "New Sender Management", href: "/new-email-senders" },
  ],
  support: [
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "mailto:info@mailto.live", target: "_blank" },
    {
      name: "Documentation",
      href: "https://docs.mailto.live",
      target: "_blank",
    },
    { name: "Feature Requests", href: "/feature-requests", target: "_blank" },
    { name: "Changelog", href: "/changelog", target: "_blank" },
    { name: "Roadmap", href: "/roadmap", target: "_blank" },
  ],
  company: [
    { name: "Blog", href: "/blog" },
    { name: "Affiliates", href: "/affiliates", target: "_blank" },
    { name: "Twitter", href: "/twitter", target: "_blank" },
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/company/mailtolive",
      target: "_blank",
    },
  ],
  legal: [
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
  // Commented out social section for future use
  /*
  social: [
    {
      name: "Twitter",
      href: "/twitter",
      target: "_blank",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <title>Twitter</title>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    // ... other social icons
  ],
  */
};

function FooterList(props: {
  title: string;
  items: { name: string; href: string; target?: string }[];
}) {
  return (
    <>
      <h3 className="text-sm font-semibold leading-6 text-gray-900">
        {props.title}
      </h3>
      <ul className="mt-6 space-y-4">
        {props.items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              target={item.target}
              prefetch={item.target !== "_blank"}
              className="text-sm leading-6 text-gray-600 hover:text-gray-900"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative z-50">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <FooterList title="Product" items={navigation.main} />
            </div>
            <div className="mt-10 md:mt-0">
              <FooterList title="Support" items={navigation.support} />
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <FooterList title="Company" items={navigation.company} />
            </div>
            <div className="mt-10 md:mt-0">
              <FooterList title="Legal" items={navigation.legal} />
            </div>
          </div>
        </div>

        {/* Social icons section removed */}

        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Mailto Live. All rights reserved.
        </p>
        <p className="mt-2 text-center text-xs leading-5 text-gray-400">
          Incredible work of{" "}
          <Link
            href="https://github.com/ftaxats/mailto.live"
            className="hover:underline"
          >
            Ellie
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
