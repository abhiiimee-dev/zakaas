export function IngredientStorySection() {
  const ingredients = [
    {
      id: 'bhajan-flour',
      name: 'Bhajan Flour',
      nativeName: 'भाजणी पीठ',
      index: '01',
      role: 'THE GRAIN BASE',
      image: '/ingredients/bhajan-flour.jpg',
      isFlour: true,
      alt: 'Slow-roasted rice and chana dal Bhajan flour',
      benefit: 'Roasted rice & chana dal deliver lasting energy, plant protein and fibre.',
      nutritionalPointers: [
        {
          title: 'Sustained Energy',
          text: 'Complex low-GI carbs from slow-roasted grains deliver steady stamina without sugar crashes.'
        },
        {
          title: 'Plant Protein & Fibre',
          text: 'Wholesome chana & urad pulses nourish muscles and provide natural prebiotic dietary fibre.'
        },
        {
          title: 'Effortless Digestion',
          text: 'Traditional slow-roasting breaks down tough starches, making it exceptionally light on the gut.'
        }
      ]
    },
    {
      id: 'cumin',
      name: 'Cumin',
      nativeName: 'जिरे · Jeera',
      index: '02',
      role: 'THE WARM NOTE',
      image: '/ingredients/cumin.jpg',
      isFlour: false,
      alt: 'Whole aromatic cumin seeds',
      benefit: 'More than flavour — a natural source of iron and antioxidant compounds.',
      nutritionalPointers: [
        {
          title: 'Bioavailable Iron',
          text: 'Rich natural dietary iron essential for healthy hemoglobin formation and active cellular vitality.'
        },
        {
          title: 'Digestive Spark',
          text: 'Natural thymol triggers active digestive enzymes to accelerate nutrient assimilation.'
        },
        {
          title: 'Antioxidant Shield',
          text: 'Concentrated apigenin and luteolin flavonoids help defend cells from oxidative stress.'
        }
      ]
    },
    {
      id: 'ajwain',
      name: 'Ajwain',
      nativeName: 'ओवा · Carom',
      index: '03',
      role: 'THE DISTINCTIVE AROMA',
      image: '/ingredients/ajwain.jpg',
      isFlour: false,
      alt: 'Whole ajwain carom seeds',
      benefit: 'That unmistakable Indian spice, traditionally enjoyed for its digestion-friendly qualities.',
      nutritionalPointers: [
        {
          title: 'Potent Active Thymol',
          text: 'Renowned essential oil compound that delivers rapid gut soothing, calm, and acid balance.'
        },
        {
          title: 'Anti-Bloating Action',
          text: 'Prized carminative properties alleviate post-snack abdominal fullness and heaviness.'
        },
        {
          title: 'Gut Motility Support',
          text: 'Antimicrobial bio-actives promote healthy gut microflora and smooth intestinal comfort.'
        }
      ]
    },
    {
      id: 'white-sesame',
      name: 'White Sesame',
      nativeName: 'पांढरे तीळ · Til',
      index: '04',
      role: 'THE NUTTY CRUNCH',
      image: '/ingredients/white-sesame.jpg',
      isFlour: false,
      alt: 'Toasted white sesame seeds',
      benefit: 'Tiny seeds, big nutrition — with plant protein, calcium, magnesium and good fats.',
      nutritionalPointers: [
        {
          title: 'Natural Calcium Source',
          text: 'Superior plant-based mineral density to strengthen bones, joints, and musculoskeletal wellness.'
        },
        {
          title: 'Heart-Healthy Fats',
          text: 'Rich in sesamin, sesamolin, and healthy polyunsaturated lipids for cardiovascular vitality.'
        },
        {
          title: 'Immunity & Mineral Boost',
          text: 'High in zinc, magnesium, and vitamin E to nourish cellular immunity and combat fatigue.'
        }
      ]
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
                    className={`ingredient-circle-img ${item.isFlour ? 'zoom-flour' : ''}`}
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

              {/* Natural Benefit Statement (Main bold black line retained) */}
              <p className="ingredient-benefit-quote">
                “{item.benefit}”
              </p>

              {/* 3 Nutritional Benefit Pointers */}
              <ul className="ingredient-nutritional-pointers" aria-label={`Nutritional benefits of ${item.name}`}>
                {item.nutritionalPointers.map((point, idx) => (
                  <li key={idx} className="nutritional-pointer-item">
                    <span className="pointer-icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div className="pointer-text-group">
                      <strong className="pointer-title">{point.title}:</strong>{' '}
                      <span className="pointer-detail">{point.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
