import { Minus, Plus, Trash2, X, ArrowRight, ShoppingBag } from 'lucide-react';

const formatRupees = (val) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(val || 0));

export function CartDrawer({
  open,
  lines = [],
  onClose,
  onUpdateQuantity,
  onRemoveLine,
  onCheckout,
  checkoutReady = false,
  isUpdating = false,
}) {
  const totalQuantity = lines.reduce((sum, line) => sum + (line.quantity || 1), 0);
  const subtotal = lines.reduce(
    (sum, line) => sum + Number(line.price || 0) * (line.quantity || 1),
    0
  );

  return (
    <div className={`cart-layer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="cart-scrim"
        aria-label="Close shopping bag"
        onClick={onClose}
      />
      <aside className="cart-drawer" aria-label="Shopping bag">
        {/* Header */}
        <div className="cart-head">
          <div className="cart-head-title">
            <ShoppingBag size={18} />
            <span>YOUR BAG</span>
            <span className="cart-badge-count">({totalQuantity})</span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping / brand message */}
        <div className="cart-banner">
          <span>MAHARASHTRA, REMIXED</span>
          <small>DIRECT FROM OUR KITCHEN TO YOUR TABLE</small>
        </div>

        {/* Items List */}
        <div className="cart-items">
          {lines.length > 0 ? (
            lines.map((line) => (
              <article className="cart-item-card" key={line.lineId || line.id}>
                <div className="cart-item-thumb">
                  <img src={line.image || '/zakaas-hero.png'} alt={line.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <small className="cart-item-kicker">
                      {line.personality || 'ZAKAAS ORIGINAL'}
                    </small>
                    <button
                      type="button"
                      className="cart-item-remove-btn"
                      onClick={() => onRemoveLine(line)}
                      disabled={isUpdating}
                      aria-label={`Remove ${line.name} from bag`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4 className="cart-item-title">{line.name}</h4>
                  
                  {line.attributes && line.attributes.length > 0 && (
                    <div className="cart-item-attrs">
                      {line.attributes.map((attr) => (
                        <span key={attr.key}>
                          <b>{attr.key}:</b> {attr.value}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="cart-item-bottom">
                    <span className="cart-item-price">
                      {formatRupees(Number(line.price || 0) * (line.quantity || 1))}
                    </span>
                    <div className="cart-qty-ctrl">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(line, (line.quantity || 1) - 1)}
                        disabled={isUpdating}
                        aria-label={`Decrease quantity of ${line.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="cart-qty-val">{line.quantity || 1}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(line, (line.quantity || 1) + 1)}
                        disabled={isUpdating}
                        aria-label={`Increase quantity of ${line.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-cart-state">
              <div className="empty-cart-stamp">ZAKAAS</div>
              <h3>YOUR BAG IS EMPTY.</h3>
              <p>Nothing here yet. Pick a pack of Shankarpali, Chakli, or Bhakarvadi to start.</p>
              <a href="#shop" className="empty-cart-btn" onClick={onClose}>
                EXPLORE THE ORIGINALS <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="cart-foot">
            <div className="cart-summary-row">
              <span>ESTIMATED SUBTOTAL</span>
              <b>{formatRupees(subtotal)}</b>
            </div>
            <p className="cart-foot-note">
              Shipping and applicable taxes calculated securely at Shopify checkout.
            </p>
            <button
              type="button"
              className="cart-checkout-btn"
              onClick={onCheckout}
              disabled={!checkoutReady || isUpdating}
            >
              {isUpdating ? (
                'UPDATING BAG…'
              ) : checkoutReady ? (
                <>
                  CHECKOUT WITH SHOPIFY <ArrowRight size={16} />
                </>
              ) : (
                'PREPARING SHOPIFY CHECKOUT…'
              )}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

