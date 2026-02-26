import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  { id: 1, name: 'Sarah M.', rating: 5, text: 'Absolutely love my purchase! The quality exceeded my expectations and delivery was super fast. Will definitely shop here again!', product: 'Wireless Earbuds Pro', avatar: 'SM' },
  { id: 2, name: 'James K.', rating: 5, text: 'Best online shopping experience I\'ve had. The product was exactly as described and arrived in perfect condition.', product: 'Smart Watch Series X', avatar: 'JK' },
  { id: 3, name: 'Priya R.', rating: 4, text: 'Great value for money. The customer support was very helpful when I had questions about my order. Highly recommend!', product: 'Skincare Bundle', avatar: 'PR' },
  { id: 4, name: 'Michael T.', rating: 5, text: 'I\'ve ordered multiple times and every experience has been flawless. Fast shipping, great products, excellent service!', product: 'Gaming Headset', avatar: 'MT' },
  { id: 5, name: 'Emma L.', rating: 5, text: 'The product quality is outstanding. I was skeptical at first but now I\'m a loyal customer. Thank you SmartLiving!', product: 'Fitness Tracker', avatar: 'EL' },
  { id: 6, name: 'David W.', rating: 4, text: 'Really impressed with the packaging and product quality. Arrived earlier than expected. Great shopping experience overall.', product: 'Smart Home Hub', avatar: 'DW' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const perPage = 3;
  const totalPages = Math.ceil(REVIEWS.length / perPage);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, totalPages]);

  const visibleReviews = REVIEWS.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2">Join thousands of happy customers worldwide</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4.9/5</span>
            <span className="text-muted-foreground text-sm">from 12,000+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleReviews.map((review) => (
            <div key={review.id} className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.product}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => { setCurrent((p) => (p - 1 + totalPages) % totalPages); setAutoPlay(false); }}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setAutoPlay(false); }}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-border'}`}
              />
            ))}
          </div>
          <button
            onClick={() => { setCurrent((p) => (p + 1) % totalPages); setAutoPlay(false); }}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
