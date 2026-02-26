import React from 'react';
import { Shield, Truck, Star, Users } from 'lucide-react';

const STATS = [
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
  { icon: Truck, value: '150+', label: 'Countries Served' },
  { icon: Shield, value: '100%', label: 'Secure Payments' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">About Helping Hand</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Smart Products. Smart Living. — We're on a mission to bring premium quality products to everyone, everywhere.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-14">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center">
            <Icon size={24} className="text-primary mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Our Story</h2>
          <p>
            Helping Hand was founded with a simple belief: everyone deserves access to high-quality, innovative products without breaking the bank. What started as a small online shop has grown into a global marketplace serving customers in over 150 countries.
          </p>
          <p className="mt-4">
            We carefully curate every product in our catalog, working directly with manufacturers to ensure the highest standards of quality and value. Our team of product experts tests and reviews each item before it makes it to our shelves.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Our Mission</h2>
          <p>
            Our mission is to make smart living accessible to everyone. We believe that the right products can transform your daily life — making it more efficient, enjoyable, and connected. From cutting-edge electronics to everyday essentials, we're here to help you live smarter.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Our Values</h2>
          <ul className="space-y-3">
            {[
              { title: 'Quality First', desc: 'Every product is vetted for quality before listing.' },
              { title: 'Customer Obsession', desc: 'Your satisfaction is our top priority, always.' },
              { title: 'Transparency', desc: 'Honest pricing, honest reviews, honest service.' },
              { title: 'Sustainability', desc: 'We\'re committed to eco-friendly packaging and practices.' },
            ].map(({ title, desc }) => (
              <li key={title} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <div>
                  <span className="font-semibold text-foreground">{title}:</span>{' '}
                  <span>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
