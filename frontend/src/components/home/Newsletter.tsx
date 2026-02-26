import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useSubscribeNewsletter } from '../../hooks/useQueries';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const subscribeMutation = useSubscribeNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      await subscribeMutation.mutateAsync(email);
      setSubscribed(true);
      setEmail('');
      toast.success('Successfully subscribed!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundImage: 'url(/assets/generated/newsletter-bg.dim_1440x400.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-primary/90" />
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
            <Mail size={26} className="text-white" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Get Exclusive Deals & Offers
          </h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter and be the first to know about new products, flash sales, and exclusive discounts.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 bg-white/20 rounded-2xl px-6 py-4">
              <CheckCircle size={22} className="text-white" />
              <p className="text-white font-semibold">You're subscribed! Check your inbox for a welcome gift 🎁</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 h-12 px-4 rounded-xl border-0 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="h-12 px-6 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 disabled:opacity-60 transition-colors whitespace-nowrap text-sm"
              >
                {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>
          )}

          <p className="text-white/60 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
