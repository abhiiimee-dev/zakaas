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
          <span>CRUNCH THAT FEELS</span>
          <em>LIKE HOME.</em>
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
      desc: 'Flavours rooted in original Maharashtrian households — slow-roasted grains, whole cumin, and fragrant ajwain.',
      icon: Utensils
    },
    {
      num: '02',
      title: 'QUALITY YOU CAN TRUST',
      desc: 'No artificial preservatives, no cheap flour blends. Pure ingredients we proudly serve to our own family.',
      icon: Sparkles
    },
    {
      num: '03',
      title: 'MADE FOR TODAY',
      desc: 'Signature brittle crunch sealed inside multi-layer nitrogen pouches so every spiral stays crisp.',
      icon: Package
    },
    {
      num: '04',
      title: 'MAHARASHTRA, EVERYWHERE',
      desc: 'From Maharashtra kitchens directly to your doorstep across India and around the globe.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="promise-section" id="promise">
      <div className="promise-container">
        <div className="promise-content-col">
          <p className="kicker">03 / THE ZAKAAS STANDARD</p>
          <h2>NO SHORTCUTS.<br /><em>NO SMALL FEELING.</em></h2>
          <p className="promise-lead">
            We don’t cut corners on roasting, seed quality, or oil purity. What comes out of the kadai is the exact crunch we grew up loving.
          </p>

          <div className="promise-principles-list">
            {principles.map(p => {
              const IconComp = p.icon;
              return (
                <div key={p.num} className="promise-principle-item">
                  <span className="promise-num">{p.num}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="promise-visual-col">
          <div className="promise-visual-stage">
            <img 
              src="/zakaas-home-kitchen.png" 
              alt="Handcrafting traditional Maharashtrian savouries in a kitchen" 
              className="promise-main-photo"
            />
            <div className="promise-badge-pill">
              <span className="dot-live" />
              <span>SMALL-BATCH CRAFTED IN MAHARASHTRA</span>
            </div>
            <div className="promise-inset-snack">
              <img src="/zakaas-chakli.jpg" alt="Chakli brittle spiral crunch" />
              <small>THE SIGNATURE SPIRAL</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualGiftingSection({ onBuildBox }) {
  const navigate = useNavigate();

  return (
    <section className="gifting-experience-section" id="gifting">
      <div className="gifting-wrapper">
        <div className="gifting-header">
          <p className="kicker">05 / A BOX WITH A BACKSTORY</p>
          <h2>SEND A LITTLE<br /><em>MAHARASHTRA.</em></h2>
          <p className="gifting-lead">
            Curate your own combination of freshly packed Maharashtrian snacks in a signature ZAKAAS gift box. Hand-packed and delivered fresh anywhere.
          </p>
        </div>

        {/* Standalone Physical Box Visual Experience */}
        <div className="box-showcase-card">
          <div className="box-visual-side">
            <img 
              src="/zakaas-hero.png" 
              alt="Zakaas Custom Snack Box Presentation" 
              className="box-pack-photo"
            />
            <div className="box-snack-glimpses">
              <div className="glimpse-item">
                <img src="/zakaas-chakli.jpg" alt="Chakli" />
                <span>CHAKLI</span>
              </div>
              <div className="glimpse-item">
                <img src="/zakaas-bhakarwadi.jpg" alt="Bhakarwadi" />
                <span>BHAKARWADI</span>
              </div>
              <div className="glimpse-item">
                <img src="/zakaas-shankarpali.jpg" alt="Shankarpali" />
                <span>SHANKARPALI</span>
              </div>
            </div>
          </div>

          <div className="box-action-side">
            <div className="box-subkicker">CUSTOM SNACK CURATION</div>
            <h3>CREATE YOUR OWN ZAKAAS BOX</h3>
            <p>
              Choose 3 or 5 of your favourite packs. We assemble them by hand in our festive gift box with a custom personalized note.
            </p>

            <ul className="box-perks-list">
              <li><Check size={15} /> Select any combination of snacks</li>
              <li><Check size={15} /> Hand-packed in protective gift carton</li>
              <li><Check size={15} /> Personal gift message card included</li>
              <li><Check size={15} /> Express door delivery across India</li>
            </ul>

            <Link to="/builder" className="build-box-btn">
              BUILD A BOX <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* B2B Teaser Banner */}
        <div className="b2b-banner-box">
          <div className="b2b-banner-info">
            <p className="kicker">06 / CORPORATE & CELEBRATIONS</p>
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

export function HomePage({ onAdd, catalog = [], live = false, onBuildBox }) {
  return (
    <div className="page-home">
      <Hero />
      <ProductSection onAdd={onAdd} products={catalog} live={live} />
      <StoryFilm />
      <VisualPromise />
      <VisualGiftingSection onBuildBox={onBuildBox} />
      <ReviewsSection />
      <RealCommunitySection />
      <Footer />
    </div>
  );
}
