import { Minus, Plus, Trash2, ArrowUpRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function CartPage({
  items = [],
  onChange,
  onShopifyCheckout,
  checkoutLoading = false,
  checkoutReady,
  cartData,
}) {
  const countById = items.reduce((all, item) => {
    if (!item || item.id === undefined) return all;
    return { ...all, [item.id]: (all[item.id] || 0) + 1 };
  }, {});

  const uniqueItems = Object.entries(countById)
    .map(([id, quantity]) => {
      const found = items.find((item) => item && String(item.id) === String(id));
      return found ? { ...found, quantity } : null;
    })
    .filter(Boolean);

  const subtotal = uniqueItems.reduce((acc, item) => {
    const itemPrice = Number(item.price || 150);
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="page-cart">
      <div className="cart-page-hero">
        <p className="kicker">01 / YOUR SHOPPING BAG</p>
        <h1>
          <span>YOUR ZAKAAS</span>
          <em>SNACK BAG.</em>
        </h1>
        <p className="cart-page-intro">
          {items.length === 0
            ? 'Your bag is empty.'
            : `You have ${items.length} item${items.length > 1 ? 's' : ''} packed for delivery.`}
        </p>
      </div>

      <div className="cart-page-container">
        {uniqueItems.length === 0 ? (
          <div className="empty-cart-state">
            <ShoppingBag className="empty-bag-icon" />
            <h2>YOUR BAG IS WAITING FOR A LITTLE MAHARASHTRA.</h2>
            <p>Explore our classic Chakli, Bhakarwadi, Shankarpali, and Gift Sets.</p>
            <Link to="/collections" className="hero-button">
              EXPLORE STOREFRONT <ArrowUpRight />
            </Link>
          </div>
        ) : (
          <div className="cart-layout-grid">
            {/* Cart Items List */}
            <div className="cart-items-column">
              <div className="cart-table-head">
                <span>ITEM</span>
                <span>QUANTITY</span>
                <span>PRICE</span>
              </div>

              {uniqueItems.map((item) => {
                const itemPrice = Number(item.price || 150);
                return (
                  <article key={item.id} className="cart-page-item">
                    <div className="cart-item-info">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <small>{item.personality || 'MAHARASHTRA CLASSIC'}</small>
                        <h3>
                          <Link to={`/products/${item.handle || item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="cart-item-quote">“{item.line || 'A taste of home.'}”</p>
                      </div>
                    </div>

                    <div className="cart-item-qty">
                      <div className="quantity">
                        <button onClick={() => onChange(item, -1)} aria-label={`Decrease ${item.name}`}>
                          <Minus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onChange(item, 1)} aria-label={`Increase ${item.name}`}>
                          <Plus />
                        </button>
                      </div>
                      <button
                        onClick={() => onChange(item, -item.quantity)}
                        className="remove-item-btn"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 /> Remove
                      </button>
                    </div>

                    <div className="cart-item-price-col">
                      <b>₹{(itemPrice * item.quantity).toFixed(0)}</b>
                      <small>₹{itemPrice.toFixed(0)} each</small>
                    </div>
                  </article>
                );
              })}

              <div className="cart-continue-row">
                <Link to="/collections" className="light-button">
                  ← CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            {/* Cart Summary Side Card */}
            <div className="cart-summary-card">
              <h3>ORDER SUMMARY</h3>

              <div className="summary-row">
                <span>SUBTOTAL</span>
                <b>₹{subtotal.toFixed(0)}</b>
              </div>

              <div className="summary-row">
                <span>SHIPPING</span>
                <span>Calculated at Checkout</span>
              </div>

              <div className="summary-row">
                <span>TAXES</span>
                <span>Inclusive of GST</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-total-row">
                <span>ESTIMATED TOTAL</span>
                <b>₹{subtotal.toFixed(0)}</b>
              </div>

              <div className="shopify-trust-box">
                <ShieldCheck />
                <p>Secure checkout powered by Shopify.</p>
              </div>

              <div className="cart-checkout-actions">
                <button
                  type="button"
                  className="hero-button full-width-checkout"
                  disabled={!items.length || checkoutLoading}
                  onClick={onShopifyCheckout}
                >
                  {checkoutLoading ? 'CONNECTING TO SHOPIFY…' : 'PROCEED TO SHOPIFY CHECKOUT'}{' '}
                  <ArrowUpRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
