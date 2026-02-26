import React from 'react';
import { Link } from '@tanstack/react-router';
import { XCircle, RefreshCw } from 'lucide-react';

export default function PaymentFailurePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-lg text-center">
      <div className="bg-card border border-border rounded-3xl p-10 shadow-card">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-red-500" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Payment Failed</h1>
        <p className="text-muted-foreground mb-8">
          Your payment could not be processed. Please try again or use a different payment method.
        </p>
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          <RefreshCw size={16} /> Try Again
        </Link>
      </div>
    </div>
  );
}
