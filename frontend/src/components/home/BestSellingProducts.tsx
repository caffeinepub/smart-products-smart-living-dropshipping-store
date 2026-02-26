import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useGetProducts } from '../../hooks/useQueries';
import ProductCard from '../shop/ProductCard';
import { Skeleton } from '../ui/skeleton';

export default function BestSellingProducts() {
  const { data: products, isLoading } = useGetProducts();

  const bestSellers = products
    ? [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)
    : [];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Best Sellers</h2>
            <p className="text-muted-foreground mt-1">Our most popular products this week</p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : bestSellers.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id.toString()} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
