const faqs = [
  {
    question: "Can I still use Mailto Live alongside my current email client?",
    answer:
      "Yes! Mailto Live is intended to be used alongside your existing email client.",
  },
  {
    question: "Which email providers does Mailto Live support?",
    answer:
      "Currently, Mailto Live supports Gmail and Google Workspace accounts. We are exploring the possibility of adding support for other providers like Outlook in the future.",
  },
  {
    question: "How does Mailto Live help me manage my inbox better?",
    answer:
      "Mailto Live utilizes AI to automate repetitive tasks, such as replying to common inquiries and unsubscribing from unwanted newsletters. This allows you to focus on more important emails and reduces the time spent managing your inbox.",
  },
  {
    question: "Will my data be secure with Mailto Live?",
    answer:
      "We prioritize user privacy and security. Mailto Live uses third-party tools to process email data and has passed Google’s secure platform tests, ensuring that user security is maintained at all levels.",
  },
  {
    question: "How can I optimize my email management with Mailto Live?",
    answer:
      "To maximize efficiency, use our automation features to set rules for common responses and unsubscribe from newsletters with a single click. Regularly review your analytics to identify trends in your email usage, allowing you to adjust your strategies accordingly.",
  },
  {
    question: "Do you offer refunds?",
    answer: (
      <>
        If you don’t think we provided you with value, send us an{" "}
        <a
          href="mailto:info@mailto.live"
          target="_blank"
          className="font-semibold hover:underline"
          rel="noreferrer"
        >
          email
        </a>{" "}
        within 14 days of upgrading, and we’ll refund you.
      </>
    ),
  },
];

export function FAQs() {
  return (
    <div
      className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32"
      id="faq"
    >
      <h2 className="font-cal text-2xl leading-10 text-gray-900">
        Frequently Asked Questions
      </h2>
      <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
          >
            <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
              {faq.question}
            </dt>
            <dd className="mt-4 lg:col-span-7 lg:mt-0">
              <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
