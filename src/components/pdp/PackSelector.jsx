export function PackSelector({ options = [], selectedOptionId, onSelect }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="zakaas-pack-selector">
      <div className="pack-selector-label-row">
        <span className="pack-select-heading">SELECT QUANTITY</span>
        <span className="pack-unit-price">₹150 / 100g pack</span>
      </div>

      <div className="pack-options-row" role="radiogroup" aria-label="Pack options">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isBestSeller = opt.badge === 'BEST SELLER';

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`pack-option-pill ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect(opt)}
            >
              {isBestSeller && (
                <span className="pack-bestseller-tag">BEST SELLER</span>
              )}

              <div className="pack-option-title-line">
                <span className="pack-option-name">{opt.title}</span>
                <span className="pack-option-weight">{opt.weight}</span>
              </div>

              <div className="pack-option-price-line">
                <span className="pack-current-price">₹{opt.price}</span>
                <span className="pack-mrp-price">₹{opt.mrp}</span>
              </div>

              <span className="pack-savings-note">Save ₹{opt.savings}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
