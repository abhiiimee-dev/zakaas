export function SnackMacroHero({ image, title, personality }) {
  const displayImage = image || '/zakaas-chakli.jpg';

  return (
    <section className="zakaas-macro-hero" aria-label="Snack macro photograph">
      <div className="macro-hero-frame">
        <img
          src={displayImage}
          alt={`${title || 'Zakaas snack'} close-up texture`}
          loading="lazy"
          className="macro-hero-image"
        />
        <div className="macro-hero-wash" />
        <div className="macro-hero-stamp-corner">
          <span className="macro-stamp-kicker">TEXTURE & SNAP</span>
          <span className="macro-stamp-product">{title || 'CHAKLI'}</span>
        </div>
      </div>

      <div className="macro-hero-caption-wrap">
        <div className="macro-hero-caption">
          <span className="macro-caption-kicker">02 / THE SENSORY TRUTH</span>
          <h2 className="macro-hero-statement">
            THE CRUNCH<br />
            YOU HEAR BEFORE<br />
            <em>YOU TASTE.</em>
          </h2>
          <p className="macro-hero-sub">
            Crisp spiral ridges fried in golden groundnut oil. Made with slow-roasted bhajan flour,
            fragrant ajwain, and whole cumin. Golden, brittle, and unapologetically loud.
          </p>
        </div>
      </div>
    </section>
  );
}
