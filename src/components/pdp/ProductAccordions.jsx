import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ProductAccordions({
  product = {},
  selectedPack = null
}) {
  const [openSections, setOpenSections] = useState({
    madeWay: true,
    manufacturing: true,
    ingredients: false,
    storage: false,
    shipping: false
  });

  const toggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const manufacturing = product.manufacturingInfo || {
    manufacturedBy: 'Bharat Namkeen Private Limited',
    factoryAddress: 'Bombay Super 11, Plot No. 32/33, Kuvadva to Wakaner Road, Rajkot – 360023, Gujarat, India.',
    netQuantity: '100g (1 Pack)',
    countryOfOrigin: 'India',
    foodCategory: 'Ready to Eat Traditional Savouries'
  };

  const madeWay = product.madeTheZakaasWay || [
    { title: 'SMALL BATCHES', desc: 'Crafted in limited quantities so every pack retains home-kitchen crispness.' },
    { title: 'FRESHLY PACKED', desc: 'Sealed immediately into multi-layer pouches to preserve aroma and crunch.' },
    { title: 'TRADITIONAL RECIPE', desc: 'Honest Maharashtrian recipes with roasted flours, authentic spices, and zero artificial shortcuts.' }
  ];

  const currentNetQty = selectedPack
    ? `${selectedPack.weight} (${selectedPack.title})`
    : (manufacturing.netQuantity || '100g (1 Pack)');

  return (
    <div className="zakaas-pdp-accordions" aria-label="Product specifications and details">
      {/* 1. Made the Zakaas Way */}
      <div className="zakaas-accordion-item">
        <button
          type="button"
          className="zakaas-accordion-header"
          onClick={() => toggle('madeWay')}
          aria-expanded={openSections.madeWay}
        >
          <span className="zakaas-accordion-title">MADE THE ZAKAAS WAY</span>
          <span className="zakaas-accordion-chevron">
            {openSections.madeWay ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>

        {openSections.madeWay && (
          <div className="zakaas-accordion-body">
            <div className="made-way-grid">
              {madeWay.map((item, i) => (
                <div key={i} className="made-way-pillar">
                  <span className="made-way-bullet">0{i + 1}</span>
                  <div className="made-way-content">
                    <strong className="made-way-title">{item.title}</strong>
                    <p className="made-way-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Manufacturing Information (Exact Non-Negotiable Data) */}
      <div className="zakaas-accordion-item">
        <button
          type="button"
          className="zakaas-accordion-header"
          onClick={() => toggle('manufacturing')}
          aria-expanded={openSections.manufacturing}
        >
          <span className="zakaas-accordion-title">MANUFACTURING & PACKAGING DETAILS</span>
          <span className="zakaas-accordion-chevron">
            {openSections.manufacturing ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>

        {openSections.manufacturing && (
          <div className="zakaas-accordion-body">
            <dl className="zakaas-specs-list">
              <div className="spec-row">
                <dt>MANUFACTURED BY</dt>
                <dd><strong>{manufacturing.manufacturedBy || 'Bharat Namkeen Private Limited'}</strong></dd>
              </div>
              <div className="spec-row">
                <dt>FACTORY & OFFICE</dt>
                <dd>
                  {manufacturing.factoryAddress ||
                    'Bombay Super 11, Plot No. 32/33, Kuvadva to Wakaner Road, Rajkot – 360023, Gujarat, India.'}
                </dd>
              </div>
              <div className="spec-row">
                <dt>NET QUANTITY</dt>
                <dd>{currentNetQty}</dd>
              </div>
              <div className="spec-row">
                <dt>COUNTRY OF ORIGIN</dt>
                <dd>{manufacturing.countryOfOrigin || 'India'}</dd>
              </div>
              <div className="spec-row">
                <dt>FOOD CATEGORY</dt>
                <dd>{manufacturing.foodCategory || 'Ready to Eat Traditional Savouries'}</dd>
              </div>
              {product.origin && (
                <div className="spec-row">
                  <dt>REGIONAL HERITAGE</dt>
                  <dd>{product.origin}</dd>
                </div>
              )}
              {manufacturing.shelfLife && (
                <div className="spec-row">
                  <dt>SHELF LIFE</dt>
                  <dd>{manufacturing.shelfLife}</dd>
                </div>
              )}
              {manufacturing.storageInstructions && (
                <div className="spec-row">
                  <dt>STORAGE INSTRUCTIONS</dt>
                  <dd>{manufacturing.storageInstructions}</dd>
                </div>
              )}
              {manufacturing.batchInfo && (
                <div className="spec-row">
                  <dt>BATCH & MFD</dt>
                  <dd>{manufacturing.batchInfo}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>

      {/* 3. Ingredients & Allergens */}
      {product.ingredients && (
        <div className="zakaas-accordion-item">
          <button
            type="button"
            className="zakaas-accordion-header"
            onClick={() => toggle('ingredients')}
            aria-expanded={openSections.ingredients}
          >
            <span className="zakaas-accordion-title">INGREDIENTS & ALLERGEN ADVICE</span>
            <span className="zakaas-accordion-chevron">
              {openSections.ingredients ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>

          {openSections.ingredients && (
            <div className="zakaas-accordion-body">
              <p className="zakaas-ingredients-text">
                <strong>Ingredients:</strong> {product.ingredients}
              </p>
              {product.allergenInfo && (
                <p className="zakaas-allergen-alert">
                  <strong>Allergen Advice:</strong> {product.allergenInfo}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. Shelf Life & Storage */}
      <div className="zakaas-accordion-item">
        <button
          type="button"
          className="zakaas-accordion-header"
          onClick={() => toggle('storage')}
          aria-expanded={openSections.storage}
        >
          <span className="zakaas-accordion-title">SHELF LIFE & STORAGE</span>
          <span className="zakaas-accordion-chevron">
            {openSections.storage ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>

        {openSections.storage && (
          <div className="zakaas-accordion-body">
            <p>
              <strong>Shelf Life:</strong> {product.shelfLife || '90 Days from packaging date'}.
            </p>
            <p>
              Our snacks are dispatched in sealed, airtight multi-layer pouches to keep moisture out.
              Once opened, transfer contents to a clean, dry airtight container to preserve signature crunch.
            </p>
          </div>
        )}
      </div>

      {/* 5. Shipping & Returns */}
      <div className="zakaas-accordion-item">
        <button
          type="button"
          className="zakaas-accordion-header"
          onClick={() => toggle('shipping')}
          aria-expanded={openSections.shipping}
        >
          <span className="zakaas-accordion-title">SHIPPING & CRISPNESS GUARANTEE</span>
          <span className="zakaas-accordion-chevron">
            {openSections.shipping ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>

        {openSections.shipping && (
          <div className="zakaas-accordion-body">
            <p>
              <strong>Fast Pan-India Delivery:</strong> Dispatched within 24 hours. Expected delivery within 3–5 business days across India.
            </p>
            <p>
              <strong>Freshness Promise:</strong> If your packet arrives damaged or unsealed in transit, contact our team within 48 hours for an immediate replacement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
