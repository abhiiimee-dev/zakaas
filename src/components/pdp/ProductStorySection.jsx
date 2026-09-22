export function ProductStorySection({ product }) {
  const storyImage = product?.images?.[1] || '/zakaas-home-kitchen.png';

  return (
    <section className="zakaas-product-story-section" aria-label="Product culture and origin story">
      <div className="product-story-grid">
        {/* Left: Bold Editorial Headlines */}
        <div className="product-story-copy">
          <span className="story-kicker">03 / WHY CHAKLI?</span>
          <h2 className="story-headline">
            CRISP.<br />
            SAVOURY.<br />
            <em>VERY ZAKAAS.</em>
          </h2>

          <div className="story-body">
            <p className="story-lead">
              In Maharashtra, Chakli is not just tea-time crunch — it is the soundtrack of afternoon chai,
              spontaneous family gatherings, and loud festive conversations.
            </p>
            <p>
              We start with traditional <strong>Bhajan flour</strong> — roasted rice and chana dal ground together to create a light, porous crumb that crisps without taking on excess oil. Fresh cumin and fragrant ajwain are kneaded into the dough, releasing their essential aroma the instant the warm packet is cracked open.
            </p>
            <p className="story-tagline">
              Crafted in small batches. Deep-fried to a deep golden amber. Built for second helpings.
            </p>
          </div>

          <div className="story-badges-row">
            <div className="story-pill">
              <span className="pill-dot" />
              <span>TRADITIONAL BHAJAN METHOD</span>
            </div>
            <div className="story-pill">
              <span className="pill-dot" />
              <span>COLD-PRESSED PEANUT OIL</span>
            </div>
            <div className="story-pill">
              <span className="pill-dot" />
              <span>ZERO PRESERVATIVES</span>
            </div>
          </div>
        </div>

        {/* Right: Visual Context with authentic photograph */}
        <div className="product-story-visual-wrap">
          <div className="product-story-image-frame">
            <img
              src={storyImage}
              alt="Authentic preparation and Maharashtrian tea-time context"
              loading="lazy"
            />
            <div className="story-image-caption">
              <span>TRADITIONAL HOME KITCHEN CRAFT · MAHARASHTRA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
