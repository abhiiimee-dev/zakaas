import { useEffect, useRef } from 'react';

export function IngredientStorySection() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.ingredient-open-card');
    elements.forEach(el => observer.observe(el));

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  const ingredients = [
    {
      id: 'bhajan-flour',
      name: 'Bhajan Flour',
      nativeName: 'भाजणी पीठ',
      index: '01',
      role: 'THE GRAIN BASE',
      image: '/ingredients/bhajan-flour.png',
      alt: 'Slow-roasted rice and chana dal Bhajan flour',
      nutritionalPointers: [
        {
          title: 'Long-Lasting Energy',
          text: 'Roasted grains keep you full and energetic without sugar crashes.'
        },
        {
          title: 'Plant Protein & Fibre',
          text: 'Wholesome lentils give natural strength and keep digestion smooth.'
        },
        {
          title: 'Light on the Stomach',
          text: 'Slow-roasted before milling so it digests easily with zero heaviness.'
        }
      ]
    },
    {
      id: 'cumin',
      name: 'Cumin',
      nativeName: 'जिरे · Jeera',
      index: '02',
      role: 'THE WARM NOTE',
      image: '/ingredients/cumin.png',
      alt: 'Whole aromatic cumin seeds',
      nutritionalPointers: [
        {
          title: 'Natural Iron Boost',
          text: 'Helps fight daily tiredness, supports blood health, and keeps stamina up.'
        },
        {
          title: 'Better Digestion',
          text: 'Naturally triggers stomach enzymes to break down food faster.'
        },
        {
          title: 'Fights Inflammation',
          text: 'Packed with natural antioxidants that help protect cells.'
        }
      ]
    },
    {
      id: 'ajwain',
      name: 'Ajwain',
      nativeName: 'ओवा · Carom',
      index: '03',
      role: 'THE DISTINCTIVE AROMA',
      image: '/ingredients/ajwain.png',
      alt: 'Whole ajwain carom seeds',
      nutritionalPointers: [
        {
          title: 'Stops Gas & Bloating',
          text: 'Trusted home spice that relieves stomach heaviness after snacking.'
        },
        {
          title: 'Quick Acidity Relief',
          text: 'Balances stomach acid naturally so you feel comfortable and light.'
        },
        {
          title: 'Good Gut Health',
          text: 'Natural essential oils keep your digestive tract clean and happy.'
        }
      ]
    },
    {
      id: 'white-sesame',
      name: 'White Sesame',
      nativeName: 'पांढरे तीळ · Til',
      index: '04',
      role: 'THE NUTTY CRUNCH',
      image: '/ingredients/white-sesame.png',
      alt: 'Toasted white sesame seeds',
      nutritionalPointers: [
        {
          title: 'Strong Bones & Teeth',
          text: 'Rich natural plant source of calcium to support bone strength.'
        },
        {
          title: 'Heart-Healthy Oils',
          text: 'Loaded with natural good fats that support heart wellness.'
        },
        {
          title: 'Immunity & Vitality',
          text: 'High in zinc and vitamin E to support daily immune defense.'
        }
      ]
    }
  ];

  return (
    <section className="zakaas-ingredients-composition" aria-label="Ingredients and benefits">
      <style>{`
        .zakaas-ingredients-composition {
          background-color: var(--bg-khadi, #F6EFE2);
          padding: 44px 24px 48px;
          border-top: 2px solid var(--charcoal, #1A1815);
          position: relative;
        }
        .ingredients-inner-container {
          max-width: 1260px;
          margin: 0 auto;
        }
        .ingredients-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 34px auto;
        }
        .section-eyebrow {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--red, #B8281B);
          display: block;
          margin-bottom: 8px;
        }
        .ingredients-title {
          font-size: clamp(1.75rem, 3.2vw, 2.5rem);
          line-height: 1.08;
          color: var(--charcoal, #1A1815);
          margin: 0 0 10px 0;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .ingredients-intro {
          font-size: 15px;
          line-height: 1.45;
          color: rgba(26, 24, 21, 0.78);
          font-style: italic;
          margin: 0 auto;
        }
        .ingredients-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }
        .ingredient-open-card {
          background: #ffffff;
          border: 1.5px solid var(--charcoal, #1A1815);
          border-radius: 8px;
          box-shadow: 4px 4px 0 var(--charcoal, #1A1815);
          padding: 20px 16px 18px;
          opacity: 0;
          transform: translateY(24px) scale(0.97);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .ingredient-open-card.reveal-active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .ingredient-open-card.reveal-active:hover {
          transform: translate(-3px, -3px);
          box-shadow: 7px 7px 0 var(--charcoal, #1A1815);
        }
        .ingredient-open-card:nth-child(2) { transition-delay: 0.08s; }
        .ingredient-open-card:nth-child(3) { transition-delay: 0.16s; }
        .ingredient-open-card:nth-child(4) { transition-delay: 0.24s; }

        .ingredient-card-topbar {
          position: absolute;
          top: -16px;
          left: 16px;
          background: var(--ochre, #D9822B);
          color: #fff;
          border: 1.5px solid var(--charcoal, #1A1815);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: serif;
          font-style: italic;
          font-size: 16px;
          font-weight: 700;
          box-shadow: 2px 2px 0 var(--charcoal, #1A1815);
          z-index: 2;
          margin: 0;
        }
        .ingredient-index-badge {
          background: transparent;
          border: none;
          padding: 0;
          color: inherit;
          font: inherit;
        }

        .ingredient-open-image-wrap {
          background: var(--bg-khadi, #F6EFE2);
          border: 1.5px dashed rgba(26, 24, 21, 0.18);
          border-radius: 6px;
          padding: 10px;
          margin: 4px 0 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 112px;
        }
        .ingredient-open-img {
          max-height: 92px;
          width: auto;
          object-fit: contain;
          transition: transform 0.4s ease;
        }
        .ingredient-open-card:hover .ingredient-open-img {
          transform: scale(1.08) rotate(4deg);
        }

        .ingredient-meta-block {
          border-bottom: 1.5px solid var(--charcoal, #1A1815);
          padding-bottom: 10px;
          margin-bottom: 12px;
          text-align: center;
        }
        .ingredient-role-tag {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--charcoal, #1A1815);
          display: inline-block;
          border: 1px solid var(--charcoal, #1A1815);
          padding: 2px 7px;
          border-radius: 4px;
          margin-bottom: 6px;
          background: var(--bg-khadi, #F6EFE2);
        }
        .ingredient-heading-title {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 2px 0;
          color: var(--charcoal, #1A1815);
          line-height: 1.15;
        }
        .ingredient-native-label {
          font-family: serif;
          font-size: 14px;
          color: var(--red, #B8281B);
          font-style: italic;
        }

        .ingredient-nutritional-pointers {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
          flex-grow: 1;
          border-top: none;
        }
        .nutritional-pointer-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .pointer-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          background: var(--bg-khadi, #F6EFE2);
          border: 1px solid var(--charcoal, #1A1815);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }
        .pointer-text-group {
          font-size: 12.5px;
          line-height: 1.36;
          text-align: left;
        }
        .pointer-title {
          font-weight: 700;
          color: var(--charcoal, #1A1815);
          display: inline;
        }
        .pointer-detail {
          color: rgba(26, 24, 21, 0.78);
        }

        @media (max-width: 1024px) {
          .ingredients-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }
        }
        @media (max-width: 600px) {
          .zakaas-ingredients-composition {
            padding: 36px 16px 38px;
          }
          .ingredients-header {
            margin-bottom: 22px;
          }
          .ingredients-title {
            font-size: clamp(22px, 6vw, 26px);
          }
          .ingredients-intro {
            font-size: 13.5px;
          }
          .ingredients-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 10px;
          }
          .ingredient-open-card {
            padding: 14px 10px 12px;
            box-shadow: 3px 3px 0 var(--charcoal, #1A1815);
          }
          .ingredient-card-topbar {
            width: 26px;
            height: 26px;
            font-size: 12px;
            top: -12px;
            left: 10px;
          }
          .ingredient-open-image-wrap {
            height: 76px;
            padding: 6px;
            margin: 2px 0 8px;
          }
          .ingredient-open-img {
            max-height: 64px;
          }
          .ingredient-meta-block {
            padding-bottom: 7px;
            margin-bottom: 8px;
          }
          .ingredient-role-tag {
            font-size: 8px;
            padding: 1px 5px;
            margin-bottom: 4px;
          }
          .ingredient-heading-title {
            font-size: 15px;
          }
          .ingredient-native-label {
            font-size: 11.5px;
          }
          .ingredient-nutritional-pointers {
            gap: 6px;
          }
          .nutritional-pointer-item {
            gap: 5px;
          }
          .pointer-icon {
            width: 14px;
            height: 14px;
          }
          .pointer-text-group {
            font-size: 11px;
            line-height: 1.32;
          }
        }
        @media (max-width: 345px) {
          .ingredients-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="ingredients-inner-container">
        <div className="ingredients-header">
          <span className="section-eyebrow">WHAT’S IN THE CRUNCH</span>
          <h2 className="ingredients-title">REAL INGREDIENTS. TRADITIONAL TECHNIQUE.</h2>
          <p className="ingredients-intro">
            No starches, no chemical leaveners, no artificial flavourings. Every element has a culinary purpose in creating the authentic Maharashtrian texture and aroma.
          </p>
        </div>

        <div className="ingredients-cards-grid">
          {ingredients.map((item) => (
            <article key={item.id} className="ingredient-open-card">
              <div className="ingredient-card-topbar">
                <span className="ingredient-index-badge">{item.index}</span>
              </div>

              <div className="ingredient-open-image-wrap">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="ingredient-open-img"
                />
              </div>

              <div className="ingredient-meta-block">
                <span className="ingredient-role-tag">{item.role}</span>
                <h3 className="ingredient-heading-title">{item.name}</h3>
                <span className="ingredient-native-label">{item.nativeName}</span>
              </div>

              <ul className="ingredient-nutritional-pointers" aria-label={`Nutritional benefits of ${item.name}`}>
                {item.nutritionalPointers.map((point, idx) => (
                  <li key={idx} className="nutritional-pointer-item">
                    <span className="pointer-icon" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
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
