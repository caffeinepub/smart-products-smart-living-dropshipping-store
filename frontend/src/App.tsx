import React from 'react';
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import { CartProvider } from './contexts/CartContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <CurrencyProvider>
        <RootLayout />
      </CurrencyProvider>
    </CartProvider>
  ),
});

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const shopRoute = createRoute({ getParentRoute: () => rootRoute, path: '/shop', component: ShopPage });
const categoriesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/categories', component: CategoriesPage });
const productRoute = createRoute({ getParentRoute: () => rootRoute, path: '/product/$id', component: ProductDetailPage });
const checkoutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/checkout', component: CheckoutPage });
const orderConfirmationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/order-confirmation', component: OrderConfirmationPage });
const paymentSuccessRoute = createRoute({ getParentRoute: () => rootRoute, path: '/payment-success', component: PaymentSuccessPage });
const paymentFailureRoute = createRoute({ getParentRoute: () => rootRoute, path: '/payment-failure', component: PaymentFailurePage });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage });
const faqRoute = createRoute({ getParentRoute: () => rootRoute, path: '/faq', component: FaqPage });
const shippingPolicyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/shipping-policy', component: ShippingPolicyPage });
const returnPolicyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/return-policy', component: ReturnPolicyPage });
const privacyPolicyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/privacy-policy', component: PrivacyPolicyPage });
const termsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/terms', component: TermsPage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  categoriesRoute,
  productRoute,
  checkoutRoute,
  orderConfirmationRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  aboutRoute,
  contactRoute,
  faqRoute,
  shippingPolicyRoute,
  returnPolicyRoute,
  privacyPolicyRoute,
  termsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
