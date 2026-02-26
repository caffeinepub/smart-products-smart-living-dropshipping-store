import React from 'react';
import { RefreshCw, CheckCircle, Clock, Shield } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Return & Refund Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <Shield size={24} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">30-Day Money-Back Guarantee</p>
          <p className="text-sm text-muted-foreground mt-1">
            We stand behind every product we sell. If you're not completely satisfied, return it within 30 days for a full refund.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          {
            icon: RefreshCw,
            title: '1. Return Eligibility',
            content: 'Items may be returned within 30 days of delivery. To be eligible for a return, items must be in their original condition, unused, and in the original packaging. Items that are damaged, used, or missing original packaging may not be eligible for a full refund.',
          },
          {
            icon: CheckCircle,
            title: '2. How to Initiate a Return',
            content: 'To initiate a return, contact our customer support team at support@helpinghand.store with your order number and reason for return. Our team will provide you with a return authorization and instructions within 24 hours.',
          },
          {
            icon: Clock,
            title: '3. Refund Processing',
            content: 'Once we receive and inspect your returned item, we will process your refund within 3–5 business days. Refunds are issued to the original payment method. Please allow an additional 5–10 business days for the refund to appear on your statement.',
          },
          {
            icon: Shield,
            title: '4. Damaged or Defective Items',
            content: 'If you receive a damaged or defective item, please contact us within 7 days of delivery with photos of the damage. We will send a replacement or issue a full refund immediately, at no additional cost to you.',
          },
          {
            icon: RefreshCw,
            title: '5. Exchanges',
            content: 'We offer exchanges for items of equal or lesser value. To request an exchange, contact our support team with your order number and the item you\'d like to exchange for. Exchanges are subject to product availability.',
          },
          {
            icon: CheckCircle,
            title: '6. Non-Returnable Items',
            content: 'The following items cannot be returned: digital products, personalized/custom items, perishable goods, and items marked as final sale. Please check product descriptions carefully before purchasing.',
          },
          {
            icon: Clock,
            title: '7. Return Shipping',
            content: 'For standard returns, customers are responsible for return shipping costs. For damaged, defective, or incorrectly shipped items, we will provide a prepaid return shipping label at no cost to you.',
          },
        ].map(({ icon: Icon, title, content }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Icon size={18} className="text-primary" />
              <h2 className="font-semibold text-foreground">{title}</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
