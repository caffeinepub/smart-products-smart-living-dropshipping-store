import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 7–14 business days for most countries. Express shipping (3–5 business days) is available at checkout for an additional fee. Free standard shipping is available on all orders.',
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes! We offer free standard shipping on all orders worldwide. No minimum order value required. Express shipping options are available at checkout.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day hassle-free return policy. If you\'re not completely satisfied with your purchase, simply contact our support team and we\'ll arrange a full refund or exchange. Items must be in their original condition.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you\'ll receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website. Tracking updates are available within 24–48 hours of shipment.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, UPI, and Stripe. All transactions are secured with 256-bit SSL encryption.',
  },
  {
    q: 'Are my payment details secure?',
    a: 'Absolutely. We use industry-standard 256-bit SSL encryption to protect all payment information. We never store your full card details on our servers. All payments are processed through secure, PCI-compliant payment gateways.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be modified or cancelled within 24 hours of placement. After that, the order may have already been processed for shipping. Please contact our support team as soon as possible if you need to make changes.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes! We ship to over 150 countries worldwide. Shipping costs and delivery times vary by location. All applicable customs duties and taxes are the responsibility of the recipient.',
  },
  {
    q: 'What if I receive a damaged or defective product?',
    a: 'We\'re sorry to hear that! Please contact us within 7 days of receiving your order with photos of the damage. We\'ll send a replacement or issue a full refund immediately, no questions asked.',
  },
  {
    q: 'How do I contact customer support?',
    a: 'You can reach us via email at support@helpinghand.store, by phone at +1 (800) 123-4567 (Mon–Fri, 9am–6pm EST), or through our live chat widget available on every page.',
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Find answers to the most common questions about our products and services.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {FAQS.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-card border border-border rounded-2xl px-5 overflow-hidden"
          >
            <AccordionTrigger className="text-left font-medium text-foreground py-4 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
        <p className="text-foreground font-medium mb-2">Still have questions?</p>
        <p className="text-muted-foreground text-sm mb-4">Our support team is here to help you 24/7.</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
