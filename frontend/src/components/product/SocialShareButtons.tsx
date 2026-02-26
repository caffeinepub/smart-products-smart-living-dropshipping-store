import React from 'react';
import { SiFacebook, SiX } from 'react-icons/si';
import { Share2 } from 'lucide-react';

interface SocialShareButtonsProps {
  productName: string;
  productUrl?: string;
}

export default function SocialShareButtons({ productName, productUrl }: SocialShareButtonsProps) {
  const url = productUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const text = encodeURIComponent(`Check out ${productName} on SmartLiving Store!`);
  const encodedUrl = encodeURIComponent(url);

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground flex items-center gap-1">
        <Share2 size={14} /> Share:
      </span>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
      >
        <SiFacebook size={13} /> Facebook
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
      >
        <SiX size={13} /> X
      </a>
    </div>
  );
}
