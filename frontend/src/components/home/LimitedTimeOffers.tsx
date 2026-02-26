import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Zap, Clock } from 'lucide-react';

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const TARGET = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

export default function LimitedTimeOffers() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(TARGET));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(TARGET)), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="bg-gradient-to-r from-primary to-coral-600 rounded-3xl overflow-hidden">
        <div className="px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-white text-sm font-medium mb-4">
              <Zap size={14} className="fill-current" />
              Flash Sale
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Up to 50% OFF
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Limited time deals on top products. Don't miss out!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors"
            >
              Shop the Sale
            </Link>
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Clock size={14} />
              Offer ends in:
            </div>
            <div className="flex gap-3">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl w-16 h-16 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-white">{pad(value)}</span>
                  </div>
                  <span className="text-white/70 text-xs mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
