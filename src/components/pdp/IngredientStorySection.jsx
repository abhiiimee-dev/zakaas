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
      nutritionalPointers: [
        {
          title: 'Long-Lasting Energy',
          text: 'Roasted grains keep you full and energetic for hours without sugar spikes or crashes.'
        },
        {
          title: 'Plant Protein & Fibre',
          text: 'Wholesome lentils give you natural daily strength and keep digestion smooth.'
        },
        {
          title: 'Light on the Stomach',
          text: 'Slow-roasted before milling so it digests easily with zero heaviness or bloating.'
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
      nutritionalPointers: [
        {
          title: 'Natural Iron Boost',
          text: 'Helps fight daily tiredness, boosts blood health, and keeps stamina up.'
        },
        {
          title: 'Better Digestion',
          text: 'Naturally triggers stomach enzymes to break down food faster and cleaner.'
        },
        {
          title: 'Fights Inflammation',
          text: 'Packed with natural antioxidants that help protect cells and keep you healthy.'
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
      nutritionalPointers: [
        {
          title: 'Stops Gas & Bloating',
          text: 'The trusted home spice that immediately relieves stomach heaviness after snacking.'
        },
        {
          title: 'Quick Acidity Relief',
          text: 'Cools and balances stomach acid naturally so you feel comfortable and light.'
        },
        {
          title: 'Good Gut Health',
          text: 'Natural antibacterial oils cleanse your digestive tract and keep your gut happy.'
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
      nutritionalPointers: [
        {
          title: 'Strong Bones & Teeth',
          text: 'One of the richest natural plant sources of calcium to support bone strength.'
        },
        {
          title: 'Heart-Healthy Oils',
          text: 'Loaded with natural good fats that support a healthy heart and cholesterol.'
        },
        {
          title: 'Immunity & Glowing Skin',
          text: 'High in zinc and vitamin E to boost your daily immune defense and skin vitality.'
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
