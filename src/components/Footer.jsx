import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="zakaas-footer">
      <div className="footer-main-row">
        <div className="footer-brand-col">
          <Link to="/" aria-label="ZAKAAS Home">
            <img src="/zakaas-logo.png" alt="ZAKAAS" className="footer-logo" />
          </Link>
          <p className="footer-tagline">MAHARASHTRA IN EVERY BITE.</p>
          <div className="footer-coords">
            <small>18.5204° N, 73.8567° E · PUNE & MUMBAI</small>
          </div>
        </div>

        <div className="footer-nav-grid">
          <div className="footer-col">
            <h4>SHOP</h4>
            <Link to="/collections">Collections</Link>
            <Link to="/builder">Build a Box</Link>
          </div>

          <div className="footer-col">
            <h4>ZAKAAS</h4>
            <Link to="/about">About Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/b2b">B2B / Bulk Orders</Link>
          </div>

          <div className="footer-col">
            <h4>POLICIES</h4>
            <Link to="/policies#shipping">Shipping Policy</Link>
            <Link to="/policies#returns">Return & Refund Policy</Link>
            <Link to="/policies#delivery">Delivery Policy</Link>
            <Link to="/policies#terms">Terms of Service</Link>
            <Link to="/policies#privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} ZAKAAS. ALL TASTE RESERVED.</small>
        <div className="footer-socials">
          <a href="https://www.instagram.com/zakaas.in/" target="_blank" rel="noreferrer">INSTAGRAM</a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">WHATSAPP</a>
          <a href="mailto:hello@zakaas.in">EMAIL US</a>
        </div>
      </div>
    </footer>
  );
}
