import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateTo = (page) => setCurrentPage(page);

  if (currentPage === 'products') {
    return <ProductList onNavigate={navigateTo} />;
  }

  if (currentPage === 'cart') {
    return <CartItem onNavigate={navigateTo} />;
  }

  if (currentPage === 'about') {
    return <AboutUs onNavigate={navigateTo} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>🌿 Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <button className="get-started-btn" onClick={() => navigateTo('products')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;