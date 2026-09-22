export function IngredientStorySection() {
  const ingredients = [
    {
      name: 'BHAJAN FLOUR',
      role: 'THE BASE',
      description: 'Slow-roasted rice and chana dal milled together. Roasting pre-cooks the grains, creating a light, porous structure that fries to an airy, brittle crunch rather than a hard shell.'
    },
    {
      name: 'CUMIN',
      role: 'THE WARM NOTE',
      description: 'Whole cumin seeds roasted directly into the dough. When fried, they release an earthy, aromatic warmth that anchors the savoury profile.'
    },
    {
      name: 'AJWAIN',
      role: 'THE DISTINCTIVE AROMA',
      description: 'Pungent carom seeds that lend a bright, peppery aroma and clean herbal sharpness the moment the pouch is opened.'
    },
    {
      name: 'WHITE SESAME SEEDS',
      role: 'THE NUTTY CRUNCH',
      description: 'Golden toasted seeds scattered across the ridges, adding gentle nuttiness and textural contrast to every bite.'
    }
  ];

  return (
    <section className="zakaas-ingredients-composition" aria-label="Ingredients and preparation">
      <div className="ingredients-inner-container">
        {/* Editorial Section Header */}
        <div className="ingredients-header">
          <span className="section-eyebrow">WHAT’S IN THE CRUNCH</span>
          <h2 className="ingredients-title">REAL INGREDIENTS. TRADITIONAL TECHNIQUE.</h2>
          <p className="ingredients-intro">
            No starches, no chemical leaveners, no artificial flavourings. Every element has a culinary purpose in creating the authentic Maharashtrian texture and aroma.
          </p>
        </div>

        {/* Single Integrated Composition: Real Photo + Clean Typographic Details */}
        <div className="ingredients-composition-layout">
          <div className="ingredients-visual">
            <img
              src="/zakaas-chakli.jpg"
              alt="Crisp Maharashtrian Chakli showing toasted spices and sesame seeds"
              loading="lazy"
              className="ingredients-main-image"
            />
            <div className="ingredients-caption">
              <span>TRADITIONAL BHAJAN FLOUR · ROASTED WHOLE SPICES · COLD-PRESSED OIL</span>
            </div>
          </div>

          <div className="ingredients-list-flow">
            {ingredients.map((item, index) => (
              <div key={index} className="ingredient-entry">
                <div className="ingredient-title-line">
                  <h3 className="ingredient-heading">{item.name}</h3>
                  <span className="ingredient-role">{item.role}</span>
                </div>
                <p className="ingredient-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
