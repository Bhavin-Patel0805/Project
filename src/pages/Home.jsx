import React from 'react'
import BannerHome from '../Components/BannerHome'
import CategoriesHome from '../Components/CategoriesHome';
import ComingSoonWatchPage from '../Components/ComingSoonWatchPage';
import FashionPage from '../Components/FashionPage';
import TestimonialsPage from '../Components/TestimonialsPage';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div>
      <BannerHome />
      <CategoriesHome />
      <ComingSoonWatchPage />
      <FashionPage />
      <TestimonialsPage />
      <Footer />
    </div>
  )
}

export default Home;
