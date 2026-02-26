import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  { name: 'Electronics & Gadgets', image: '/assets/generated/cat-electronics.dim_400x300.png', category: 'Computers', count: '200+' },
  { name: 'Mobile Accessories', image: '/assets/generated/cat-mobile.dim_400x300.png', category: 'Smartphones', count: '150+' },
  { name: 'Home & Kitchen', image: '/assets/generated/cat-home-kitchen.dim_400x300.png', category: 'Home Appliances', count: '180+' },
  { name: 'Beauty & Care', image: '/assets/generated/cat-beauty.dim_400x300.png', category: 'Wearables', count: '120+' },
  { name: 'Health & Fitness', image: '/assets/generated/cat-health.dim_400x300.png', category: 'Wearables', count: '90+' },
  { name: 'Fashion', image: '/assets/generated/cat-fashion.dim_400x300.png', category: 'Wearables', count: '300+' },
];

export default function FeaturedCollections() {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Featured Collections</h2>
          <p className="text-muted-foreground mt-1">Explore our curated product categories</p>
        </div>
        <Link
          to="/categories"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.name}
            to="/shop"
            search={{ category: col.category } as never}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
          >
            <img
              src={col.image}
              alt={col.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-semibold text-sm sm:text-base">{col.name}</p>
              <p className="text-white/70 text-xs mt-0.5">{col.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
