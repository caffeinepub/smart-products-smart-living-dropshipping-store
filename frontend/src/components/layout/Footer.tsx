import React from 'react';
import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram, SiX, SiYoutube, SiTiktok } from 'react-icons/si';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const POLICY_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping Policy', to: '/shipping-policy' },
  { label: 'Return & Refund', to: '/return-policy' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

const SOCIAL_LINKS = [
  { icon: SiFacebook, href: 'https://facebook.com/helpinghandstore', label: 'Facebook' },
  { icon: SiInstagram, href: 'https://instagram.com/helpinghandstore', label: 'Instagram' },
  { icon: SiX, href: 'https://x.com/helpinghandstore', label: 'X (Twitter)' },
  { icon: SiTiktok, href: 'https://tiktok.com/@helpinghandstore', label: 'TikTok' },
  { icon: SiYoutube, href: 'https://youtube.com/@helpinghandstore', label: 'YouTube' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'helping-hand-store');

  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/logo.dim_200x60.png"
              alt="Helping Hand"
              className="h-10 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-sm text-background/70 leading-relaxed mb-4">
              Smart Products. Smart Living. — Your one-stop destination for premium products at unbeatable prices.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {POLICY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail size={15} className="text-primary flex-shrink-0" />
                support@helpinghand.store
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone size={15} className="text-primary flex-shrink-0" />
                +1 (800) 123-4567
              </li>
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin size={15} className="text-primary flex-shrink-0 mt-0.5" />
                123 Commerce Street, San Francisco, CA 94105
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-background/50">
          <p>© {year} Helping Hand. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-primary fill-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
