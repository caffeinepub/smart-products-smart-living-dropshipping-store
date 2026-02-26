import React from 'react';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Helping Hand ("the Website"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.',
    },
    {
      title: '2. Use of the Website',
      content: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:
      • Use the site in any way that violates applicable laws or regulations
      • Transmit any unsolicited or unauthorized advertising material
      • Attempt to gain unauthorized access to any part of the website
      • Engage in any conduct that restricts or inhibits anyone's use of the website`,
    },
    {
      title: '3. Products and Pricing',
      content: 'We reserve the right to modify product descriptions, prices, and availability at any time without notice. All prices are displayed in USD unless otherwise specified. We make every effort to ensure accuracy but are not responsible for typographical errors.',
    },
    {
      title: '4. Orders and Payment',
      content: 'By placing an order, you represent that you are authorized to use the payment method provided. We reserve the right to refuse or cancel any order for any reason, including suspected fraud or unauthorized transactions. Payment is due at the time of order placement.',
    },
    {
      title: '5. Intellectual Property',
      content: 'All content on this website, including text, graphics, logos, images, and software, is the property of Helping Hand and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
    },
    {
      title: '6. Disclaimer of Warranties',
      content: 'The website and its content are provided "as is" without any warranties, express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
    },
    {
      title: '7. Limitation of Liability',
      content: 'To the fullest extent permitted by law, Helping Hand shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or our products, even if we have been advised of the possibility of such damages.',
    },
    {
      title: '8. Governing Law',
      content: 'These Terms and Conditions are governed by and construed in accordance with the laws of the State of California, United States. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of California.',
    },
    {
      title: '9. Changes to Terms',
      content: 'We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes your acceptance of the new terms.',
    },
    {
      title: '10. Contact Information',
      content: 'For questions about these Terms and Conditions, please contact us at legal@helpinghand.store or write to us at 123 Commerce Street, San Francisco, CA 94105.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Terms & Conditions</h1>
      <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8">
        <p className="text-sm text-foreground">
          Please read these Terms and Conditions carefully before using Helping Hand. By using our website, you agree to these terms.
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
    </div>
  );
}
