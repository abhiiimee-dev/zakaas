import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CartDrawer({ open, items, onClose, onChange, onCheckout, checkoutReady }) {
  const navigate = useNavigate();
  const countById = items.reduce((all, item) => ({ ...all, [item.id]: (all[item.id] || 0) + 1 }), {});
  const unique = Object.entries(countById).map(([id, quantity]) => ({ ...items.find(item => item.id === id), quantity }));

  const handleViewFullCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className={`cart-layer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button className="cart-scrim" aria-label="Close bag" onClick={onClose} />
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="cart-head">
          <p>YOUR BAG <span>({items.length})</span></p>
          <button onClick={onClose} aria-label="Close bag"><X /></button>
        </div>

        <div className="cart-items">
          {unique.length ? (
            unique.map(item => (
              <article key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <small>{item.personality || 'MAHARASHTRA ORIGINAL'}</small>
                  <h3>{item.name}</h3>
                  <p>“{item.line || item.description || 'Traditional taste.'}”</p>
                  <b className="drawer-item-price">₹{Number(item.price || 200).toFixed(0)}</b>
                </div>
                <div className="quantity">
                  <button onClick={() => onChange(item, -1)} aria-label={`Remove one ${item.name}`}><Minus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onChange(item, 1)} aria-label={`Add one ${item.name}`}><Plus /></button>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-bag">Your bag is waiting for a little Maharashtra.</p>
          )}
        </div>

        <div className="cart-foot">
          <button type="button" onClick={handleViewFullCart} className="view-cart-link">
            VIEW FULL BAG / EDIT ITEMS
          </button>
          <p>{checkoutReady ? 'Secure checkout is powered by Shopify.' : 'Preparing your Shopify checkout…'}</p>
          <button
            onClick={onCheckout}
            disabled={!items.length || !checkoutReady}
            className="cart-checkout"
          >
            CONTINUE TO SHOPIFY CHECKOUT
          </button>
        </div>
      </aside>
    </div>
  );
}
