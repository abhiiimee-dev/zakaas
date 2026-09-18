import { ArrowUpRight, Mail } from 'lucide-react';

export function B2BSection() {
  const categories = [
    { title: 'CORPORATE GIFTING', desc: 'Custom branding & doorstep dispatch for teams.' },
    { title: 'WEDDINGS & FESTIVALS', desc: 'Curated dabbas that guests actually finish.' },
    { title: 'HOSPITALITY & EVENTS', desc: 'High-energy snack stations and welcome hampers.' },
    { title: 'RETAIL & DISTRIBUTION', desc: 'Stock Zakaas originals on premium shelves.' },
  ];

  return (
    <section className="b2b-editorial-section" id="business">
      <div className="b2b-container">
        <div className="b2b-grid">
          {/* Left: Pitch & Action */}
          <div className="b2b-pitch-column">
            <p className="kicker">11 / BULK & ENTERPRISE</p>
            <h2 className="b2b-display-title">
              ZAKAAS FOR<br />
              <span className="accent-text">BUSINESS.</span>
            </h2>
            <p className="b2b-lede">
              Make your next corporate gesture, festive hamper, or wedding gift one people actually
              remember and talk about. Custom quantities, curated presentation, nationwide delivery.
            </p>
            <div className="b2b-cta-wrap">
              <a
                href="mailto:hello@zakaas.in?subject=Zakaas%20Bulk%20%26%20B2B%20Inquiry"
                className="b2b-primary-email-btn"
              >
                <Mail size={18} />
                <span>ENQUIRE FOR BULK ORDERS</span>
                <ArrowUpRight size={18} />
              </a>
              <span className="b2b-direct-email">or write directly to hello@zakaas.in</span>
            </div>
          </div>

          {/* Right: Category List */}
          <div className="b2b-categories-column">
            <div className="b2b-categories-list">
              {categories.map((cat, idx) => (
                <div className="b2b-cat-item" key={cat.title}>
                  <div className="cat-top">
                    <span className="cat-idx">0{idx + 1}</span>
                    <h3 className="cat-title">{cat.title}</h3>
                  </div>
                  <p className="cat-desc">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
