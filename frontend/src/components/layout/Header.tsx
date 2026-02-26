import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useCurrency, type Currency } from '../../contexts/CurrencyContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import CartDrawer from '../cart/CartDrawer';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'INR', 'AUD'];

export default function Header() {
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: '/shop', search: { q: searchQuery.trim() } as never });
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-card border-b border-border transition-shadow duration-200 ${
          isScrolled ? 'shadow-card' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/assets/generated/logo.dim_200x60.png"
                alt="Helping Hand"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors [&.active]:text-primary [&.active]:font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden sm:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-40 lg:w-56 h-9 pl-3 pr-9 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                    <Search size={16} />
                  </button>
                </div>
              </form>

              {/* Currency */}
              <div className="hidden sm:flex items-center gap-1 text-sm">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="h-9 px-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={22} className="text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 mt-6">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 rounded-lg text-base font-medium hover:bg-secondary transition-colors [&.active]:bg-primary/10 [&.active]:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  {/* Mobile search */}
                  <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="mt-6 px-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full h-10 pl-3 pr-10 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Search size={16} />
                      </button>
                    </div>
                  </form>
                  {/* Mobile currency */}
                  <div className="mt-4 px-1">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as Currency)}
                      className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
