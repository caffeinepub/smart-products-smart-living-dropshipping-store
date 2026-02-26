import React from 'react';
import { Link } from '@tanstack/react-router';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-lg text-center">
      <div className="bg-card border border-border rounded-3xl p-10 shadow-card">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Your payment has been processed successfully. Thank you for shopping with SmartLiving!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Back to Home <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
