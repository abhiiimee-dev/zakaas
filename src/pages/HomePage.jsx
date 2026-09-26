import { ArrowUpRight, Check, Package, Sparkles, Utensils, HeartHandshake } from 'lucide-react';
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
      num: '01',
      title: 'AUTHENTIC TASTE',
      desc: 'Rooted in Maharashtrian flavours and familiar ingredients.'
    },
    {
      num: '02',
      title: 'QUALITY YOU CAN TRUST',
      desc: 'Carefully selected ingredients and consistent preparation.'
    },
    {
      num: '03',
      title: 'MADE FOR TODAY',
      desc: 'Packed to keep every bite crisp.'
    },
    {
      num: '04',
      title: 'MAHARASHTRA, EVERYWHERE',
      desc: 'Maharashtrian snacks, delivered beyond home.'
    }
  ];

  return (
    <section className="promise-section" id="promise">
      <div className="promise-container">
        <div className="promise-top-bar">
          <div>
            <p className="kicker">03 / THE ZAKAAS STANDARD</p>
            <h2>NO SHORTCUTS.<br /><em>NO SMALL FEELING.</em></h2>
          </div>
          <p className="promise-lead">
            Flavours rooted in Maharashtra, made with consistent care and packed for lasting crunch.
          </p>
        </div>

        <div className="promise-horizontal-track">
          {principles.map(p => (
            <div key={p.num} className="promise-col">
              <span className="promise-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualGiftingSection({ onBuildBox }) {
  const navigate = useNavigate();

  const packs = [
    {
      id: 'chakli',
      name: 'CHAKLI',
      weight: '100g',
      image: '/zakaas-chakli.jpg'
    },
    {
      id: 'bhakarwadi',
      name: 'BHAKARWADI',
      weight: '100g',
      image: '/zakaas-bhakarwadi.jpg'
    },
    {
      id: 'shankarpali',
      name: 'SHANKARPALI',
      weight: '100g',
      image: '/zakaas-shankarpali.jpg'
    }
  ];

  return (
    <section className="gifting-experience-section" id="gifting">
      <div className="gifting-wrapper">
        <div className="gifting-header">
          <p className="kicker">04 / CUSTOM SNACK BOX</p>
          <h2>SEND A LITTLE<br /><em>MAHARASHTRA.</em></h2>
          <p className="gifting-lead">Build a box with the snacks you want to send.</p>
        </div>

        {/* Product-Led Composition */}
        <div className="gifting-pack-composition">
          <div className="gifting-packs-stage">
            {packs.map((p, idx) => (
              <Link 
                to="/builder" 
                key={p.id} 
                className={`gifting-pack-figure pack-${idx + 1}`}
                aria-label={`Select ${p.name} in gift box builder`}
              >
                <div className="gifting-pack-img-wrap">
                  <img src={p.image} alt={`Zakaas ${p.name} 100g Pack`} />
                </div>
                <div className="gifting-pack-label">
                  <b>{p.name}</b>
                  <span>{p.weight}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="gifting-action-bar">
            <div className="gifting-config-pill">
              <span>3 PACKS / 5 PACKS</span>
            </div>
            <Link to="/builder" className="gifting-cta-button">
              BUILD A BOX <ArrowUpRight size={15} />
            </Link>
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
  return (
    <div className="page-home">
      <Hero />
      <BrandOneLiner />
      <ProductSection onAdd={onAdd} products={displayProducts} live={live} cartData={cartData} />
      <StoryFilm />
      <VisualPromise />
      <VisualGiftingSection onBuildBox={onBuildBox} />
      <ReviewsSection />
      <RealCommunitySection />
      <Footer />
    </div>
  );
}
