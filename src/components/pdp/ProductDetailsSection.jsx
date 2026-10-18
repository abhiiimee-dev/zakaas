export function ProductDetailsSection({ product, selectedPack }) {
  const netQty = selectedPack
    ? `${selectedPack.weight} (${selectedPack.title})`
    : '100g (1 PACK)';

  const nutritionTable = product?.nutritionFacts?.length
    ? product.nutritionFacts.map((row) => ({
        label: row.nutrient || row.label,
        val: row.value || row.val,
      }))
    : [
        { label: 'Energy', val: '530 kcal' },
        { label: 'Protein', val: '7.1 g' },
        { label: 'Total Fat', val: '28.5 g' },
        { label: 'Saturated Fat', val: '8.2 g' },
        { label: 'Carbohydrate', val: '60.6 g' },
        { label: 'Sugars', val: '2.3 g' },
        { label: 'Dietary Fibre', val: '6 g' },
        { label: 'Sodium', val: '474 mg' }
      ];

  const mfg = product?.manufacturingInfo || {};

  return (
    <section className="zakaas-product-specs-section" aria-label="Product details and nutrition">
      <div className="specs-container">
        {/* Left Column: Nutrition at a Glance */}
        <div className="specs-nutrition-block">
          <div className="specs-header">
            <span className="section-eyebrow">NUTRITION</span>
            <h2 className="specs-title">NUTRITION AT A GLANCE</h2>
            <span className="specs-basis-note">Standard values per 100g serving</span>
          </div>

          <table className="specs-nutrition-table">
            <thead>
              <tr>
                <th scope="col">Nutrient</th>
                <th scope="col" className="text-right">Per 100g</th>
              </tr>
            </thead>
            <tbody>
              {nutritionTable.map((row, i) => (
                <tr key={i}>
                  <td>{row.label}</td>
                  <td className="text-right num-cell">{row.val}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="specs-nutrition-footnote">
            {product?.nutritionFootnote ||
              'Nutritional values per 100 g approx. as printed on the ZAKAAS product label.'}
          </p>
        </div>

        {/* Right Column: Product Specifications & Manufacturer */}
        <div className="specs-details-block">
          <div className="specs-header">
            <span className="section-eyebrow">SPECIFICATIONS</span>
            <h2 className="specs-title">PRODUCT & MAKER DETAILS</h2>
          </div>

          <dl className="specs-data-list">
            <div className="data-row">
              <dt>INGREDIENTS</dt>
              <dd>{product?.ingredients}</dd>
            </div>

            <div className="data-row">
              <dt>ALLERGEN INFORMATION</dt>
              <dd>{product?.allergenInfo}</dd>
            </div>

            <div className="data-row">
              <dt>NET QUANTITY</dt>
              <dd>{netQty}</dd>
            </div>

            <div className="data-row">
              <dt>STORAGE & SHELF LIFE</dt>
              <dd>
                {mfg.storageInstructions || 'Store in a cool, dry place. Keep sealed to maintain freshness.'}{' '}
                {mfg.shelfLife || product?.shelfLife || 'Refer to MFG. DATE and EXP. DATE printed on the pack.'}
              </dd>
            </div>

            <div className="data-row">
              <dt>FOOD CATEGORY</dt>
              <dd>{mfg.foodCategory || 'Ready to Eat Traditional Savouries'}</dd>
            </div>

            <div className="data-row">
              <dt>COUNTRY OF ORIGIN</dt>
              <dd>{mfg.countryOfOrigin || 'India'}</dd>
            </div>

            <div className="data-row manufacturer-row">
              <dt>MANUFACTURED BY</dt>
              <dd>
                <strong>Bharat Namkeen Private Limited</strong><br />
                Bombay Super 11, Plot No. 32/33, Kuvadva to Wakaner Road,<br />
                Rajkot – 360023, Gujarat, India.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
