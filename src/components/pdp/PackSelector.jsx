import { Check } from 'lucide-react';

export function PackSelector({ options = [], selectedOptionId, onSelect }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="zakaas-pack-selector-section">
      <div className="zakaas-pack-selector-header">
        <label className="zakaas-section-label">SELECT PACK SIZE</label>
        <span className="zakaas-pack-effective-rate">₹150 / 100g pack</span>
      </div>

      <div className="zakaas-pack-cards-grid" role="radiogroup" aria-label="Pack options">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`zakaas-pack-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect(opt)}
            >
              {opt.badge && (
                <span className={`zakaas-pack-badge ${opt.badge === 'BEST SELLER' ? 'badge-bestseller' : 'badge-stockup'}`}>
                  {opt.badge}
                </span>
              )}

              <div className="zakaas-pack-card-top">
                <div className="zakaas-pack-card-title-group">
                  <span className="zakaas-pack-count">{opt.title}</span>
                  <span className="zakaas-pack-weight">{opt.weight}</span>
                </div>
                <div className={`zakaas-radio-indicator ${isSelected ? 'is-checked' : ''}`} aria-hidden="true">
                  {isSelected && <Check className="radio-check-icon" />}
                </div>
              </div>

              <div className="zakaas-pack-card-pricing">
                <div className="zakaas-pack-price-row">
                  <span className="zakaas-pack-mrp">₹{opt.mrp}</span>
                  <span className="zakaas-pack-price">₹{opt.price}</span>
                </div>
                <div className="zakaas-pack-savings">
                  SAVE ₹{opt.savings}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
