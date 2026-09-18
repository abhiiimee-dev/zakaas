import { Menu, ShoppingBag, X, ArrowUpRight } from 'lucide-react';

export function Header({ cartCount = 0, onCartOpen, menuOpen, setMenuOpen }) {
  const navLinks = [
    { label: 'SHOP', href: '#shop', num: '01' },
    { label: 'STORY', href: '#story', num: '02' },
    { label: 'GIFTING', href: '#gifting', num: '03' },
    { label: 'B2B', href: '#business', num: '04' },
  ];

  return (
    <>
      <header className="site-header">
        <div className="header-left">
          <button
            type="button"
            className="header-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="menu-btn-label">MENU</span>
          </button>

          <a href="#top" className="brand-logo" aria-label="ZAKAAS Home">
            <img src="/zakaas-logo.png" alt="ZAKAAS" />
          </a>
        </div>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#gifting" className="header-badge-link">
            BUILD A BOX
          </a>
          <button
            type="button"
            className="bag-trigger"
            onClick={onCartOpen}
            aria-label={`Open bag, ${cartCount} items`}
          >
            <ShoppingBag size={16} />
            <span className="bag-text">BAG</span>
            <span className="bag-pill">{cartCount}</span>
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu-overlay ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <img src="/zakaas-logo.png" alt="ZAKAAS" />
          </div>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-menu-content">
          <p className="mobile-menu-kicker">MAHARASHTRA, REMIXED</p>
          <nav className="mobile-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-nav-item"
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-nav-num">{link.num}</span>
                <span className="mobile-nav-text">{link.label}</span>
                <ArrowUpRight size={22} className="mobile-nav-arrow" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-meta">
            <span>MUMBAI · PUNE · NASHIK · KOLHAPUR · NAGPUR</span>
            <p>Traditional snacks. Re-art-directed for right now.</p>
          </div>
          <button
            type="button"
            className="mobile-bag-btn"
            onClick={() => {
              setMenuOpen(false);
              onCartOpen();
            }}
          >
            <ShoppingBag size={18} />
            <span>VIEW BAG ({cartCount})</span>
          </button>
        </div>
      </div>
    </>
  );
}

