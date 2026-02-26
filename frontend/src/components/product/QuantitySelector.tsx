import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-0 border border-border rounded-xl overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center hover:bg-secondary disabled:opacity-40 transition-colors"
      >
        <Minus size={14} />
      </button>
      <span className="w-12 text-center font-semibold text-sm">{quantity}</span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center hover:bg-secondary disabled:opacity-40 transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
