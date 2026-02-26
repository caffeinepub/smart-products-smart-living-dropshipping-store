import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function calcDiscount(price: bigint, discountedPrice: bigint): number {
  const orig = Number(price);
  const disc = Number(discountedPrice);
  return Math.round(((orig - disc) / orig) * 100);
}

export function renderStars(rating: number): string {
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
}
