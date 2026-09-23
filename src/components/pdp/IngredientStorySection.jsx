export function IngredientStorySection() {
  const ingredients = [
    {
      id: 'bhajan-flour',
      name: 'Bhajan Flour',
      nativeName: 'भाजणी पीठ',
      index: '01',
      role: 'THE GRAIN BASE',
      image: '/ingredients/bhajan-flour.jpg',
      alt: 'Slow-roasted rice and chana dal Bhajan flour',
      benefit: 'Roasted rice & chana dal deliver lasting energy, plant protein and fibre.',
      description: 'Slow-roasted rice and chana dal milled together for a light, porous structure that fries to an airy, brittle crunch rather than a hard shell.'
    },
    {
      id: 'cumin',
      name: 'Cumin',
      nativeName: 'जिरे · Jeera',
      index: '02',
      role: 'THE WARM NOTE',
      image: '/ingredients/cumin.jpg',
      alt: 'Whole aromatic cumin seeds',
      benefit: 'More than flavour — a natural source of iron and antioxidant compounds.',
      description: 'Whole cumin seeds roasted directly into the dough, releasing an earthy, aromatic warmth that anchors the savoury profile.'
    },
    {
      id: 'ajwain',
      name: 'Ajwain',
      nativeName: 'ओवा · Carom',
      index: '03',
      role: 'THE DISTINCTIVE AROMA',
      image: '/ingredients/ajwain.jpg',
      alt: 'Whole ajwain carom seeds',
      benefit: 'That unmistakable Indian spice, traditionally enjoyed for its digestion-friendly qualities.',
      description: 'Pungent carom seeds that lend a bright, peppery aroma and clean herbal sharpness the moment the pouch is opened.'
    },
    {
      id: 'white-sesame',
      name: 'White Sesame',
      nativeName: 'पांढरे तीळ · Til',
      index: '04',
      role: 'THE NUTTY CRUNCH',
      image: '/ingredients/white-sesame.jpg',
      alt: 'Toasted white sesame seeds',
      benefit: 'Tiny seeds, big nutrition — with plant protein, calcium, magnesium and good fats.',
      description: 'Golden toasted seeds scattered across ridges, adding gentle nuttiness and textural contrast to every bite.'
    }
  ];

  return (
    <section className="zakaas-ingredients-composition" aria-label="Ingredients and benefits">
      <div className="ingredients-inner-container">
        {/* Editorial Section Header */}
        <div className="ingredients-header">
          <span className="section-eyebrow">WHAT’S IN THE CRUNCH</span>
          <h2 className="ingredients-title">REAL INGREDIENTS. TRADITIONAL TECHNIQUE.</h2>
          <p className="ingredients-intro">
            No starches, no chemical leaveners, no artificial flavourings. Every element has a culinary purpose in creating the authentic Maharashtrian texture and aroma.
          </p>
        </div>

        {/* 4-Card Circular Ingredient Display */}
        <div className="ingredients-cards-grid">
          {ingredients.map((item) => (
            <article key={item.id} className="ingredient-circle-card">
              {/* Circular Specimen Frame */}
              <div className="ingredient-circle-wrap">
                <div className="ingredient-circle-disc">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="ingredient-circle-img"
                  />
                </div>
                <span className="ingredient-index-badge">{item.index}</span>
              </div>

              {/* Editorial Header */}
              <div className="ingredient-meta-block">
                <span className="ingredient-role-tag">{item.role}</span>
                <h3 className="ingredient-heading-title">{item.name}</h3>
                <span className="ingredient-native-label">{item.nativeName}</span>
              </div>

              <div className="ingredient-ornamental-divider" aria-hidden="true" />

              {/* Natural Benefit Statement */}
              <p className="ingredient-benefit-quote">
                “{item.benefit}”
              </p>

              {/* Culinary & Crunch Technique */}
              <p className="ingredient-technique-text">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
