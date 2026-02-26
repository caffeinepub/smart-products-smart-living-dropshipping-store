import React, { useState, useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const DISMISS_KEY = 'cart_banner_dismissed';

export default function AbandonedCartBanner() {
  const { totalItems, openCart, isCartOpen } = useCart();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === 'true';
    setDismissed(wasDismissed);
  }, []);

  useEffect(() => {
    if (totalItems > 0 && !isCartOpen && !dismissed) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [totalItems, isCartOpen, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
      <div className="bg-foreground text-background rounded-xl shadow-card-hover px-5 py-3 flex items-center gap-3 max-w-sm">
        <ShoppingCart size={18} className="text-primary flex-shrink-0" />
        <p className="text-sm font-medium flex-1">You have {totalItems} item{totalItems > 1 ? 's' : ''} in your cart!</p>
        <button
          onClick={() => { openCart(); handleDismiss(); }}
          className="text-sm font-semibold text-primary hover:underline whitespace-nowrap"
        >
          View Cart
        </button>
        <button onClick={handleDismiss} className="text-background/50 hover:text-background ml-1">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
