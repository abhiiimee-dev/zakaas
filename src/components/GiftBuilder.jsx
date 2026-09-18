import { useState } from 'react';
import { Check, Plus, X, Gift, Sparkles } from 'lucide-react';

const recipientOptions = ['Family', 'Friend', 'Festival', 'Corporate'];
const rupees = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export function GiftBuilder({ open, onClose, products = [], packaging, onAddGift }) {
  const [selected, setSelected] = useState([]);
  const [recipient, setRecipient] = useState('Family');
  const [note, setNote] = useState('');

  if (!open) return null;

  const choose = (product) => {
    setSelected((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }
      return current.length < 3 ? [...current, product] : current;
    });
  };

  const packagingPrice = Number(packaging?.price || 99);
  const snacksTotal = selected.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const total = snacksTotal + packagingPrice;
  const isReady = selected.length === 3;

  const handleAdd = () => {
    if (!isReady) return;
    onAddGift({
      selected,
      recipient,
      note,
      packaging: packaging || {
        id: 'gift-box-packaging',
        name: 'Zakaas Custom Gift Packaging',
        price: '99',
        variantId: packaging?.variantId,
      },
    });
  };

  return (
    <div
      className="builder-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Build a Zakaas gift box"
    >
      <button
        type="button"
        className="builder-scrim"
        onClick={onClose}
        aria-label="Close gift box builder"
      />
      <div className="gift-builder">
        {/* Header */}
        <div className="builder-head">
          <div className="builder-head-left">
            <p className="kicker">10 / GIFTING ARCHIVE</p>
            <h2 className="builder-title">
              BUILD A<br />
              <em>CUSTOM BOX.</em>
            </h2>
          </div>
          <button
            type="button"
            className="builder-close-btn"
            onClick={onClose}
            aria-label="Close builder"
          >
            <X size={22} />
          </button>
        </div>

        <div className="builder-grid">
          {/* Choices Column */}
          <div className="builder-choices">
            {/* Step 1 */}
            <div className="builder-section">
              <div className="builder-step-header">
                <span className="step-num">01</span>
                <div>
                  <h4>CHOOSE ANY 3 PACKS</h4>
                  <small>Selected: {selected.length} of 3</small>
                </div>
              </div>

              <div className="builder-products-grid">
                {products.slice(0, 3).map((product) => {
                  const isSelected = selected.some((item) => item.id === product.id);
                  return (
                    <button
                      type="button"
                      key={product.id}
                      className={`builder-product-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => choose(product)}
                      aria-pressed={isSelected}
                    >
                      <div className="b-card-visual">
                        <img src={product.image} alt={product.name} />
                        <span className="b-card-badge">
                          {isSelected ? <Check size={14} /> : <Plus size={14} />}
                        </span>
                      </div>
                      <div className="b-card-info">
                        <small className="b-card-kicker">
                          {product.personality || 'ZAKAAS ORIGINAL'}
                        </small>
                        <strong className="b-card-name">{product.name}</strong>
                        <span className="b-card-price">{rupees(product.price)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div className="builder-section">
              <div className="builder-step-header">
                <span className="step-num">02</span>
                <div>
                  <h4>THIS BOX IS FOR</h4>
                  <small>Tailors the presentation style</small>
                </div>
              </div>
              <div className="recipient-pill-group">
                {recipientOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setRecipient(opt)}
                    className={`recipient-pill ${recipient === opt ? 'is-active' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="builder-section">
              <div className="builder-step-header">
                <span className="step-num">03</span>
                <div>
                  <h4>PERSONAL GIFT NOTE</h4>
                  <small>Printed inside the box (Optional)</small>
                </div>
              </div>
              <div className="gift-note-wrapper">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="A taste of home from Maharashtra. May this pack disappear immediately."
                  maxLength={160}
                  className="gift-note-input"
                />
                <span className="char-count">{160 - note.length} chars left</span>
              </div>
            </div>
          </div>

          {/* Basket Summary Column */}
          <aside className="builder-summary-col">
            <div className="summary-card">
              <div className="summary-top">
                <div className="summary-brand-tag">
                  <Gift size={16} />
                  <span>ZAKAAS GIFT BOX</span>
                </div>
                <span className="summary-progress-pill">{selected.length}/3 PACKS</span>
              </div>

              <div className="box-preview-stage">
                <div className="preview-slots">
                  {[0, 1, 2].map((idx) => {
                    const item = selected[idx];
                    return (
                      <div key={idx} className={`preview-slot ${item ? 'filled' : 'empty'}`}>
                        {item ? (
                          <>
                            <img src={item.image} alt={item.name} />
                            <div className="slot-meta">
                              <span>{item.name}</span>
                              <b>{rupees(item.price)}</b>
                            </div>
                          </>
                        ) : (
                          <div className="slot-placeholder">
                            <Plus size={16} />
                            <small>Pack {idx + 1}</small>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="summary-cost-list">
                <div className="cost-row">
                  <span>Snacks ({selected.length})</span>
                  <span>{rupees(snacksTotal)}</span>
                </div>
                <div className="cost-row">
                  <span>Rigid Gift Box & Ribbon</span>
                  <span>{rupees(packagingPrice)}</span>
                </div>
                <div className="cost-row recipient-row">
                  <span>For</span>
                  <span className="for-badge">{recipient}</span>
                </div>
                {note && (
                  <div className="cost-row note-preview">
                    <span>Note included</span>
                    <small>“{note.slice(0, 30)}…”</small>
                  </div>
                )}
                <div className="cost-row total-row">
                  <span>TOTAL BUNDLE</span>
                  <b>{rupees(total)}</b>
                </div>
              </div>

              <button
                type="button"
                className="add-box-submit-btn"
                disabled={!isReady}
                onClick={handleAdd}
              >
                {selected.length === 3 ? (
                  <>
                    <Sparkles size={16} /> ADD GIFT BOX TO BAG
                  </>
                ) : (
                  `SELECT ${3 - selected.length} MORE PACK${3 - selected.length === 1 ? '' : 'S'}`
                )}
              </button>
              <small className="box-disclaimer">
                Items are safely bundled into Shopify checkout with custom line attributes.
              </small>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

