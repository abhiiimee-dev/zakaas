import { ArrowUpRight, PackageCheck, Sparkles, Utensils, ShieldCheck, Check, Plus, ShoppingBag } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoryFilm } from '../components/StoryFilm';
import { ReviewsSection } from '../components/ReviewsSection';
import { Footer } from '../components/Footer';
import { products as fallbackProducts } from '../data/products';

function Hero() {
  return (
    <section className="hero-film" id="top">
      <img src="/zakaas-hero.png" alt="ZAKAAS snack packs at a Maharashtrian home" />
      <div className="hero-wash" />
      <div className="hero-content">
        <p className="kicker hero-kicker">EST. IN MAHARASHTRA · MADE FOR EVERYWHERE</p>
        <h1>
          <span>MAHARASHTRA.</span>
          <em>IN EVERY BITE.</em>
        </h1>
        <p className="hero-lede">
          Traditional snacks crafted with slow-roasted grains and authentic spices.<br />
          Tear it open. Pass it around.
        </p>
        <Link className="hero-button" to="/collections">
          EXPLORE ALL SNACKS <ArrowUpRight />
        </Link>
      </div>
      
      <div className="hero-snack-ticker" aria-hidden="true">
        <div className="ticker-item">
          <img src="/zakaas-chakli.jpg" alt="Chakli" />
          <span>CHAKLI</span>
        </div>
        <div className="ticker-dot">•</div>
        <div className="ticker-item">
          <img src="/zakaas-bhakarwadi.jpg" alt="Bhakarwadi" />
          <span>BHAKARWADI</span>
        </div>
        <div className="ticker-dot">•</div>
        <div className="ticker-item">
          <img src="/zakaas-shankarpali.jpg" alt="Shankarpali" />
          <span>SHANKARPALI</span>
        </div>
        <div className="ticker-dot">•</div>
        <div className="ticker-item">
          <img src="/zakaas-home-kitchen.png" alt="Home Recipe" />
          <span>100% HANDCRAFTED</span>
        </div>
      </div>

      <div className="hero-meta">
        <span>SCROLL TO DISCOVER</span>
        <span>TRADITIONAL RECIPES · AIRTIGHT PACKAGING</span>
      </div>
    </section>
  );
}

function VisualProductDiscovery({ onAdd, catalog = [] }) {
  const navigate = useNavigate();
  const items = catalog.length >= 3 ? catalog.slice(0, 3) : fallbackProducts.slice(0, 3);
  const featured = items[0] || fallbackProducts[0];
  const secondaries = items.slice(1, 3);
  const [addedId, setAddedId] = useState(null);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAdd && product) {
      onAdd(product);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1500);
    }
  };

  return (
    <section className="visual-product-discovery" id="shop">
      <div className="discovery-intro">
        <div>
          <p className="kicker">01 / OUR CLASSIC SNACKS</p>
          <h2>MADE FOR THE<br /><em>SNACK TABLE.</em></h2>
        </div>
        <div className="discovery-intro-copy">
          <p>Crispy spirals, spicy rolls, and sweet flaky diamonds. Made in small batches using traditional Maharashtrian recipes.</p>
          <Link to="/collections" className="light-button inline-btn">
            EXPLORE ALL SNACKS <ArrowUpRight />
          </Link>
        </div>
      </div>

      <div className="discovery-art-grid">
        {/* Large Featured Product Spotlight */}
        {featured && (
          <article className="featured-product-hero">
            <div className="featured-image-stage">
              <img src={featured.image || '/zakaas-chakli.jpg'} alt={featured.name} />
              <div className="featured-badge-tag">MOST POPULAR</div>
              <div className="featured-price-tag">₹{featured.price || '150'}</div>
            </div>

            <div className="featured-content">
              <div className="featured-kicker">01 / FEATURED CLASSIC</div>
              <h3>{featured.name}</h3>
              <p className="featured-tagline">“{featured.line || featured.shortDescription}”</p>
              
              <div className="ingredient-highlights">
                <span className="ing-tag"><Utensils size={12} /> Bhajan Flour</span>
                <span className="ing-tag"><Sparkles size={12} /> Ajwain & Cumin</span>
                <span className="ing-tag"><PackageCheck size={12} /> 100g Airtight Pouch</span>
              </div>

              <div className="featured-actions">
                <button 
                  className={`hero-add-btn ${addedId === featured.id ? 'is-added' : ''}`}
                  onClick={(e) => handleQuickAdd(featured, e)}
                >
                  {addedId === featured.id ? <>ADDED TO BAG <Check size={16}/></> : <>ADD TO BAG — ₹{featured.price || '150'} <Plus size={16}/></>}
                </button>
                <Link to={`/product/${featured.handle || featured.id}`} className="featured-details-link">
                  VIEW DETAILS <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Secondary Products Column */}
        <div className="secondary-products-column">
          {secondaries.map((prod, idx) => (
            <Link key={prod.id || idx} to={`/product/${prod.handle || prod.id}`} className="secondary-product-card">
              <div className="secondary-img-wrap">
                <img src={prod.image} alt={prod.name} />
                <span className="secondary-price">₹{prod.price}</span>
              </div>
              <div className="secondary-info">
                <span className="secondary-num">0{idx + 2} / {prod.personality || 'CLASSIC'}</span>
                <h4>{prod.name}</h4>
                <p>{prod.shortDescription || 'Traditional Maharashtrian flavour.'}</p>
                <div className="secondary-card-footer">
                  <button 
                    type="button" 
                    className={`quick-add-chip ${addedId === prod.id ? 'added' : ''}`}
                    onClick={(e) => handleQuickAdd(prod, e)}
                  >
                    {addedId === prod.id ? <><Check size={12}/> ADDED</> : <><Plus size={12}/> QUICK ADD</>}
                  </button>
                  <span className="view-arrow">VIEW <ArrowUpRight size={14} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualPromise() {
  const principles = [
    {
      num: '01',
      title: 'AUTHENTIC TASTE',
      desc: 'Flavours rooted in original Maharashtra home recipes — slow roasted grains, whole seeds, and aromatic spices.',
      image: '/zakaas-home-kitchen.png',
      caption: 'Slow-roasted multigrain flour dough'
    },
    {
      num: '02',
      title: 'QUALITY YOU CAN TRUST',
      desc: 'No artificial preservatives or cheap fillers. Pure ingredients we proudly serve to our own family.',
      image: '/zakaas-chakli.jpg',
      caption: '100% Vegetarian small-batch production'
    },
    {
      num: '03',
      title: 'MADE FOR TODAY',
      desc: 'Traditional brittle crunch sealed in modern multi-layer aroma pouches so every spiral stays fresh.',
      image: '/zakaas-bhakarwadi.jpg',
      caption: 'Airtight nitrogen pouch sealing'
    },
    {
      num: '04',
      title: 'MAHARASHTRA, EVERYWHERE',
      desc: 'From Maharashtra kitchens directly to your doorstep anywhere in India and across the world.',
      image: '/zakaas-shankarpali.jpg',
      caption: 'Delivered fresh to your home'
    }
  ];

  return (
    <section className="visual-promise" id="trust">
      <div className="promise-header">
        <p className="kicker">02 / THE ZAKAAS STANDARD</p>
        <h2>NO SHORTCUTS.<br /><em>NO SMALL FEELING.</em></h2>
        <p className="promise-subhead">Visual proof of quality. Real food, traditional craft, uncompromised standards.</p>
      </div>

      <div className="promise-grid">
        {principles.map(p => (
          <article key={p.num} className="promise-card">
            <div className="promise-card-media">
              <img src={p.image} alt={p.title} />
              <div className="promise-card-overlay">
                <span className="promise-num">{p.num}</span>
                <span className="promise-caption">{p.caption}</span>
              </div>
            </div>
            <div className="promise-card-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VisualGiftingSection({ onBuildBox }) {
  const navigate = useNavigate();

  return (
    <section className="gifting-visual-section" id="gifting">
      <div className="gifting-container">
        <div className="gifting-header">
          <p className="kicker">04 / CUSTOM SNACK BOXES</p>
          <h2>SEND A LITTLE<br /><em>MAHARASHTRA.</em></h2>
          <p className="gifting-tagline">
            Curate your own combination of freshly packed Maharashtrian snacks in a signature ZAKAAS gift box.
          </p>
        </div>

        {/* Visual Standalone Build-A-Box Ecommerce Experience */}
        <div className="build-a-box-card">
          <div className="box-visual-composition">
            <div className="box-mockup-frame">
              <img src="/zakaas-hero.png" alt="Zakaas Custom Box Packaging" className="box-bg-image" />
              <div className="box-products-overlap">
                <div className="mini-product-pill">
                  <img src="/zakaas-chakli.jpg" alt="Chakli" />
                  <span>CHAKLI</span>
                </div>
                <div className="mini-product-pill">
                  <img src="/zakaas-bhakarwadi.jpg" alt="Bhakarwadi" />
                  <span>BHAKARWADI</span>
                </div>
                <div className="mini-product-pill">
                  <img src="/zakaas-shankarpali.jpg" alt="Shankarpali" />
                  <span>SHANKARPALI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="box-details-content">
            <div className="box-kicker-badge">CUSTOM ASSORTMENT</div>
            <h3>BUILD YOUR OWN BOX</h3>
            <p>Pick 3 or 5 of your favourite snack packs. Perfect for family gifts, festive celebrations, or your personal pantry stock.</p>
            
            <ul className="box-feature-list">
              <li><Check size={14} /> Mix & match any Zakaas snacks</li>
              <li><Check size={14} /> Hand-packed in protective gift box</li>
              <li><Check size={14} /> Custom message note included</li>
            </ul>

            <Link to="/builder" className="build-box-main-btn">
              BUILD A BOX NOW <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* B2B Teaser Banner */}
        <div className="b2b-teaser-visual">
          <div className="b2b-info-side">
            <p className="kicker">05 / CORPORATE & EVENTS</p>
            <h2>ZAKAAS FOR<br /><em>BUSINESS.</em></h2>
            <p>Make your next corporate gesture or wedding gift one people actually enjoy. Customized packaging available.</p>
            <button onClick={() => navigate('/b2b')} className="light-button inline-btn">
              ENQUIRE FOR BULK ORDERS <ArrowUpRight />
            </button>
          </div>
          <div className="b2b-tags-side">
            <span>WEDDINGS</span>
            <span>CORPORATE</span>
            <span>EVENTS</span>
            <span>RETAIL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealCommunitySection() {
  const posts = [
    { img: '/reels/reel-1.jpg', caption: 'Fresh batch of Chakli packed for Diwali chai' },
    { img: '/reels/reel-2.jpg', caption: 'The signature spicy Bhakarwadi spiral' },
    { img: '/reels/reel-3.jpg', caption: 'Tea time is incomplete without ZAKAAS' },
  ];

  return (
    <section className="community-section">
      <div className="community-header">
        <p className="kicker">06 / REAL SNACKERS</p>
        <h2>FROM MAHARASHTRA KITCHENS<br /><em>TO YOUR SNACK TABLE.</em></h2>
      </div>
      <div className="community-grid">
        {posts.map((post, idx) => (
          <div key={idx} className="community-card">
            <img src={post.img} alt={post.caption} />
            <div className="community-overlay">
              <p>{post.caption}</p>
              <span>@zakaas.official</span>
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
      <VisualProductDiscovery onAdd={onAdd} catalog={catalog} />
      <StoryFilm />
      <VisualPromise />
      <ReviewsSection />
      <VisualGiftingSection onBuildBox={onBuildBox} />
      <RealCommunitySection />
      <Footer />
    </div>
  );
}
