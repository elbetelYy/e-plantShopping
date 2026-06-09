import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

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

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (name) => {
    dispatch(removeItem(name));
  };

  const handleCheckout = () => {
    alert('🌿 Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <div className="cart-page">
        <h2 className="cart-title">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty 🌱</p>
            <button className="continue-btn" onClick={() => onNavigate('products')}>
              Browse Plants
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.name} className="cart-card">
                  <img src={item.image} alt={item.name} className="cart-thumbnail" />
                  <div className="cart-details">
                    <h4>{item.name}</h4>
                    <p className="unit-price">Unit Price: <strong>${item.price.toFixed(2)}</strong></p>
                    <p className="item-total">Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
                    <div className="qty-controls">
                      <button onClick={() => handleDecrease(item)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrease(item)}>+</button>
                    </div>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(item.name)}>🗑 Delete</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total Amount: <span>${totalAmount.toFixed(2)}</span></h3>
              <div className="cart-actions">
                <button className="continue-btn" onClick={() => onNavigate('products')}>
                  ← Continue Shopping
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;