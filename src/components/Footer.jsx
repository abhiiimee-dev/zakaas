import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="editorial-footer">
      <div className="footer-container">
        {/* Top brand row */}
        <div className="footer-top-row">
          <div className="footer-brand-lockup">
            <img src="/zakaas-logo.png" alt="ZAKAAS" className="footer-logo-img" />
            <span className="footer-brand-motto">MAHARASHTRA, REMIXED.</span>
          </div>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Links and Nav columns */}
        <div className="footer-main-grid">
          <div className="footer-col">
            <small className="footer-col-kicker">NAVIGATION</small>
            <nav className="footer-nav-links">
              <a href="#shop">Shop Originals</a>
              <a href="#shankarpali">Shankarpali</a>
              <a href="#chakli">Chakli</a>
              <a href="#bhakarvadi">Bhakarvadi</a>
            </nav>
          </div>

          <div className="footer-col">
            <small className="footer-col-kicker">DISCOVER</small>
            <nav className="footer-nav-links">
              <a href="#story">Why Zakaas</a>
              <a href="#maharashtra">Cultural Cartography</a>
              <a href="#gifting">Custom Gift Boxes</a>
              <a href="#business">Bulk & B2B Orders</a>
            </nav>
          </div>

          <div className="footer-col">
            <small className="footer-col-kicker">DIRECT CONTACT</small>
            <div className="footer-contact-block">
              <a href="mailto:hello@zakaas.in" className="footer-email-link">
                hello@zakaas.in
              </a>
              <p>For custom orders, event curation, or retail inquiries.</p>
              <div className="footer-location-tag">
                <span>EST. IN MAHARASHTRA, INDIA</span>
              </div>
            </div>
          </div>

          <div className="footer-col footer-col-statement">
            <div className="statement-stamp">
              <span className="stamp-word">झकास</span>
              <p>“JAGAHA BADLI. SWAD NAHI.”</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom-row">
          <p>© {new Date().getFullYear()} ZAKAAS FOODS. ALL RIGHTS RESERVED.</p>
          <div className="footer-fine-meta">
            <span>PREMIUM PACKAGING</span>
            <span>·</span>
            <span>REAL MAHARASHTRIAN SPICES</span>
            <span>·</span>
            <span>DIRECT DISPATCH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
