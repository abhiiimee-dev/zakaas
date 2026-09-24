import { Minus, Plus, X, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CartDrawer({
  open,
  items = [],
  onClose,
  onChange,
  onShopifyCheckout,
  onRazorpayCheckout,
  checkoutLoading = false,
}) {
  const navigate = useNavigate();

  const countById = items.reduce((all, item) => {
    if (!item || item.id === undefined) return all;
    return { ...all, [item.id]: (all[item.id] || 0) + 1 };
  }, {});

  const unique = Object.entries(countById)
    .map(([id, quantity]) => {
      const found = items.find((item) => item && String(item.id) === String(id));
      return found ? { ...found, quantity } : null;
    })
    .filter(Boolean);

  const subtotal = unique.reduce((sum, item) => sum + Number(item.price || 150) * item.quantity, 0);

  const handleViewFullCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className={`cart-layer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button className="cart-scrim" aria-label="Close bag" onClick={onClose} />
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="cart-head">
          <p>
            YOUR BAG <span>({items.length})</span>
          </p>
          <button onClick={onClose} aria-label="Close bag">
            <X />
          </button>
        </div>

        <div className="cart-items">
          {unique.length ? (
            unique.map((item) => (
              <article key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <small>{item.personality || 'MAHARASHTRA ORIGINAL'}</small>
                  <h3>{item.name}</h3>
                  <p>“{item.line || item.description || 'Traditional taste.'}”</p>
                  <b className="drawer-item-price">₹{Number(item.price || 150).toFixed(0)}</b>
                </div>
                <div className="quantity">
                  <button onClick={() => onChange(item, -1)} aria-label={`Remove one ${item.name}`}>
                    <Minus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onChange(item, 1)} aria-label={`Add one ${item.name}`}>
                    <Plus />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-bag">Your bag is waiting for a little Maharashtra.</p>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-drawer-subtotal-row">
              <span>ESTIMATED TOTAL</span>
              <b>₹{subtotal.toFixed(0)}</b>
            </div>

            <button type="button" onClick={handleViewFullCart} className="view-cart-link">
              VIEW FULL BAG / EDIT ITEMS
            </button>

            <div className="cart-drawer-actions">
              <button
                type="button"
                onClick={onShopifyCheckout}
                disabled={!items.length || checkoutLoading}
                className="cart-checkout"
              >
                {checkoutLoading ? 'OPENING SHOPIFY CHECKOUT…' : 'CONTINUE TO SHOPIFY CHECKOUT'}
              </button>

              <div className="cart-action-divider">
                <span>OR PAY DIRECTLY</span>
              </div>

              <button
                type="button"
                onClick={onRazorpayCheckout}
                disabled={!items.length || checkoutLoading}
                className="cart-checkout cart-razorpay-btn"
              >
                💳 PAY WITH RAZORPAY (UPI / CARDS)
              </button>
            </div>

            <p className="cart-trust-note">
              <ShieldCheck size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
              100% Secure Checkout with SSL encryption
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
