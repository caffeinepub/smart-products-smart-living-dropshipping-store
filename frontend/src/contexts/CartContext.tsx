import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Product } from '../backend';

export interface LocalCartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: LocalCartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'smartliving_cart';

function serializeCart(items: LocalCartItem[]): string {
  return JSON.stringify(
    items.map((item) => ({
      quantity: item.quantity,
      product: {
        ...item.product,
        id: item.product.id.toString(),
        price: item.product.price.toString(),
        discountedPrice: item.product.discountedPrice?.toString() ?? null,
        reviewCount: item.product.reviewCount.toString(),
        imageUrl: item.product.imageUrl.getDirectURL(),
      },
    }))
  );
}

function deserializeCart(raw: string): LocalCartItem[] {
  try {
    const parsed = JSON.parse(raw) as Array<{
      quantity: number;
      product: {
        id: string;
        name: string;
        description: string;
        features: string[];
        category: string;
        price: string;
        discountedPrice: string | null;
        imageUrl: string;
        rating: number;
        reviewCount: string;
      };
    }>;
    // We reconstruct minimal product objects; imageUrl is a URL string
    return parsed.map((entry) => ({
      quantity: entry.quantity,
      product: {
        id: BigInt(entry.product.id),
        name: entry.product.name,
        description: entry.product.description,
        features: entry.product.features,
        category: entry.product.category,
        price: BigInt(entry.product.price),
        discountedPrice: entry.product.discountedPrice ? BigInt(entry.product.discountedPrice) : undefined,
        rating: entry.product.rating,
        reviewCount: BigInt(entry.product.reviewCount),
        imageUrl: {
          getDirectURL: () => entry.product.imageUrl,
          getBytes: async () => new Uint8Array(),
          withUploadProgress: () => ({} as never),
        } as unknown as import('../backend').ExternalBlob,
      } as Product,
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LocalCartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? deserializeCart(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, i) => {
    const price = i.product.discountedPrice ?? i.product.price;
    return sum + Number(price) * i.quantity;
  }, 0);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, isCartOpen, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
