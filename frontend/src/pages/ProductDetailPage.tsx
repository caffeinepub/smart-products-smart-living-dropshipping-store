import React, { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Star, ShoppingCart, Zap, Shield, Truck, RefreshCw, CheckCircle, ChevronRight } from 'lucide-react';
import { useGetProduct, useGetReviewsByProduct } from '../hooks/useQueries';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { calcDiscount } from '../lib/utils';
import ImageGallery from '../components/product/ImageGallery';
import QuantitySelector from '../components/product/QuantitySelector';
import ReviewsSection from '../components/product/ReviewsSection';
import SocialShareButtons from '../components/product/SocialShareButtons';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';

const TRUST_BADGES = [
  { icon: Shield, label: 'Secure Checkout', color: 'text-green-600' },
  { icon: RefreshCw, label: '30-Day Returns', color: 'text-blue-600' },
  { icon: Truck, label: 'Free Shipping', color: 'text-primary' },
  { icon: CheckCircle, label: 'Money-Back Guarantee', color: 'text-purple-600' },
];

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const { formatPrice } = useCurrency();

  const { data: product, isLoading } = useGetProduct(BigInt(id));
  const { data: reviews = [] } = useGetReviewsByProduct(BigInt(id));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg mb-4">Product not found.</p>
        <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const hasDiscount = product.discountedPrice !== undefined && product.discountedPrice !== null;
  const displayPrice = hasDiscount ? product.discountedPrice! : product.price;
  const discount = hasDiscount ? calcDiscount(product.price, product.discountedPrice!) : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    openCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image Gallery */}
        <ImageGallery imageUrl={product.imageUrl} productName={product.name} />

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-3 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({Number(product.reviewCount)} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-bold text-primary">
              {formatPrice(Number(displayPrice))}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(Number(product.price))}
                </span>
                <span className="bg-primary text-primary-foreground text-sm font-bold px-2.5 py-1 rounded-lg">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Features */}
          {product.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={15} className="text-primary flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary font-semibold py-3 rounded-xl transition-all border border-primary/30"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all"
              >
                <Zap size={18} />
                Buy Now
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={15} className={color} />
                {label}
              </div>
            ))}
          </div>

          {/* Social share */}
          <div className="pt-2 border-t border-border">
            <SocialShareButtons productName={product.name} />
          </div>
        </div>
      </div>

      {/* Trust badges image */}
      <div className="flex justify-center mb-12">
        <img
          src="/assets/generated/trust-badges.dim_800x120.png"
          alt="Trust badges"
          className="max-w-full h-auto opacity-80"
        />
      </div>

      {/* Reviews */}
      <ReviewsSection productId={product.id} reviews={reviews} />
    </div>
  );
}
