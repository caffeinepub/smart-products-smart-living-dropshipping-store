import React from 'react';
import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Free Worldwide Shipping',
    description: 'Free shipping on all orders over $25. Fast delivery to 150+ countries.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption. Your payment information is always safe.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. No questions asked refund policy.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support via chat, email, and phone.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Why Choose Helping Hand?</h2>
        <p className="text-muted-foreground mt-2">We're committed to delivering the best shopping experience</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map(({ icon: Icon, title, description, color, bg }) => (
          <div key={title} className="text-center p-6 rounded-2xl border border-border bg-card hover:shadow-card transition-shadow">
            <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-4`}>
              <Icon size={26} className={color} />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-12 flex justify-center">
        <img
          src="/assets/generated/trust-badges.dim_800x120.png"
          alt="Trust badges - Secure Checkout, Money-Back Guarantee, Free Shipping, Easy Returns"
          className="max-w-full h-auto opacity-80"
        />
      </div>
    </section>
  );
}
