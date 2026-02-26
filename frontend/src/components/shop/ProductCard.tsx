import React from 'react';
import { Link } from '@tanstack/react-router';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import type { Product } from '../../backend';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { calcDiscount } from '../../lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { formatPrice } = useCurrency();

  const hasDiscount = product.discountedPrice !== undefined && product.discountedPrice !== null;
  const displayPrice = hasDiscount ? product.discountedPrice! : product.price;
  const discount = hasDiscount ? calcDiscount(product.price, product.discountedPrice!) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id.toString() }}
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.imageUrl.getDirectURL()}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasDiscount && discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-9 h-9 bg-primary text-primary-foreground rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/90 shadow-card"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 flex-1 mb-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({Number(product.reviewCount)})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary text-sm">{formatPrice(Number(displayPrice))}</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(Number(product.price))}</span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          <ShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
