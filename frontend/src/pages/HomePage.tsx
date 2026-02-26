import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BestSellingProducts from '../components/home/BestSellingProducts';
import LimitedTimeOffers from '../components/home/LimitedTimeOffers';
import CustomerReviews from '../components/home/CustomerReviews';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestSellingProducts />
      <LimitedTimeOffers />
      <CustomerReviews />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}
