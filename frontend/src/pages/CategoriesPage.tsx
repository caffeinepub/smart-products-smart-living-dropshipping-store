import React from 'react';
import { Link } from '@tanstack/react-router';
import { useGetCategories, useGetProducts } from '../hooks/useQueries';
import { Skeleton } from '../components/ui/skeleton';

const CATEGORY_IMAGES: Record<string, string> = {
  'Computers': '/assets/generated/cat-electronics.dim_400x300.png',
  'Smartphones': '/assets/generated/cat-mobile.dim_400x300.png',
  'Home Appliances': '/assets/generated/cat-home-kitchen.dim_400x300.png',
  'Wearables': '/assets/generated/cat-health.dim_400x300.png',
  'Gaming': '/assets/generated/cat-electronics.dim_400x300.png',
  'Cameras': '/assets/generated/cat-electronics.dim_400x300.png',
  'Audio & Video': '/assets/generated/cat-electronics.dim_400x300.png',
  'Networking': '/assets/generated/cat-electronics.dim_400x300.png',
  'Office Equipment': '/assets/generated/cat-home-kitchen.dim_400x300.png',
  'Drones': '/assets/generated/cat-electronics.dim_400x300.png',
  '3D Printing': '/assets/generated/cat-electronics.dim_400x300.png',
  'VR & AR': '/assets/generated/cat-electronics.dim_400x300.png',
  'Smart Home': '/assets/generated/cat-home-kitchen.dim_400x300.png',
  'Electric Vehicles': '/assets/generated/cat-electronics.dim_400x300.png',
  'E-Readers': '/assets/generated/cat-electronics.dim_400x300.png',
};

const FALLBACK_IMAGE = '/assets/generated/cat-trending.dim_400x300.png';

export default function CategoriesPage() {
  const { data: categories, isLoading: catsLoading } = useGetCategories();
  const { data: products } = useGetProducts();

  const countByCategory = (cat: string) =>
    products ? products.filter((p) => p.category === cat).length : 0;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">All Categories</h1>
        <p className="text-muted-foreground">Browse our wide selection of product categories</p>
      </div>

      {catsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {(categories || []).map((cat) => (
            <Link
              key={cat}
              to="/shop"
              search={{ category: cat } as never}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
            >
              <img
                src={CATEGORY_IMAGES[cat] || FALLBACK_IMAGE}
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">{cat}</p>
                <p className="text-white/70 text-xs mt-0.5">{countByCategory(cat)} products</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
