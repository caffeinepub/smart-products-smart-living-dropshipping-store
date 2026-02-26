import React from 'react';
import { Link } from '@tanstack/react-router';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isCartOpen, closeCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBag size={48} className="text-muted-foreground/30" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button asChild onClick={closeCart} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ product, quantity }) => {
                const price = product.discountedPrice ?? product.price;
                const lineTotal = Number(price) * quantity;
                return (
                  <div key={product.id.toString()} className="flex gap-3">
                    <img
                      src={product.imageUrl.getDirectURL()}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border border-border flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                      <p className="text-sm text-primary font-semibold mt-0.5">{formatPrice(lineTotal)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                          className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-40 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border px-6 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t border-border pt-3">
                <span>Total</span>
                <span className="text-primary">{formatPrice(subtotal)}</span>
              </div>
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={closeCart}
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
