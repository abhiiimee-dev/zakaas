import { useEffect, useState } from 'react';
import { ArrowUpRight, Award, ShieldCheck, Package, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductSection } from '../components/ProductSection';
import { StoryFilm } from '../components/StoryFilm';
import { ReviewsSection } from '../components/ReviewsSection';
import { Footer } from '../components/Footer';
import { Rangoli, Diya } from '../components/DiwaliArt';
import { UNIT_PRICE, GIFT_PACKAGING_PRICE, ACTIVE_GIFT_DISCOUNT } from '../data/products';

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
        <p className="hero-subline" style={{ fontSize: '14px', maxWidth: '36ch', opacity: 0.9, lineHeight: 1.4, margin: '0 0 24px 0' }}>
          Chakli, bhakarwadi and shankarpali. Fresh-fried, packed in Pune.
        </p>
        <div className="hero-cta-group">
          <a className="hero-button" href="#shop">
            SHOP THE SNACKS <ArrowUpRight size={14} />
          </a>
          <Link className="hero-button-ghost" to="/builder">
            SEND A GIFT BOX <ArrowUpRight size={14} />
          </Link>
        </div>
        <p className="hero-mono-footer" style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', opacity: 0.8, marginTop: '24px', textTransform: 'uppercase' }}>
          ₹{UNIT_PRICE} PER 100G · SHIPS PAN-INDIA
        </p>
      </div>

      <div className="hero-meta">
        <span>SCROLL TO SNACK</span>
        <span className="hero-meta-coords">18.5204° N, 73.8567° E · MAHARASHTRA</span>
      </div>
    </section>
  );
}

function ZakaasStandard() {
  const standards = [
    { icon: <Award color="#B8281B" size={20} strokeWidth={1.6} />, title: 'AUTHENTIC FLAVOUR' },
    { icon: <ShieldCheck color="#D9822B" size={20} strokeWidth={1.6} />, title: '100% VEGETARIAN' },
    { icon: <Package color="#2E5A44" size={20} strokeWidth={1.6} />, title: 'SIGNATURE CRUNCH' },
    { icon: <Truck color="#B8281B" size={20} strokeWidth={1.6} />, title: 'DOORSTEP DELIVERY' }
  ];
  return (
    <section className="zakaas-standard" style={{ backgroundColor: '#ffffff', padding: '56px 24px', borderBottom: '2px solid #1A1815' }}>
      <div className="zakaas-standard-inner" style={{ maxWidth: '1020px', margin: '0 auto' }}>
        <span className="zakaas-standard-kicker" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(26,24,21,0.7)', fontWeight: 'bold' }}>03 / THE ZAKAAS STANDARD</span>
        <h2 className="zakaas-standard-heading" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', marginTop: '10px', marginBottom: '28px', color: '#1A1815', fontWeight: '800', letterSpacing: '-0.02em' }}>
          NO SHORTCUTS. <em style={{fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'normal', color: '#1A1815'}}>NO SMALL FEELING.</em>
        </h2>

        <div className="zakaas-standard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px' }}>
          {standards.map((s, i) => (
            <div key={i} className="zakaas-standard-card" style={{
              backgroundColor: '#fff',
              border: '2px solid #1A1815',
              borderRadius: '10px',
              padding: '24px 16px',
              textAlign: 'center',
              boxShadow: '4px 4px 0 #1A1815',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div className="zakaas-standard-icon" style={{
                width: '46px',
                height: '46px',
                margin: '0 auto 14px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                backgroundColor: '#FDFBF7',
                border: '1.5px solid rgba(26,24,21,0.15)'
              }}>
                {s.icon}
              </div>
              <h3 className="zakaas-standard-title" style={{ fontSize: '12px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#1A1815', margin: 0, letterSpacing: '0.05em' }}>{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Rich entry point to the gifting flow at /builder. */
function GiftTeaser() {
  return (
    <section className="gift-teaser" id="gifting" aria-labelledby="gift-teaser-title" style={{ backgroundColor: 'var(--bg-khadi, #F6EFE2)', padding: '130px 24px 120px', textAlign: 'center', borderBottom: '2px solid #1A1815', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(26,24,21,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5, pointerEvents: 'none' }} />

      <div className="gt-toran" aria-hidden="true" />
      <div className="gt-paithani" aria-hidden="true" />

      <figure className="gt-side gt-side-left" aria-hidden="true">
        <Rangoli />
        <Diya />
        <figcaption className="gt-deva">शुभ दीपावली<small>SHUBH DIWALI</small></figcaption>
      </figure>
      <figure className="gt-side gt-side-right" aria-hidden="true">
        <Rangoli />
        <Diya />
        <figcaption className="gt-deva">फराळ<small>DIWALI FARAL</small></figcaption>
      </figure>

      <div className="gt-content-inner" style={{ position: 'relative', zIndex: 1 }}>
        <p className="gt-greet gt-deva">॥ दिवाळीच्या हार्दिक शुभेच्छा ॥</p>
        <div className="gt-promo-badge" style={{ display: 'inline-block', background: 'linear-gradient(to right, #751B15, #D9822B)', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
          CELEBRATION SPECIAL: AUTOMATIC {ACTIVE_GIFT_DISCOUNT.percent}% OFF 3 &amp; 6 PACK GIFT BOXES AT CHECKOUT
        </div>
        <h2 id="gift-teaser-title" className="gt-royal-heading">
          <span className="gt-royal-top">Create a Perfect</span>
          <em className="gt-royal-main">Maharashtrian Gift Box</em>
        </h2>
        <p className="gt-desc" style={{ fontSize: '18px', maxWidth: '650px', margin: '0 auto 40px auto', color: 'rgba(26, 24, 21, 0.85)', lineHeight: '1.6' }}>
          Curate a 3-pack Trio or 6-pack Grand gift box (₹{UNIT_PRICE} per 100g pouch + ₹{GIFT_PACKAGING_PRICE} gift box &amp; card) and enjoy an automatic {ACTIVE_GIFT_DISCOUNT.percent}% bundle discount applied across the entire box at Shopify checkout.
        </p>
        <Link to="/builder" className="gt-build-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '18px 36px', backgroundColor: '#1A1815', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', borderRadius: '4px', transition: 'transform 0.2s', boxShadow: '0 4px 0 rgba(0,0,0,0.2)' }}>
          BUILD A BOX <ArrowUpRight size={16} />
        </Link>
        <p className="gt-faral">DIWALI FARAL · 3 OR 6 PACK CURATIONS</p>
      </div>
    </section>
  );
}

function RealCommunitySection() {
  const [activeReel, setActiveReel] = useState(null);

  const posts = [
    {
      id: 'Dc5tgRvPge-',
      img: '/reels/reel-1.jpg',
      title: 'The Sacred Chai Ritual',
      caption: 'Evening cutting chai and crisp Chakli spirals. The classic Maharashtrian tea-time ritual.',
      tag: 'KOLHAPUR CHAI',
      url: 'https://www.instagram.com/p/Dc5tgRvPge-/',
      duration: '0:32'
    },
    {
      id: 'DdEbKJqvbmZ',
      img: '/reels/reel-2.jpg',
      title: 'Spiced Spirals Fresh From Kettle',
      caption: 'Spicy Bhakarwadi pinwheels packed fresh for festive snacking with tangy amchur, sesame & whole spices.',
      tag: 'FRESH BATCH',
      url: 'https://www.instagram.com/p/DdEbKJqvbmZ/',
      duration: '0:24'
    },
    {
      id: 'DdRp04iPbUg',
      img: '/reels/reel-3.jpg',
      title: 'Crisp Sweet Shankarpada Diamonds',
      caption: 'Golden diamond-cut Shankarpada bites shared with family during Diwali and festive mornings.',
      tag: 'FESTIVE DELIGHT',
      url: 'https://www.instagram.com/p/DdRp04iPbUg/',
      duration: '0:18'
    }
  ];

  return (
    <section className="community-section" aria-label="Social community and snack reels">
      <div className="community-header">
        <div className="community-header-left">
          <div className="community-kicker-row">
            <span className="community-diya-mini"><Diya /></span>
            <span className="gt-deva community-deva-pill">॥ चव महाराष्ट्राची · सोशल गप्पा ॥</span>
            <p className="kicker" style={{ margin: 0 }}>05 / FROM OUR KITCHEN TO YOUR TABLE</p>
          </div>
          <h2 className="community-royal-heading">
            <span className="community-heading-top">The Snack Table</span>
            <em className="community-heading-em">In The Wild.</em>
          </h2>
          <p className="community-subline">
            Real tea-time crunch, late-night bingeing, and festive gatherings captured by ZAKAAS snackers across India.
          </p>
        </div>

        <a
          href="https://www.instagram.com/zakaas.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="community-insta-btn"
        >
          <span>FOLLOW @ZAKAAS.IN</span>
          <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="community-grid">
        {posts.map((post, idx) => (
          <article
            key={idx}
            className="community-card"
            onClick={() => setActiveReel(post)}
          >
            <div className="community-card-media">
              <img src={post.img} alt={post.caption} loading="lazy" />
              <div className="community-card-tint" />
              <div className="community-play-trigger" aria-label={`Play reel: ${post.title}`}>
                <span className="play-triangle">▶</span>
              </div>
              <div className="community-card-top-bar">
                <span className="community-badge-tag">{post.tag}</span>
                <span className="community-duration">{post.duration}</span>
              </div>
            </div>

            <div className="community-card-info">
              <h3 className="community-post-title">{post.title}</h3>
              <p className="community-post-desc">{post.caption}</p>
              <div className="community-card-foot">
                <span className="community-handle">@zakaas.in</span>
                <span className="community-watch-link">WATCH REEL <ArrowUpRight size={12} /></span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reel Video Modal */}
      {activeReel && (
        <div
          className="community-modal-backdrop"
          onClick={() => setActiveReel(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="community-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="community-modal-header">
              <div className="community-modal-meta">
                <span className="gt-deva" style={{ color: '#F4B63C' }}>॥ झकास रील्स ॥</span>
                <b>{activeReel.title}</b>
              </div>
              <button
                type="button"
                className="community-modal-close"
                onClick={() => setActiveReel(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="community-modal-body">
              <img src={activeReel.img} alt={activeReel.title} className="community-modal-cover" />
              <div className="community-modal-caption-box">
                <span className="community-tag" style={{ color: '#D9A94B' }}>{activeReel.tag}</span>
                <p>{activeReel.caption}</p>
                <a
                  href={activeReel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-button"
                  style={{ display: 'inline-flex', marginTop: '16px' }}
                >
                  OPEN ON INSTAGRAM <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* Premium Corporate Strip */
function B2bStrip() {
  return (
    <section className="b2b-strip-premium" style={{ backgroundColor: '#7A1C16', padding: '100px 24px', position: 'relative', overflow: 'hidden', borderTop: '2px solid #1A1815' }}>
      {/* Decorative background rangoli/circles */}
      <div style={{ position: 'absolute', bottom: '-150px', left: '-100px', width: '400px', height: '400px', border: '1px dashed rgba(246, 239, 226, 0.25)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-50px', width: '300px', height: '300px', border: '1px solid rgba(246, 239, 226, 0.15)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', bottom: '-150px', right: '-100px', width: '400px', height: '400px', border: '1px dashed rgba(246, 239, 226, 0.25)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-50px', width: '300px', height: '300px', border: '1px solid rgba(246, 239, 226, 0.15)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="b2b-strip-card">
        <div className="b2b-strip-left">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.15em', opacity: 0.9, fontWeight: '700' }}>05 / CORPORATE &amp; CELEBRATIONS</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', margin: '20px 0', lineHeight: '1.05', textTransform: 'uppercase', color: '#F6EFE2', fontWeight: '800' }}>
            ZAKAAS FOR<br/><em style={{fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'normal'}}>BUSINESS.</em>
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', opacity: 0.85 }}>
            Weddings, festive hampers, corporate gifting, and retail orders. Give a gift that people genuinely devour.
          </p>
          <Link to="/b2b" className="b2b-enquire-btn">
            ENQUIRE FOR BULK ORDERS <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="b2b-strip-right">
          <span className="b2b-word-1">WEDDINGS</span>
          <span className="b2b-word-2">CORPORATE</span>
          <span className="b2b-word-3">FESTIVALS</span>
          <span className="b2b-word-4">RETAIL</span>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ onAdd, catalog = [], products = [], live = false, cartData }) {
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
      <ProductSection onAdd={onAdd} products={displayProducts} live={live} cartData={cartData} />
      <ZakaasStandard />
      <GiftTeaser />
      <StoryFilm />
      <ReviewsSection />
      <RealCommunitySection />
      <B2bStrip />
      <Footer />
    </div>
  );
}
