import React, { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { Shield, ChevronRight, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useSubmitOrder } from '../hooks/useQueries';
import PaymentMethodSelector, { type PaymentMethod } from '../components/checkout/PaymentMethodSelector';
import { toast } from 'sonner';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'India', 'Japan', 'Singapore', 'UAE', 'Other',
];

const INITIAL_FORM: FormData = {
  fullName: '', email: '', phone: '', street: '', city: '', state: '', zip: '', country: 'United States',
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const submitOrder = useSubmitOrder();

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.street.trim()) newErrors.street = 'Street address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.zip.trim()) newErrors.zip = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePlaceOrder = async () => {
    if (!validate()) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const cartItems = items.map((item) => ({
        productId: item.product.id,
        quantity: BigInt(item.quantity),
      }));
      const orderId = await submitOrder.mutateAsync(cartItems);
      clearCart();
      navigate({ to: '/order-confirmation', search: { orderId: orderId.toString() } as never });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to place order';
      if (msg.includes('Unauthorized')) {
        toast.error('Please log in to place an order');
      } else {
        toast.error(msg);
      }
    }
  };

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-foreground">Checkout</span>
      </nav>

      <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">Checkout</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Link to="/shop" className="text-primary hover:underline font-medium">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-foreground text-lg mb-5">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Full Name *"
                  value={form.fullName}
                  onChange={(v) => handleChange('fullName', v)}
                  error={errors.fullName}
                  placeholder="John Doe"
                />
                <FormField
                  label="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={(v) => handleChange('email', v)}
                  error={errors.email}
                  placeholder="john@example.com"
                />
                <FormField
                  label="Phone Number *"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => handleChange('phone', v)}
                  error={errors.phone}
                  placeholder="+1 (555) 000-0000"
                />
                <div className="sm:col-span-2">
                  <FormField
                    label="Street Address *"
                    value={form.street}
                    onChange={(v) => handleChange('street', v)}
                    error={errors.street}
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>
                <FormField
                  label="City *"
                  value={form.city}
                  onChange={(v) => handleChange('city', v)}
                  error={errors.city}
                  placeholder="New York"
                />
                <FormField
                  label="State / Province *"
                  value={form.state}
                  onChange={(v) => handleChange('state', v)}
                  error={errors.state}
                  placeholder="NY"
                />
                <FormField
                  label="ZIP / Postal Code *"
                  value={form.zip}
                  onChange={(v) => handleChange('zip', v)}
                  error={errors.zip}
                  placeholder="10001"
                />
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Country</label>
                  <select
                    value={form.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-foreground text-lg mb-5">Payment Method</h2>
              <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="font-semibold text-foreground text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {items.map(({ product, quantity }) => {
                  const price = product.discountedPrice ?? product.price;
                  return (
                    <div key={product.id.toString()} className="flex gap-3">
                      <img
                        src={product.imageUrl.getDirectURL()}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                      </div>
                      <p className="text-sm font-semibold flex-shrink-0">
                        {formatPrice(Number(price) * quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-border pt-3">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={submitOrder.isPending}
                className="w-full mt-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitOrder.isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    Place Order Securely
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                <Shield size={12} />
                256-bit SSL encrypted checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-10 px-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors ${
          error ? 'border-destructive' : 'border-border'
        }`}
      />
      {error && (
        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}
