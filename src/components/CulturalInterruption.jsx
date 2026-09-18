import { Sparkles } from 'lucide-react';

export function CulturalInterruption() {
  return (
    <section className="cultural-interruption" aria-label="Cultural Visual Intervention">
      <div className="interruption-container">
        {/* Top Marquee header */}
        <div className="interruption-marquee">
          <span>
            MAHARASHTRA REMIXED · संस्कृती · REAL MASALA · 100% NO FILTER · आवाज वाढव · HIGH DECIBEL CRUNCH · MAHARASHTRA REMIXED · संस्कृती · REAL MASALA · 100% NO FILTER · आवाज वाढव · HIGH DECIBEL CRUNCH ·
          </span>
        </div>

        {/* Collage Grid Spread */}
        <div className="interruption-poster-grid">
          {/* Card 1: Bold Street Poster / Typography */}
          <div className="poster-panel poster-statement">
            <span className="poster-badge">07 / CULTURAL DISRUPTION</span>
            <div className="devanagari-giant" aria-hidden="true">
              झकास
            </div>
            <h3 className="poster-headline">
              BORN IN THE KITCHEN.<br />
              <span>REMIXED FOR THE STREET.</span>
            </h3>
            <p className="poster-copy">
              No nostalgia trip. No royal heritage claims. Just real spice blends roasted on
              iron tavas and the sound of someone breaking into the steel dabba before tea is ready.
            </p>
            <div className="poster-stamp-box">
              <span className="stamp-title">VERIFIED TASTE</span>
              <span className="stamp-sub">100% MAHARASHTRIAN</span>
            </div>
          </div>

          {/* Card 2: Archival Photo + Modern Overlay */}
          <div className="poster-panel poster-archive-mashup">
            <div className="archive-image-wrapper">
              <img
                src="/zakaas-story-film.png"
                alt="Maharashtra home kitchen tradition"
                className="archive-bg-img"
                loading="lazy"
              />
              <div className="archive-wash" />
              <div className="archive-floating-tag">
                <small>ARCHIVE FRAGMENT</small>
                <strong>KITCHEN 01</strong>
              </div>
            </div>
            <div className="archive-overlay-text">
              <div className="devanagari-accent">महाराष्ट्र</div>
              <p className="archive-quote">
                “BEFORE PACKETS. BEFORE SHELVES.<br />THERE WAS THE DABBA.”
              </p>
            </div>
          </div>

          {/* Card 3: Graphic Typography & Rules */}
          <div className="poster-panel poster-rules">
            <div className="rules-header">
              <Sparkles size={16} />
              <span>THE THREE NON-NEGOTIABLES</span>
            </div>
            <ol className="rules-list">
              <li>
                <span className="rule-num">01</span>
                <div>
                  <strong>CRUNCH FIRST, TALK LATER</strong>
                  <p>A snack that doesn't make sound across the room is not a Maharashtrian snack.</p>
                </div>
              </li>
              <li>
                <span className="rule-num">02</span>
                <div>
                  <strong>REAL COCONUT & SESAME HEAT</strong>
                  <p>No generic chili powder dusting. Real toasted masala ground fresh.</p>
                </div>
              </li>
              <li>
                <span className="rule-num">03</span>
                <div>
                  <strong>PACKED TO DISAPPEAR</strong>
                  <p>Designed to be shared, argued over, and finished within 10 minutes flat.</p>
                </div>
              </li>
            </ol>
            <div className="rules-footer-badge">
              <span>ZAKAAS STANDARDS · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
