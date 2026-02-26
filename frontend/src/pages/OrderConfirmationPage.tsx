import React, { useEffect } from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function OrderConfirmationPage() {
  const search = useSearch({ strict: false }) as { orderId?: string };
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderId = search.orderId || 'N/A';
  const estimatedDelivery = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg text-center">
      <div className="bg-card border border-border rounded-3xl p-10 shadow-card">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Order Confirmed! 🎉
        </h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="bg-secondary/50 rounded-2xl p-5 mb-6 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-bold text-primary">#{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order Date</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Delivery</span>
            <span className="font-medium">{estimatedDelivery}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <Package size={13} /> Processing
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          A confirmation email has been sent to your email address. You'll receive tracking information once your order ships.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Continue Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
