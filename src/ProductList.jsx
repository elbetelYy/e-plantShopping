import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsData = [
  {
    category: "Aromatic Plants",
    plants: [
      { name: "Lavender", price: 12.99, image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=300", description: "Calming fragrance, great for relaxation." },
      { name: "Mint", price: 8.99, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300", description: "Fresh scent, perfect for teas and cooking." },
      { name: "Rosemary", price: 9.99, image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300", description: "Earthy aroma, ideal for kitchens." },
      { name: "Jasmine", price: 14.99, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10616?w=300", description: "Sweet floral scent for any room." },
      { name: "Lemon Balm", price: 10.99, image: "https://images.unsplash.com/photo-1600411833114-f4ef8e6b9a06?w=300", description: "Citrus fragrance that lifts mood." },
      { name: "Basil", price: 7.99, image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=300", description: "Classic herb with a sweet aroma." },
    ]
  },
  {
    category: "Medicinal Plants",
    plants: [
      { name: "Aloe Vera", price: 11.99, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10616?w=300", description: "Soothes skin and heals minor burns." },
      { name: "Chamomile", price: 13.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300", description: "Calming herb used in herbal teas." },
      { name: "Echinacea", price: 15.99, image: "https://images.unsplash.com/photo-1490750967868-88df5691cc17?w=300", description: "Boosts immunity naturally." },
      { name: "Turmeric", price: 12.49, image: "https://images.unsplash.com/photo-1615485500830-2b17404b60b2?w=300", description: "Anti-inflammatory powerhouse." },
      { name: "Ginger", price: 9.49, image: "https://images.unsplash.com/photo-1573414404851-08e9c4e2a6a2?w=300", description: "Aids digestion and reduces nausea." },
      { name: "Holy Basil", price: 10.49, image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=300", description: "Adaptogen that reduces stress." },
    ]
  },
  {
    category: "Air-Purifying Plants",
    plants: [
      { name: "Snake Plant", price: 16.99, image: "https://images.unsplash.com/photo-1585702076782-38f3f75fa7de?w=300", description: "Filters toxins, thrives in low light." },
      { name: "Peace Lily", price: 18.99, image: "https://images.unsplash.com/photo-1566694271855-1100250db148?w=300", description: "Removes airborne pollutants." },
      { name: "Spider Plant", price: 13.49, image: "https://images.unsplash.com/photo-1601985705806-5b9a291f87f0?w=300", description: "Easy to grow, cleans indoor air." },
      { name: "Pothos", price: 10.99, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300", description: "Trailing vine that purifies the air." },
      { name: "Bamboo Palm", price: 22.99, image: "https://images.unsplash.com/photo-1502780809386-f33bfbe3cc97?w=300", description: "Adds tropical feel, cleans air." },
      { name: "Dracaena", price: 19.99, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300", description: "Bold leaves, excellent air purifier." },
    ]
  },
];

function Navbar({ onNavigate }) {
  const cartItems = useSelector(state => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('landing')}>🌿 Paradise Nursery</div>
      <div className="navbar-links">
        <button onClick={() => onNavigate('landing')}>Home</button>
        <button onClick={() => onNavigate('products')}>Plants</button>
        <button onClick={() => onNavigate('cart')} className="cart-btn">
          🛒 Cart {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
        </button>
      </div>
    </nav>
  );
}

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const isInCart = (name) => cartItems.some(item => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <div className="product-page">
        <h2 className="page-title">Our Plants</h2>
        {plantsData.map(section => (
          <div key={section.category} className="category-section">
            <h3 className="category-title">{section.category}</h3>
            <div className="plants-grid">
              {section.plants.map(plant => (
                <div key={plant.name} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                  <div className="plant-info">
                    <h4>{plant.name}</h4>
                    <p className="plant-description">{plant.description}</p>
                    <p className="plant-price">${plant.price.toFixed(2)}</p>
                    <button
                      className={`add-to-cart-btn ${isInCart(plant.name) ? 'added' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;