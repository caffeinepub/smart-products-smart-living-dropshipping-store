import React from 'react';
import { Truck, Clock, Globe, Package } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Shipping Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Truck, label: 'Free Shipping', sub: 'On all orders' },
          { icon: Clock, label: '7–14 Days', sub: 'Standard delivery' },
          { icon: Globe, label: '150+ Countries', sub: 'Worldwide shipping' },
          { icon: Package, label: 'Tracked', sub: 'All shipments' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <Icon size={22} className="text-primary mx-auto mb-2" />
            <p className="font-semibold text-sm text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        {[
          {
            title: '1. Free Standard Shipping',
            content: 'We offer free standard shipping on all orders worldwide, with no minimum order value. Standard shipping typically takes 7–14 business days depending on your location.',
          },
          {
            title: '2. Express Shipping',
            content: 'Express shipping (3–5 business days) is available at checkout for an additional fee. Express shipping rates vary by destination and will be calculated at checkout.',
          },
          {
            title: '3. Order Processing',
            content: 'Orders are processed within 1–2 business days after payment confirmation. You will receive an email confirmation with your order details and tracking information once your order has been dispatched.',
          },
          {
            title: '4. International Shipping',
            content: 'We ship to over 150 countries worldwide. International orders may be subject to customs duties, taxes, and fees imposed by the destination country. These charges are the responsibility of the recipient and are not included in our shipping fees.',
          },
          {
            title: '5. Tracking Your Order',
            content: 'Once your order ships, you\'ll receive a tracking number via email. Tracking information may take 24–48 hours to update after shipment. You can track your order on our website or directly on the carrier\'s website.',
          },
          {
            title: '6. Shipping Delays',
            content: 'While we strive to meet all delivery estimates, delays may occasionally occur due to customs processing, weather conditions, or carrier issues. We are not responsible for delays caused by customs or other factors outside our control.',
          },
          {
            title: '7. Lost or Stolen Packages',
            content: 'If your package is lost in transit, please contact us within 30 days of the expected delivery date. We will investigate with the carrier and either resend your order or issue a full refund.',
          },
        ].map(({ title, content }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-foreground mb-3">{title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
