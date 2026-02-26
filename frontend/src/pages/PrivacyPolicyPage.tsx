import React from 'react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:
      • Personal identification information (name, email address, phone number)
      • Billing and shipping address
      • Payment information (processed securely through our payment providers)
      • Order history and preferences
      • Communications with our support team`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:
      • Process and fulfill your orders
      • Send order confirmations and shipping updates
      • Provide customer support
      • Send promotional emails (with your consent)
      • Improve our products and services
      • Comply with legal obligations`,
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:
      • Shipping carriers to fulfill your orders
      • Payment processors to handle transactions
      • Service providers who assist in our operations
      • Law enforcement when required by law`,
    },
    {
      title: '4. Data Security',
      content: `We implement industry-standard security measures to protect your personal information, including 256-bit SSL encryption for all data transmissions. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: '5. Cookies',
      content: `We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences. Disabling cookies may affect some features of our website.`,
    },
    {
      title: '6. Your Rights',
      content: `You have the right to:
      • Access the personal information we hold about you
      • Request correction of inaccurate information
      • Request deletion of your personal information
      • Opt out of marketing communications
      • Data portability
      To exercise these rights, contact us at privacy@helpinghand.store.`,
    },
    {
      title: '7. Children\'s Privacy',
      content: `Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.`,
    },
    {
      title: '8. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8">
        <p className="text-sm text-foreground">
          At Helping Hand, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and protect your data.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map(({ title, content }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-foreground mb-3">{title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-6">
        <h2 className="font-semibold text-foreground mb-2">Contact Us About Privacy</h2>
        <p className="text-sm text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@helpinghand.store" className="text-primary hover:underline">
            privacy@helpinghand.store
          </a>
        </p>
      </div>
    </div>
  );
}
