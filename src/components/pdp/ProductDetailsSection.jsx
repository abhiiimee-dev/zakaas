export function ProductDetailsSection({ selectedPack }) {
  const netQty = selectedPack
    ? `${selectedPack.weight} (${selectedPack.title})`
    : '100g (1 PACK)';

  const nutritionTable = [
    { label: 'Energy', val: '524 kcal' },
    { label: 'Protein', val: '9.8 g' },
    { label: 'Carbohydrates', val: '54.2 g' },
    { label: 'Total Sugars', val: '1.4 g' },
    { label: 'Added Sugars', val: '0 g' },
    { label: 'Total Fat', val: '30.1 g' },
    { label: 'Saturated Fat', val: '6.2 g' },
    { label: 'Trans Fat', val: '0 g' },
    { label: 'Dietary Fibre', val: '6.4 g' },
    { label: 'Sodium', val: '580 mg' }
  ];

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
            Standard laboratory analysis. Prepared with traditional roasted grains, whole spices, and cold-pressed peanut oil without hydrogenated fats.
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
              <dd>
                Roasted Rice flour, Chana dal flour (Bhajan flour), White sesame seeds (Til), Ajwain seeds, Cumin seeds, Red chilli powder, Asafoetida (Hing), Salt, Cold-pressed peanut oil.
              </dd>
            </div>

            <div className="data-row">
              <dt>ALLERGEN INFORMATION</dt>
              <dd>
                Contains Sesame and Peanuts. Processed in a facility that also handles wheat and tree nuts.
              </dd>
            </div>

            <div className="data-row">
              <dt>NET QUANTITY</dt>
              <dd>{netQty}</dd>
            </div>

            <div className="data-row">
              <dt>STORAGE & SHELF LIFE</dt>
              <dd>
                90 Days from packaging date. Store in an airtight container away from heat, moisture, and direct sunlight to maintain crispness.
              </dd>
            </div>

            <div className="data-row">
              <dt>FOOD CATEGORY</dt>
              <dd>Ready to Eat Traditional Savouries</dd>
            </div>

            <div className="data-row">
              <dt>COUNTRY OF ORIGIN</dt>
              <dd>India</dd>
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
