import { ArrowUpRight } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="brand-story-section" id="story">
      <div className="story-editorial-container">
        {/* Top Header */}
        <div className="story-meta-header">
          <span className="story-chapter-num">08</span>
          <span className="story-chapter-tag">WHY ZAKAAS EXISTS</span>
        </div>

        <div className="story-layout-grid">
          {/* Left: Giant typographic statement */}
          <div className="story-hero-statement">
            <h2 className="story-display-heading">
              THE STEEL DABBA<br />
              <span>WAS SACRED.</span>
            </h2>
            <p className="story-sub-heading">
              Every home in Maharashtra had that one tin. You knew where it was hidden. You knew
              how quietly to pry the lid off.
            </p>
          </div>

          {/* Right: Crisp, human paragraphs */}
          <div className="story-body-column">
            <div className="story-manifesto-block">
              <p>
                We started ZAKAAS because snack shelves had become boring, generic, and sanitized.
                The snacks we loved weren’t quiet or polite. They were fiery, deeply aromatic,
                and made with real cumin, sesame, coconut, and crisp ghee dough.
              </p>
              <p>
                We don’t treat Maharashtra’s food culture like a museum exhibit. We treat it like
                living energy. The recipes stay loyal to the craft. The attitude is for right now.
              </p>
            </div>

            <div className="story-principles-grid">
              <div className="principle-card">
                <small>01 / BELIEF</small>
                <h4>NO SHORTCUTS</h4>
                <p>Authentic spice combinations that taste exactly like home, not industrial flavoring.</p>
              </div>
              <div className="principle-card">
                <small>02 / DESIGN</small>
                <h4>CONTEMPORARY PACK</h4>
                <p>Bags made to live on dinner tables, desks, and festival spreads with pride.</p>
              </div>
            </div>

            <div className="story-action-row">
              <a href="#shop" className="story-shop-btn">
                <span>TASTE THE DIFFERENCE</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
