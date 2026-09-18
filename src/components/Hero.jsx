import { ArrowUpRight } from 'lucide-react';

export function Hero({ onShopClick }) {
  return (
    <section className="hero-editorial" id="top">
      {/* Background Graphic Grid */}
      <div className="hero-grid-bg" aria-hidden="true">
        <div className="grid-cell" />
        <div className="grid-cell" />
        <div className="grid-cell" />
        <div className="grid-cell" />
      </div>

      <div className="hero-main-container">
        {/* Top Tagline / Meta */}
        <div className="hero-top-bar">
          <div className="hero-tag-badge">
            <span className="badge-dot" />
            <span>EST. IN MAHARASHTRA · CRAFTED FOR NOW</span>
          </div>
          <div className="hero-coords">
            <span>18.5204° N, 73.8567° E</span>
            <span className="coord-divider">/</span>
            <span>EDITION 2026</span>
          </div>
        </div>

        {/* Center Grid: Left Headline & Copy, Right Pack Hero */}
        <div className="hero-split">
          <div className="hero-headline-column">
            <p className="hero-pretitle">THE CONTEMPORARY SNACK LABEL</p>
            <h1 className="hero-headline">
              <span className="headline-line">MAHARASHTRA,</span>
              <span className="headline-line accent-color">REMIXED.</span>
            </h1>

            <p className="hero-sublede">
              Not museum food. Not nostalgia. High-decibel crunch, real spice, and the
              unapologetic swagger of Maharashtra's greatest snacks.
            </p>

            <div className="hero-cta-group">
              <a href="#shop" className="hero-primary-cta" onClick={onShopClick}>
                <span>SHOP THE SNACKS</span>
                <ArrowUpRight size={18} />
              </a>
              <a href="#story" className="hero-secondary-cta">
                <span>DISCOVER ZAKAAS</span>
              </a>
            </div>

            <div className="hero-stamp-row">
              <div className="stamp-item">
                <strong>100%</strong>
                <small>AUTHENTIC CRUNCH</small>
              </div>
              <div className="stamp-divider" />
              <div className="stamp-item">
                <strong>03</strong>
                <small>ORIGINALS</small>
              </div>
              <div className="stamp-divider" />
              <div className="stamp-item">
                <strong>ZERO</strong>
                <small>COMPROMISES</small>
              </div>
            </div>
          </div>

          <div className="hero-visual-column">
            <div className="hero-poster-frame">
              {/* Devanagari graphic stamp */}
              <div className="hero-devanagari-stamp" aria-hidden="true">
                झकास
              </div>

              {/* Real Product Packaging visual */}
              <div className="hero-pack-composition">
                <img
                  src="/zakaas-hero.png"
                  alt="ZAKAAS snack pack collection in authentic Maharashtra setting"
                  className="hero-pack-img"
                />
              </div>

              {/* Editorial floating sticker / label */}
              <div className="hero-floating-sticker">
                <div className="sticker-ring">
                  <span>CRUNCH FIRST · QUESTIONS LATER · </span>
                </div>
                <div className="sticker-core">★</div>
              </div>

              <div className="hero-caption-pill">
                <span className="pill-dot" />
                <span>PACK NO. 01 — THE THREE ORIGINALS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ticker bar */}
        <div className="hero-bottom-ticker">
          <div className="ticker-track">
            <span>SHANKARPALI · CHAKLI · BHAKARVADI · MADE TO DISAPPEAR · JUST ONE MORE · CRUNCH FIRST · AMI KONALA NAI GHABRAT · SHANKARPALI · CHAKLI · BHAKARVADI · MADE TO DISAPPEAR · JUST ONE MORE · CRUNCH FIRST · AMI KONALA NAI GHABRAT · </span>
          </div>
        </div>
      </div>
    </section>
  );
}
