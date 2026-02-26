import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { SiPaypal } from 'react-icons/si';

export type PaymentMethod = 'stripe' | 'paypal' | 'upi';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  const methods: Array<{ id: PaymentMethod; label: string; icon: React.ReactNode; description: string }> = [
    {
      id: 'stripe',
      label: 'Credit / Debit Card',
      icon: <CreditCard size={20} />,
      description: 'Visa, Mastercard, Amex',
    },
    {
      id: 'paypal',
      label: 'PayPal',
      icon: <SiPaypal size={20} />,
      description: 'Pay with your PayPal account',
    },
    {
      id: 'upi',
      label: 'UPI',
      icon: <Smartphone size={20} />,
      description: 'Google Pay, PhonePe, BHIM',
    },
  ];

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selected === method.id
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/40'
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={method.id}
            checked={selected === method.id}
            onChange={() => onSelect(method.id)}
            className="sr-only"
          />
          <div className={`${selected === method.id ? 'text-primary' : 'text-muted-foreground'}`}>
            {method.icon}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{method.label}</p>
            <p className="text-xs text-muted-foreground">{method.description}</p>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected === method.id ? 'border-primary' : 'border-border'
          }`}>
            {selected === method.id && <div className="w-2 h-2 rounded-full bg-primary" />}
          </div>
        </label>
      ))}

      {/* Conditional form fields */}
      {selected === 'stripe' && (
        <div className="mt-4 space-y-3 p-4 bg-secondary/30 rounded-xl border border-border">
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Expiry Date</label>
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={7}
                className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">CVV</label>
              <input
                type="text"
                placeholder="123"
                maxLength={4}
                className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      )}

      {selected === 'paypal' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
          <p className="text-sm text-blue-700 font-medium">You'll be redirected to PayPal to complete your payment securely.</p>
        </div>
      )}

      {selected === 'upi' && (
        <div className="mt-4 p-4 bg-secondary/30 rounded-xl border border-border">
          <label className="text-xs font-medium text-foreground mb-1 block">UPI ID</label>
          <input
            type="text"
            placeholder="yourname@upi"
            className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      )}
    </div>
  );
}
