import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[520px] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/hero-banner.dim_1440x600.png)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            <Star size={14} className="fill-current" />
            Trusted by 50,000+ customers worldwide
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Discover Products That{' '}
            <span className="text-primary">Elevate</span>{' '}
            Your Life
          </h1>

          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Smart Products. Smart Living. — Premium quality at unbeatable prices, delivered to your door.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm transition-all"
            >
              Browse Categories
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-5 mt-10">
            {[
              { icon: Truck, text: 'Free Shipping' },
              { icon: Shield, text: 'Secure Payment' },
              { icon: Star, text: '4.9/5 Rating' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/80 text-sm">
                <Icon size={16} className="text-primary" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
