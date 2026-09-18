import { useState } from 'react';
import { Check, Plus, ArrowUpRight, ShoppingBag, Gift, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

const recipientOptions = ['Family', 'Friends', 'Festivals', 'Corporate Gifting'];

const formatRupees = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export function BuilderPage({ products = [], packaging, onAddGift }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [recipient, setRecipient] = useState('Family');
  const [note, setNote] = useState('');
  const [added, setAdded] = useState(false);

  // Fallback to top 3 products if products empty
  const availableProducts = products.length ? products : [
    { id: 'chakli-1', name: 'ZAKAAS Chakli (250g)', price: 220, image: '/zakaas-chakli.jpg', personality: 'THE CRUNCHY CLASSIC' },
    { id: 'bhakarwadi-1', name: 'ZAKAAS Bhakarwadi (250g)', price: 240, image: '/zakaas-bhakarwadi.jpg', personality: 'THE SPICY SPIRAL' },
    { id: 'shankarpada-1', name: 'ZAKAAS Shankarpada (250g)', price: 200, image: '/zakaas-shankarpali.jpg', personality: 'THE SWEET DELIGHT' },
  ];

  const handleSelectProduct = (product) => {
    setSelected((current) => {
      const exists = current.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return current.filter((item) => String(item.id) !== String(product.id));
      }
      if (current.length < 3) {
        return [...current, product];
      }
      return current;
    });
  };

  const packagingPrice = Number(packaging?.price || 99);
  const itemsTotal = selected.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const total = itemsTotal + packagingPrice;
  const ready = selected.length === 3;

  const handleBuildBoxSubmit = () => {
    if (!ready) return;
    setAdded(true);
    if (typeof onAddGift === 'function') {
      onAddGift({
        selected,
        recipient,
        note,
        packaging: packaging || { id: 'gift-box-pkg', price: 99, variantId: 'var-pkg' },
      });
    }
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="page-builder">
      <header className="builder-hero">
        <p className="kicker">01 / CUSTOM GIFTING SERVICE</p>
        <h1>
          <span>BUILD A CUSTOM</span>
          <em>ZAKAAS GIFT BOX.</em>
        </h1>
        <p className="builder-intro">
          Pick 3 authentic Maharashtrian snack packs, choose a custom occasion sleeve, and write a personal note.
          Hand-packed with care in Pune, delivered anywhere.
        </p>
      </header>

      <main className="builder-container">
        <div className="builder-layout">
          {/* Main Customizer Steps */}
          <div className="builder-steps-col">
            {/* Step 1 */}
            <section className="builder-step-block">
              <div className="step-head">
                <span className="step-badge">STEP 01</span>
                <div>
                  <h2>PICK ANY 3 SNACK PACKS</h2>
                  <p>Choose 3 packs to combine into your signature box ({selected.length}/3 selected)</p>
                </div>
              </div>

              <div className="builder-products-grid">
                {availableProducts.map((product) => {
                  const isSelected = selected.some((item) => String(item.id) === String(product.id));
                  return (
                    <article
                      key={product.id || product.handle}
                      className={`builder-product-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelectProduct(product)}
                    >
                      <div className="card-visual">
                        <img src={product.image} alt={product.name} />
                        <span className="selection-indicator">
                          {isSelected ? <Check /> : <Plus />}
                        </span>
                      </div>
                      <div className="card-info">
                        <small>{product.personality || 'MAHARASHTRA CLASSIC'}</small>
                        <h3>{product.name}</h3>
                        <b>{formatRupees(product.price || 220)}</b>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Step 2 */}
            <section className="builder-step-block">
              <div className="step-head">
                <span className="step-badge">STEP 02</span>
                <div>
                  <h2>THIS GIFT BOX IS FOR</h2>
                  <p>Select an occasion for customized outer sleeve packaging</p>
                </div>
              </div>

              <div className="recipient-pills-row">
                {recipientOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    className={`recipient-pill ${recipient === opt ? 'is-active' : ''}`}
                    onClick={() => setRecipient(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3 */}
            <section className="builder-step-block">
              <div className="step-head">
                <span className="step-badge">STEP 03</span>
                <div>
                  <h2>ADD A PERSONAL NOTE</h2>
                  <p>We’ll print your message on a ZAKAAS postcard inside the box</p>
                </div>
              </div>

              <div className="note-input-wrap">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="A little Maharashtra, sent with love… Write your message here."
                  maxLength={180}
                  rows={4}
                />
                <small className="char-count">{note.length} / 180 characters</small>
              </div>
            </section>
          </div>

          {/* Sticky Summary Card */}
          <aside className="builder-summary-col">
            <div className="builder-summary-card">
              <div className="box-preview-header">
                <Gift className="preview-gift-icon" />
                <div>
                  <h3>YOUR ZAKAAS BOX</h3>
                  <p>Custom Gift Pack</p>
                </div>
              </div>

              <div className="box-slots-container">
                {[0, 1, 2].map((idx) => {
                  const item = selected[idx];
                  return (
                    <div key={idx} className={`box-slot-item ${item ? 'has-item' : ''}`}>
                      {item ? (
                        <>
                          <img src={item.image} alt={item.name} />
                          <div className="slot-item-details">
                            <b>{item.name}</b>
                            <small>{formatRupees(item.price || 220)}</small>
                          </div>
                          <button
                            type="button"
                            className="slot-remove-btn"
                            onClick={() => handleSelectProduct(item)}
                            title="Remove snack"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <div className="empty-slot-placeholder">
                          <span>0{idx + 1}</span>
                          <p>Choose a snack pack above</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="box-pricing-breakdown">
                <div className="price-row">
                  <span>3 SNACK PACKS</span>
                  <b>{formatRupees(itemsTotal)}</b>
                </div>
                <div className="price-row">
                  <span>SPECIAL GIFT PACKAGING</span>
                  <b>{formatRupees(packagingPrice)}</b>
                </div>
                <div className="price-row">
                  <span>CUSTOM POSTCARD NOTE</span>
                  <span className="free-tag">INCLUDED</span>
                </div>

                <div className="price-divider" />

                <div className="price-total-row">
                  <span>TOTAL BOX PRICE</span>
                  <b>{formatRupees(total)}</b>
                </div>
              </div>

              <button
                type="button"
                className={`add-box-to-bag-btn ${added ? 'is-added' : ''}`}
                disabled={!ready}
                onClick={handleBuildBoxSubmit}
              >
                {added ? (
                  <>ADDED TO BAG <Check /></>
                ) : ready ? (
                  <>ADD GIFT BOX TO BAG <ShoppingBag /></>
                ) : (
                  `CHOOSE ${3 - selected.length} MORE PACK${3 - selected.length === 1 ? '' : 'S'}`
                )}
              </button>

              <div className="builder-secondary-links">
                <Link to="/collections">← Explore All Single Packs</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
