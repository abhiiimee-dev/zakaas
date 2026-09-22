import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ProductAccordions({
  product = {},
  selectedPack = null
}) {
  const [openSections, setOpenSections] = useState({
    manufacturing: false,
    ingredients: true, // open by default for immediate transparency
    storage: false,
    shipping: false
  });

  const toggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const manufacturing = product.manufacturingInfo || {};
  const currentNetQty = selectedPack
    ? `${selectedPack.weight} (${selectedPack.title})`
    : (product.weight || '100g');

  return (
    <div className="zakaas-pdp-accordions" aria-label="Product specifications and details">
      {/* 1. Manufacturing Information Accordion */}
      <div className="zakaas-accordion-item">
        <button
          type="button"
          className="zakaas-accordion-header"
          onClick={() => toggle('manufacturing')}
          aria-expanded={openSections.manufacturing}
        >
          <span className="zakaas-accordion-title">MANUFACTURING INFORMATION</span>
          <span className="zakaas-accordion-chevron">
            {openSections.manufacturing ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>

        {openSections.manufacturing && (
          <div className="zakaas-accordion-body">
            <dl className="zakaas-specs-list">
              {manufacturing.manufacturedBy && (
                <div className="spec-row">
                  <dt>Manufactured By</dt>
                  <dd>{manufacturing.manufacturedBy}</dd>
                </div>
              )}
              <div className="spec-row">
                <dt>Net Quantity</dt>
                <dd>{currentNetQty}</dd>
              </div>
              {manufacturing.countryOfOrigin && (
                <div className="spec-row">
                  <dt>Country of Origin</dt>
                  <dd>{manufacturing.countryOfOrigin}</dd>
                </div>
              )}
              {manufacturing.foodCategory && (
                <div className="spec-row">
                  <dt>Food Category</dt>
                  <dd>{manufacturing.foodCategory}</dd>
                </div>
              )}
              {product.origin && (
                <div className="spec-row">
                  <dt>Regional Culinary Heritage</dt>
                  <dd>{product.origin}</dd>
                </div>
              )}
              {manufacturing.shelfLife && (
                <div className="spec-row">
                  <dt>Best Before</dt>
                  <dd>{manufacturing.shelfLife}</dd>
                </div>
              )}
              {manufacturing.storageInstructions && (
                <div className="spec-row">
                  <dt>Storage</dt>
                  <dd>{manufacturing.storageInstructions}</dd>
                </div>
              )}
              {manufacturing.batchInfo && (
                <div className="spec-row">
                  <dt>Batch & MFD</dt>
                  <dd>{manufacturing.batchInfo}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>

      {/* 2. Ingredients & Allergens */}
      {product.ingredients && (
        <div className="zakaas-accordion-item">
          <button
            type="button"
            className="zakaas-accordion-header"
            onClick={() => toggle('ingredients')}
            aria-expanded={openSections.ingredients}
          >
            <span className="zakaas-accordion-title">INGREDIENTS & ALLERGENS</span>
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

      {/* 3. Shelf Life & Storage */}
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
              <strong>Shelf Life:</strong> {product.shelfLife || '90 Days'}.
            </p>
            <p>
              Our snacks are dispatched in airtight, multi-layer pouches to seal in peak home-kitchen crunch.
              Once unsealed, transfer contents to a clean, dry airtight container. Store away from direct sunlight, humidity, and heat sources.
            </p>
          </div>
        )}
      </div>

      {/* 4. Shipping & Returns */}
      <div className="zakaas-accordion-item">
        <button
          type="button"
          className="zakaas-accordion-header"
          onClick={() => toggle('shipping')}
          aria-expanded={openSections.shipping}
        >
          <span className="zakaas-accordion-title">SHIPPING & RETURNS</span>
          <span className="zakaas-accordion-chevron">
            {openSections.shipping ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>

        {openSections.shipping && (
          <div className="zakaas-accordion-body">
            <p>
              <strong>Pan-India Shipping:</strong> All orders are dispatched within 24 hours from our Mumbai facility. Expected doorstep delivery is within 3 to 5 business days across metro and tier-1/tier-2 cities.
            </p>
            <p>
              <strong>Damage & Freshness Guarantee:</strong> Because our food items are prepared fresh without artificial preservatives, we cannot accept returns once opened. However, if your package arrives damaged, unsealed, or compromised in transit, please contact us within 48 hours for an immediate complimentary replacement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
