import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (v: number) => void;
  onMaxPriceChange: (v: number) => void;
  onReset: () => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <SlidersHorizontal size={16} />
          Filters
        </div>
        <button onClick={onReset} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
          <X size={12} /> Reset
        </button>
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === '' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-secondary text-foreground'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === cat ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-secondary text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(Number(e.target.value))}
            min={0}
            placeholder="Min"
            className="w-full h-9 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <span className="text-muted-foreground text-sm">–</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            min={0}
            placeholder="Max"
            className="w-full h-9 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
    </div>
  );
}
