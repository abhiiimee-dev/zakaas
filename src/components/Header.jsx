import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header({ cartCount, onCartOpen, menuOpen, setMenuOpen }) {
  const [bagPulse, setBagPulse] = useState(false);
  useEffect(() => { const pulse = () => { setBagPulse(true); window.setTimeout(() => setBagPulse(false), 450); }; window.addEventListener('zakaas:add-to-bag', pulse); return () => window.removeEventListener('zakaas:add-to-bag', pulse); }, []);
  return <>
    <header className="site-header">
      <button className="header-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      <a href="#top" className="brand-mark" aria-label="ZAKAAS home"><img src="/zakaas-logo.png" alt="ZAKAAS"/></a>
      <nav aria-label="Main navigation"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#maharashtra">Maharashtra</a><a href="#gifting">Gifting</a><a href="#business">B2B</a></nav>
      <div className="header-actions"><button aria-label="Search"><Search/></button><button className="account-button">Account</button><button className={`bag-button ${bagPulse ? 'is-pulsing' : ''}`} onClick={onCartOpen} aria-label={`Shopping bag with ${cartCount} items`}><ShoppingBag/><span>{cartCount}</span></button></div>
    </header>
    <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
      {['Shop ZAKAAS','Our story','Maharashtra','Gifting','B2B'].map((item, i) => <a key={item} href={['#shop','#story','#maharashtra','#gifting','#business'][i]} onClick={() => setMenuOpen(false)}>{item}<i>0{i + 1}</i></a>)}
      <p>MAHARASHTRA.<br/>IN EVERY BITE.</p>
    </div>
  </>;
}
