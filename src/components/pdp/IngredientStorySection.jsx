export function IngredientStorySection() {
  const ingredients = [
    {
      id: 'bhajan-flour',
      name: 'Bhajan Flour',
      icon: '🌾',
      role: 'THE BASE',
      image: '/ingredients/bhajan-flour.jpg',
      alt: 'Slow-roasted rice and chana dal Bhajan flour',
      benefit: 'Roasted rice & chana dal deliver lasting energy, plant protein and fibre.',
      description: 'Slow-roasted rice and chana dal milled together for a light, porous structure that fries to an airy, brittle crunch rather than a hard shell.'
    },
    {
      id: 'cumin',
      name: 'Cumin',
      icon: '🌿',
      role: 'THE WARM NOTE',
      image: '/ingredients/cumin.jpg',
      alt: 'Whole aromatic cumin seeds',
      benefit: 'More than flavour — a natural source of iron and antioxidant compounds.',
      description: 'Whole cumin seeds roasted directly into the dough, releasing an earthy, aromatic warmth that anchors the savoury profile.'
    },
    {
      id: 'ajwain',
      name: 'Ajwain',
      icon: '🌱',
      role: 'THE DISTINCTIVE AROMA',
      image: '/ingredients/ajwain.jpg',
      alt: 'Whole ajwain carom seeds',
      benefit: 'That unmistakable Indian spice, traditionally enjoyed for its digestion-friendly qualities.',
      description: 'Pungent carom seeds that lend a bright, peppery aroma and clean herbal sharpness the moment the pouch is opened.'
    },
    {
      id: 'white-sesame',
      name: 'White Sesame',
      icon: '⚪',
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

        {/* 4-Card Grid with Small Photos and Benefits */}
        <div className="ingredients-cards-grid">
          {ingredients.map((item) => (
            <article key={item.id} className="ingredient-card">
              <div className="ingredient-image-wrap">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="ingredient-image"
                />
                <span className="ingredient-role-badge">{item.role}</span>
              </div>
              <div className="ingredient-card-body">
                <div className="ingredient-heading-row">
                  <span className="ingredient-icon" aria-hidden="true">{item.icon}</span>
                  <h3 className="ingredient-name">{item.name}</h3>
                </div>

                <div className="ingredient-benefit-box">
                  <span className="benefit-label">KEY BENEFIT</span>
                  <p className="ingredient-benefit-text">{item.benefit}</p>
                </div>

                <p className="ingredient-desc-text">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
