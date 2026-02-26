import React, { useState, useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { useGetProducts, useGetCategories } from '../hooks/useQueries';
import ProductCard from '../components/shop/ProductCard';
import ProductFilters, { type SortOption } from '../components/shop/ProductFilters';
import { Skeleton } from '../components/ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import type { Product } from '../backend';

export default function ShopPage() {
  const search = useSearch({ strict: false }) as { q?: string; category?: string };
  const [selectedCategory, setSelectedCategory] = useState(search.category || '');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: products, isLoading } = useGetProducts();
  const { data: categories = [] } = useGetCategories();

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Search query
    if (search.q) {
      const q = search.q.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price
    result = result.filter((p) => {
      const price = Number(p.discountedPrice ?? p.price);
      return price >= minPrice && (maxPrice === 0 || price <= maxPrice);
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => Number(a.discountedPrice ?? a.price) - Number(b.discountedPrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => Number(b.discountedPrice ?? b.price) - Number(a.discountedPrice ?? a.price));
        break;
      case 'newest':
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search.q, selectedCategory, sortBy, minPrice, maxPrice]);

  const handleReset = () => {
    setSelectedCategory('');
    setSortBy('popular');
    setMinPrice(0);
    setMaxPrice(100000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            {search.q ? `Search: "${search.q}"` : selectedCategory || 'All Products'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} products found</p>
        </div>

        {/* Mobile filter button */}
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={(c) => { setSelectedCategory(c); setFiltersOpen(false); }}
                sortBy={sortBy}
                onSortChange={setSortBy}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                onReset={handleReset}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onReset={handleReset}
            />
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found.</p>
              <button onClick={handleReset} className="mt-4 text-primary hover:underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id.toString()} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
