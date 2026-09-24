import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export function Header({ cartCount, onCartOpen, menuOpen, setMenuOpen, onSearchOpen }) {
  const [bagPulse, setBagPulse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const pulse = () => {
      setBagPulse(true);
      window.setTimeout(() => setBagPulse(false), 450);
    };
    window.addEventListener('zakaas:add-to-bag', pulse);
    return () => window.removeEventListener('zakaas:add-to-bag', pulse);
  }, []);

  const navItems = [
    { label: 'SHOP', path: '/collections' },
    { label: 'BUILD A BOX', path: '/builder' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header className="site-header">
        <button className="header-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>

        <Link to="/" className="brand-mark" aria-label="ZAKAAS home">
          <img src="/zakaas-logo.png" alt="ZAKAAS" />
        </Link>

        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button onClick={onSearchOpen} aria-label="Search snacks">
            <Search />
          </button>
          <button
            type="button"
            className={`bag-button ${bagPulse ? 'is-pulsing' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (typeof onCartOpen === 'function') {
                onCartOpen();
              } else {
                navigate('/cart');
              }
            }}
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag />
            <span>{cartCount}</span>
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-links">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.label} <i>0{i + 1}</i>
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            CONTACT US <i>0{navItems.length + 1}</i>
          </Link>
          <Link to="/b2b" onClick={() => setMenuOpen(false)}>
            B2B & BULK <i>0{navItems.length + 2}</i>
          </Link>
        </div>
        <p className="mobile-tagline">
          MAHARASHTRA.<br />IN EVERY BITE.
        </p>
      </div>
    </>
  );
}
