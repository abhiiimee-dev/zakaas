import { Minus, Plus, X, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Diya } from './DiwaliArt';
import { UNIT_PRICE, calculateBagSummary } from '../data/products';

const formatAmount = (val) =>
  Number(val) % 1 !== 0 ? Number(val).toFixed(2) : Number(val).toFixed(0);

export function CartDrawer({
  open,
  items = [],
  onClose,
  onChange,
  onShopifyCheckout,
  checkoutLoading = false,
}) {
  const navigate = useNavigate();
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');

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

  const summary = calculateBagSummary(items);

  const handleViewFullCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className={`cart-layer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button className="cart-scrim" aria-label="Close bag" onClick={onClose} />
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="cart-head">
          <div className="cart-head-meta">
            <p className="cart-head-title">
              YOUR BAG <span>({items.length})</span>
            </p>
            {items.length > 0 && (
              <button
                type="button"
                onClick={handleViewFullCart}
                className="cart-edit-link"
              >
                <span>VIEW / EDIT BAG</span>
                <span className="cart-edit-arrow">→</span>
              </button>
            )}
          </div>
          <button onClick={onClose} aria-label="Close bag" className="cart-close-button">
            <X />
          </button>
        </div>

        <div className="cart-diwali-banner">
          <div className="cart-diwali-banner-icon" aria-hidden="true">
            <Diya />
          </div>
          <div className="cart-diwali-banner-text">
            <strong>शुभ दीपावली · DIWALI SPECIAL</strong>
            <span>Gifting someone? Build a custom 3 or 6 pack box</span>
          </div>
          <button
            type="button"
            className="cart-diwali-banner-btn"
            onClick={() => {
              onClose();
              navigate('/builder');
            }}
          >
            BUILD BOX →
          </button>
        </div>

        <div className="cart-items">
          {unique.length ? (
            unique.map((item) => {
              const itemPrice = Number(item.price || UNIT_PRICE);
              return (
                <article key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <small>{item.personality || 'MAHARASHTRA ORIGINAL'}</small>
                    <h3>{item.name}</h3>
                    <p>{item.line || item.shortDescription || item.description || 'Traditional taste.'}</p>
                    <b className="drawer-item-price">₹{itemPrice.toFixed(0)}</b>
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
              );
            })
          ) : (
            <p className="empty-bag">Your bag is waiting for a little Maharashtra.</p>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-gift-toggle-section" style={{ padding: '12px 0', borderTop: '1px dashed var(--border-solid)', borderBottom: '1px dashed var(--border-solid)', marginBottom: '12px' }}>
              <label className="gift-toggle-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '600' }}>
                <input type="checkbox" checked={isGift} onChange={(e) => setIsGift(e.target.checked)} style={{ accentColor: 'var(--charcoal)', width: '16px', height: '16px' }} />
                <span className="gift-toggle-text" style={{ display: 'flex', alignItems: 'center' }}><Gift size={14} style={{ marginRight: '6px' }} /> IS THIS A GIFT?</span>
              </label>
              {isGift && (
                <div className="gift-options-box" style={{ marginTop: '12px' }}>
                  <p className="gift-note-hint" style={{ fontSize: '11px', color: 'var(--charcoal)', opacity: 0.8, marginBottom: '8px' }}>Prices will be hidden on the packing slip.</p>
                  <textarea
                    placeholder="Add a custom printed note (optional)..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    maxLength={150}
                    className="gift-note-input"
                    style={{ width: '100%', padding: '12px', fontSize: '13px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', border: '1.5px solid var(--charcoal)', borderRadius: '4px', resize: 'vertical', minHeight: '60px', backgroundColor: '#FFFFFF' }}
                  />
                </div>
              )}
            </div>

            <div className="cart-drawer-breakdown" style={{ display: 'grid', gap: '6px', marginBottom: '10px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>SNACK SUBTOTAL ({summary.snackCount})</span>
                <b>₹{formatAmount(summary.snackSubtotal)}</b>
              </div>
              {summary.packagingCharge > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GIFT BOX PACKAGING</span>
                  <b>₹{formatAmount(summary.packagingCharge)}</b>
                </div>
              )}
              {summary.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--red, #B8281B)' }}>
                  <span>AUTO BUNDLE DISCOUNT ({summary.discountPercent}% AT CHECKOUT)</span>
                  <b>−₹{formatAmount(summary.discountAmount)}</b>
                </div>
              )}
            </div>

            <div className="cart-drawer-subtotal-row">
              <span>ESTIMATED CHECKOUT TOTAL</span>
              <b>₹{formatAmount(summary.finalTotal)}</b>
            </div>

            <button
              type="button"
              onClick={onShopifyCheckout}
              disabled={!items.length || checkoutLoading}
              className="cart-checkout"
            >
              {checkoutLoading ? 'OPENING SHOPIFY CHECKOUT…' : 'CONTINUE TO SHOPIFY CHECKOUT'}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
