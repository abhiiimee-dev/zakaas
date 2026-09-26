import { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Package, Sparkles, Utensils, HeartHandshake, ShieldCheck, PackageCheck, Truck, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductSection } from '../components/ProductSection';
import { StoryFilm } from '../components/StoryFilm';
import { ReviewsSection } from '../components/ReviewsSection';
import { Footer } from '../components/Footer';

function Hero() {
  return (
    <section className="hero-film" id="top">
      <img 
        src="/zakaas-hero.png" 
        alt="ZAKAAS snack packs and hot tea at a traditional Maharashtra home" 
        fetchpriority="high"
      />
      <div className="hero-wash" />
      
      <div className="hero-content">
        <p className="kicker hero-kicker">EST. IN MAHARASHTRA · CRAFTED FOR EVERYWHERE</p>
        <h1>
          <span>THE TASTE OF HOME,</span>
          <em>MADE TO GO.</em>
        </h1>
        <p className="hero-lede">
          Traditional savouries handcrafted from slow-roasted grains and whole aromatic spices.<br />
          Tear open the aroma pack. Pass it around the table.
        </p>
        <div className="hero-cta-group">
          <a className="hero-button" href="#shop">
            SHOP THE SNACKS <ArrowUpRight size={14} />
          </a>
          <Link className="hero-button-ghost" to="/builder">
            BUILD A BOX <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="hero-taste-mark" aria-hidden="true">
        <i>★</i>
        <span>CRUNCH · SPICE · HOME ·</span>
      </div>

      <div className="hero-meta">
        <span>SCROLL TO SNACK</span>
        <span className="hero-meta-coords">18.5204° N, 73.8567° E · MAHARASHTRA</span>
      </div>
    </section>
  );
}

function VisualPromise() {
  const principles = [
    {
      id: 'taste',
      icon: Sparkles,
      title: 'AUTHENTIC FLAVOUR',
      accent: '#B8332A',
      accentBg: 'rgba(184, 51, 42, 0.08)'
    },
    {
      id: 'purity',
      icon: ShieldCheck,
      title: '100% PURE',
      accent: '#B27715',
      accentBg: 'rgba(200, 142, 40, 0.10)'
    },
    {
      id: 'crunch',
      icon: PackageCheck,
      title: 'SIGNATURE CRUNCH',
      accent: '#264A38',
      accentBg: 'rgba(38, 74, 56, 0.09)'
    },
    {
      id: 'delivery',
      icon: Truck,
      title: 'DOORSTEP DELIVERY',
      accent: '#8B3A2B',
      accentBg: 'rgba(139, 58, 43, 0.08)'
    }
  ];

  return (
    <section className="promise-section" id="promise">
      <div className="promise-container">
        <div className="promise-top-bar">
          <div>
            <p className="kicker">03 / THE ZAKAAS STANDARD</p>
            <h2>NO SHORTCUTS. <em>NO SMALL FEELING.</em></h2>
          </div>
        </div>

        <div className="promise-horizontal-track">
          {principles.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="promise-card">
                <div 
                  className="promise-icon-wrap" 
                  style={{ background: p.accentBg, color: p.accent }}
                >
                  <Icon size={26} strokeWidth={2.2} />
                </div>
                <h3>{p.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RangoliFlourish({ className, style }) {
  return (
    <svg 
      viewBox="0 0 240 240" 
      className={className} 
      style={style} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="120" cy="120" r="105" stroke="#E2B768" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
      <circle cx="120" cy="120" r="88" stroke="#E2B768" strokeWidth="1.2" opacity="0.35" />
      <circle cx="120" cy="120" r="64" stroke="#E2B768" strokeWidth="1" opacity="0.3" />
      <circle cx="120" cy="120" r="38" stroke="#E2B768" strokeWidth="1.2" opacity="0.4" />
      <circle cx="120" cy="120" r="14" stroke="#E2B768" strokeWidth="1.5" opacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <g key={deg} transform={`rotate(${deg} 120 120)`}>
          <path d="M 120 32 C 135 50, 135 62, 120 80 C 105 62, 105 50, 120 32 Z" stroke="#E2B768" strokeWidth="1.2" opacity="0.4" />
          <path d="M 120 12 C 128 22, 128 28, 120 32 C 112 28, 112 22, 120 12 Z" fill="#E2B768" opacity="0.35" />
          <circle cx="120" cy="56" r="2.5" fill="#E2B768" opacity="0.5" />
        </g>
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(deg => (
        <g key={deg} transform={`rotate(${deg} 120 120)`}>
          <path d="M 120 48 L 124 64 L 120 72 L 116 64 Z" stroke="#E2B768" strokeWidth="1" opacity="0.3" />
          <circle cx="120" cy="24" r="1.8" fill="#E2B768" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

function CuratedBoxCartouche({ count }) {
  return (
    <div className="curation-cartouche-wrap">
      <svg viewBox="0 0 220 90" className="cartouche-svg" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="goldBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5DF9E" />
            <stop offset="35%" stopColor="#C99738" />
            <stop offset="70%" stopColor="#F5DF9E" />
            <stop offset="100%" stopColor="#9C6B17" />
          </linearGradient>
          <radialGradient id="wineRadialGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#6C1717" />
            <stop offset="60%" stopColor="#4A0C0C" />
            <stop offset="100%" stopColor="#300606" />
          </radialGradient>
          <filter id="cartoucheShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.45" />
          </filter>
        </defs>
        <path 
          d="M 30 6 Q 12 6 12 24 Q 2 45 12 66 Q 12 84 30 84 L 190 84 Q 208 84 208 66 Q 218 45 208 24 Q 208 6 190 6 Z" 
          fill="url(#wineRadialGrad)" 
          stroke="url(#goldBevelGrad)" 
          strokeWidth="3.5"
          filter="url(#cartoucheShadow)"
        />
        <path 
          d="M 33 11 Q 17 11 17 26 Q 8 45 17 64 Q 17 79 33 79 L 187 79 Q 203 79 203 64 Q 212 45 203 26 Q 203 11 187 11 Z" 
          fill="none" 
          stroke="rgba(245, 223, 158, 0.45)" 
          strokeWidth="1.2" 
        />
      </svg>
      <div className="cartouche-body">
        <span className="cartouche-heading">YOUR CURATED<br />BOX SUMMARY</span>
        <span className="cartouche-count-tag">
          {count} {count === 1 ? 'ITEM' : 'ITEMS'} ADDED
        </span>
      </div>
    </div>
  );
}

function VisualGiftingSection({ onBuildBox, onAdd }) {
  const navigate = useNavigate();
  const [boxItems, setBoxItems] = useState({
    chakli: 0,
    bhakarwadi: 0,
    shankarpali: 0
  });

  const packs = [
    {
      id: 'chakli',
      name: 'CHAKLI',
      weight: '128g',
      image: '/zakaas-chakli.jpg',
      price: 160
    },
    {
      id: 'bhakarwadi',
      name: 'BHAKARWADI',
      weight: '108g',
      image: '/zakaas-bhakarwadi.jpg',
      price: 160
    },
    {
      id: 'shankarpali',
      name: 'SHANKARPALI',
      weight: '108g',
      image: '/zakaas-shankarpali.jpg',
      price: 160
    }
  ];

  const handleAddItem = (id) => {
    setBoxItems(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleRemoveItem = (id) => {
    setBoxItems(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const totalCount = boxItems.chakli + boxItems.bhakarwadi + boxItems.shankarpali;
  const rawTotal = (boxItems.chakli * 160) + (boxItems.bhakarwadi * 160) + (boxItems.shankarpali * 160);
  const discount = Math.round(rawTotal * 0.20);
  const finalPrice = Math.max(0, rawTotal - discount);

  const handleAddBoxToCart = () => {
    if (totalCount === 0) return;
    const selectedPacks = [];
    if (boxItems.chakli > 0) selectedPacks.push(`${boxItems.chakli}x Chakli`);
    if (boxItems.bhakarwadi > 0) selectedPacks.push(`${boxItems.bhakarwadi}x Bhakarwadi`);
    if (boxItems.shankarpali > 0) selectedPacks.push(`${boxItems.shankarpali}x Shankarpali`);

    const giftBoxItem = {
      id: `gift-box-curated-${Date.now()}`,
      name: 'Curated Maharashtrian Gift Box (20% Off)',
      price: finalPrice,
      image: '/zakaas-open-gift-box.png',
      personality: `Celebration Hamper · ${selectedPacks.join(', ')}`,
      quantity: 1,
      isGiftBox: true
    };

    if (typeof onAdd === 'function') {
      onAdd(giftBoxItem);
    } else if (typeof onBuildBox === 'function') {
      onBuildBox();
    }
  };

  return (
    <section className="gifting-experience-section" id="gifting">
      {/* Background Decorative Rangolis */}
      <RangoliFlourish className="curation-rangoli-bg left" />
      <RangoliFlourish className="curation-rangoli-bg right" />

      <div className="gifting-wrapper">
        {/* Celebration Special Banner */}
        <div className="curation-banner-container">
          <img 
            src="/celebration-banner.png" 
            alt="CELEBRATION SPECIAL: ENJOY 20% OFF YOUR GIFT BOX CURATION" 
            className="curation-banner-img"
          />
        </div>

        {/* Hero Header */}
        <div className="curation-hero-header">
          <h2 className="curation-main-title">
            <span>CREATE A PERFECT</span>
            <em>MAHARASHTRIAN GIFT BOX</em>
          </h2>
          <p className="curation-subtitle">
            Build your unique ZAKAAS snack box to gift and get an exclusive 20% discount applied to the entire box at checkout.
          </p>
        </div>

        {/* Master Curation Stage */}
        <div className="curation-stage">
          {/* Left: 3 Product Cards Grid */}
          <div className="curation-cards-grid">
            {packs.map((pack) => {
              const qty = boxItems[pack.id] || 0;
              return (
                <div key={pack.id} className={`curation-card ${qty > 0 ? 'is-selected' : ''}`}>
                  <div className="curation-card-image-box">
                    <img src={pack.image} alt={pack.name} className="curation-card-img" />
                    
                    {/* Top-Right Gold Checkbox Badge */}
                    <div className={`curation-card-badge ${qty > 0 ? 'is-active' : ''}`}>
                      {qty > 0 ? <Check size={12} strokeWidth={3} /> : null}
                    </div>

                    {/* Interactive Button Overlay */}
                    <div className="curation-card-btn-wrap">
                      {qty === 0 ? (
                        <button 
                          type="button" 
                          className="curation-add-btn"
                          onClick={() => handleAddItem(pack.id)}
                          aria-label={`Add ${pack.name} to box`}
                        >
                          <Plus size={13} strokeWidth={2.5} />
                          <span>ADD TO BOX</span>
                        </button>
                      ) : (
                        <div className="curation-stepper">
                          <button 
                            type="button" 
                            className="curation-step-btn"
                            onClick={() => handleRemoveItem(pack.id)}
                            aria-label={`Remove one ${pack.name}`}
                          >
                            <Minus size={12} strokeWidth={2.5} />
                          </button>
                          <span className="curation-step-count">{qty}</span>
                          <button 
                            type="button" 
                            className="curation-step-btn"
                            onClick={() => handleAddItem(pack.id)}
                            aria-label={`Add another ${pack.name}`}
                          >
                            <Plus size={12} strokeWidth={2.5} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Title & Weight */}
                  <div className="curation-card-info">
                    <h3 className="curation-card-title">{pack.name}</h3>
                    <span className="curation-card-weight">{pack.weight}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: The Open Keepsake Box & Curated Box Summary */}
          <div className="curation-box-column">
            {/* Scalloped Royal Summary Cartouche */}
            <CuratedBoxCartouche count={totalCount} />

            {/* The Open Box Graphic */}
            <div className="curation-box-stage">
              <img 
                src="/zakaas-open-gift-box.png" 
                alt="Open ZAKAAS Royal Teal and Gold Keepsake Gift Box" 
                className="curation-box-img"
              />

              {/* Dynamic Snack Pouches Resting Inside Box */}
              {totalCount > 0 && (
                <div className="curation-box-pouch-preview">
                  {packs.filter(p => boxItems[p.id] > 0).map(p => (
                    <span key={p.id} className="curation-pouch-chip">
                      {boxItems[p.id]}× {p.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Checkout / Add Box Bar */}
            <div className="curation-box-action-bar">
              {totalCount > 0 ? (
                <div className="curation-pricing-row">
                  <div className="curation-pricing-text">
                    <span className="curation-old-price">₹{rawTotal}</span>
                    <span className="curation-net-price">₹{finalPrice}</span>
                    <span className="curation-discount-pill">20% OFF</span>
                  </div>
                  <button 
                    type="button" 
                    className="curation-checkout-btn"
                    onClick={handleAddBoxToCart}
                  >
                    ADD GIFT BOX TO CART <ArrowUpRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="curation-empty-prompt">
                  <span>SELECT 1 OR MORE SNACKS TO FILL YOUR BOX</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* B2B Teaser Banner */}
        <div className="b2b-banner-box">
          <div className="b2b-banner-info">
            <p className="kicker">05 / CORPORATE & CELEBRATIONS</p>
            <h2>ZAKAAS FOR<br /><em>BUSINESS.</em></h2>
            <p>Weddings, festive hampers, corporate gifting, and retail orders. Give a gift that people genuinely devour.</p>
            <button onClick={() => navigate('/b2b')} className="b2b-banner-btn">
              ENQUIRE FOR BULK ORDERS <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="b2b-banner-words">
            <span>WEDDINGS</span>
            <span>CORPORATE</span>
            <span>FESTIVALS</span>
            <span>RETAIL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealCommunitySection() {
  const posts = [
    { 
      img: '/reels/reel-1.jpg', 
      caption: 'Evening cutting chai and crisp Chakli spirals. The sacred tea-time ritual.',
      tag: 'KOLHAPUR CHAI'
    },
    { 
      img: '/reels/reel-2.jpg', 
      caption: 'Spicy Bhakarwadi rolls packed fresh for festive snacking.',
      tag: 'FRESH BATCH'
    },
    { 
      img: '/reels/reel-3.jpg', 
      caption: 'Melt-in-mouth Shankarpali diamonds shared with family.',
      tag: 'FESTIVE DELIGHT'
    }
  ];

  return (
    <section className="community-section">
      <div className="community-header">
        <p className="kicker">07 / FROM OUR KITCHEN TO YOUR TABLE</p>
        <h2>THE SNACK TABLE<br /><em>IN THE WILD.</em></h2>
      </div>

      <div className="community-grid">
        {posts.map((post, idx) => (
          <div key={idx} className="community-card">
            <img src={post.img} alt={post.caption} loading="lazy" />
            <div className="community-card-overlay">
              <span className="community-tag">{post.tag}</span>
              <p>{post.caption}</p>
              <small>@zakaas.official</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BrandOneLiner() {
  return (
    <section className="brand-oneliner-strip" aria-label="About ZAKAAS brand introduction">
      <div className="brand-oneliner-inner">
        <div className="brand-oneliner-content">
          <span className="brand-oneliner-kicker">ABOUT ZAKAAS · OUR STORY</span>
          <p className="brand-oneliner-quote">
            “Classic Maharashtrian snacks, packed with the taste of home.”
          </p>
        </div>
        <Link to="/about" className="brand-oneliner-link">
          OUR STORY <ArrowUpRight size={13} />
        </Link>
      </div>
    </section>
  );
}

export function HomePage({ onAdd, catalog = [], products = [], live = false, onBuildBox, cartData }) {
  const displayProducts = catalog?.length ? catalog : (products?.length ? products : []);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  return (
    <div className="page-home">
      <Hero />
      <BrandOneLiner />
      <ProductSection onAdd={onAdd} products={displayProducts} live={live} cartData={cartData} />
      <StoryFilm />
      <VisualPromise />
      <VisualGiftingSection onBuildBox={onBuildBox} onAdd={onAdd} />
      <ReviewsSection />
      <RealCommunitySection />
      <Footer />
    </div>
  );
}
