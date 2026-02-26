import React, { useState } from 'react';
import type { ExternalBlob } from '../../backend';

interface ImageGalleryProps {
  imageUrl: ExternalBlob;
  productName: string;
}

export default function ImageGallery({ imageUrl, productName }: ImageGalleryProps) {
  const mainUrl = imageUrl.getDirectURL();
  // Generate pseudo-thumbnails by using the same image (in a real app these would be different angles)
  const thumbnails = [mainUrl, mainUrl, mainUrl, mainUrl];
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
        <img
          src={thumbnails[selected]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2">
        {thumbnails.map((url, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
              selected === i ? 'border-primary' : 'border-border hover:border-primary/50'
            }`}
          >
            <img src={url} alt={`${productName} view ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
