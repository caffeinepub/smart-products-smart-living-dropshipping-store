import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';
import LiveChatWidget from '../chat/LiveChatWidget';
import AbandonedCartBanner from '../cart/AbandonedCartBanner';
import { Toaster } from '../ui/sonner';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <LiveChatWidget />
      <AbandonedCartBanner />
      <Toaster richColors position="top-right" />
    </div>
  );
}
