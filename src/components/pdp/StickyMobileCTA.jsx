import { Plus, Check } from 'lucide-react';

export function StickyMobileCTA({
  productName,
  selectedPack,
  price,
  added,
  onAddToCart,
  visible
}) {
  if (!visible) return null;

  return (
    <aside className="zakaas-sticky-mobile-cta" aria-label="Mobile quick add">
      <div className="zakaas-sticky-cta-content">
        <div className="zakaas-sticky-pack-meta">
          <span className="zakaas-sticky-pack-name">
            {productName} {selectedPack ? `(${selectedPack.title})` : ''}
          </span>
          <div className="zakaas-sticky-price-row">
            <span className="zakaas-sticky-selling-price">₹{Number(price).toFixed(0)}</span>
            {selectedPack?.mrp && (
              <span className="zakaas-sticky-mrp">₹{selectedPack.mrp}</span>
            )}
            {selectedPack?.savings && (
              <span className="zakaas-sticky-badge">SAVE ₹{selectedPack.savings}</span>
            )}
          </div>
        </div>

        <button
          type="button"
          className={`zakaas-sticky-add-btn ${added ? 'is-added' : ''}`}
          onClick={onAddToCart}
        >
          {added ? (
            <>
              ADDED <Check className="btn-icon" />
            </>
          ) : (
            <>
              ADD TO BAG <Plus className="btn-icon" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
