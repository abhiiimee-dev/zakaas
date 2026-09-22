export function IngredientStorySection({ product }) {
  const ingredients = product?.ingredientBreakdown || [
    {
      name: 'BHAJAN FLOUR',
      role: 'THE BASE',
      description: 'The traditional multigrain flour base crafted from slow-roasted rice and chana dal that gives Chakli its characteristic brittle spiral ridges and savoury depth.'
    },
    {
      name: 'CUMIN (JEERA)',
      role: 'THE WARM NOTE',
      description: 'Whole seeds roasted into the dough for warm, aromatic, earthy flavour and centuries of traditional presence in Maharashtrian kitchens.'
    },
    {
      name: 'AJWAIN',
      role: 'THE DISTINCTIVE AROMA',
      description: 'Adds its unmistakable pungent aroma and sharp, savoury note that commands attention the moment the airtight packet is unsealed.'
    },
    {
      name: 'WHITE SESAME SEEDS (TIL)',
      role: 'THE NUTTY CRUNCH',
      description: 'Nutty seeds embedded throughout the ridges, toasting golden in the oil to add delicate crunch and visual heritage to every spiral.'
    },
    {
      name: 'COLD-PRESSED PEANUT OIL',
      role: 'THE CRISP MEDIUM',
      description: 'Traditional groundnut oil cooked at precise temperature to deliver that unmistakable clean, golden snap without greasiness.'
    }
  ];

  const whyStory = product?.whyIngredientsStory ||
    'Traditional Maharashtrian snack craft is culinary balance honed over generations. Slow-roasting the grains before milling (the bhajan method) pre-cooks the starches, ensuring each spiral fries to a brittle, airy crunch rather than a hard shell. Cumin and ajwain are kneaded directly into the dough to release their fragrant essential oils in the hot oil, pairing with evening chai.';

  return (
    <section className="zakaas-ingredient-story-section" aria-label="Ingredient origins and culinary science">
      <div className="ingredient-story-header">
        <span className="ingredient-kicker">04 / THE BOTANICALS & GRAINS</span>
        <h2 className="ingredient-heading">
          WHAT’S IN<br />
          <em>THE CRUNCH?</em>
        </h2>
        <p className="ingredient-intro">
          No fillers. No artificial preservatives. Just slow-roasted grains and aromatic Indian spices
          combined using classical culinary balance.
        </p>
      </div>

      {/* Editorial Ingredients Layout with Hairlines & Connectors */}
      <div className="ingredient-editorial-grid">
        {ingredients.map((ing, idx) => (
          <article key={idx} className="ingredient-editorial-card">
            <div className="ingredient-card-meta">
              <span className="ingredient-number">0{idx + 1}</span>
              <span className="ingredient-role-tag">{ing.role}</span>
            </div>
            <h3 className="ingredient-name">{ing.name}</h3>
            <p className="ingredient-desc">{ing.description}</p>
            <div className="ingredient-connector-line" aria-hidden="true" />
          </article>
        ))}
      </div>

      {/* "Why These Ingredients?" Box */}
      <div className="why-ingredients-callout">
        <div className="why-ingredients-inner">
          <span className="why-label">CULINARY CRAFT</span>
          <h4 className="why-title">WHY THESE INGREDIENTS?</h4>
          <p className="why-body">{whyStory}</p>
        </div>
      </div>
    </section>
  );
}
