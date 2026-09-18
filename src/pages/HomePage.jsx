import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductSection } from '../components/ProductSection';
import { StoryFilm } from '../components/StoryFilm';
import { ReviewsSection } from '../components/ReviewsSection';
import { Footer } from '../components/Footer';

function Hero() {
  return (
    <section className="hero-film" id="top">
      <img src="/zakaas-hero.png" alt="ZAKAAS snack packs at a Maharashtra home" />
      <div className="hero-wash" />
      <div className="hero-content">
        <p className="kicker hero-kicker">EST. IN MAHARASHTRA · MADE FOR EVERYWHERE</p>
        <h1>
          <span>MAHARASHTRA.</span>
          <em>IN EVERY BITE.</em>
        </h1>
        <p className="hero-lede">
          Traditional flavours.<br />Reimagined for now.
        </p>
        <Link className="hero-button" to="/collections">
          SHOP ZAKAAS <ArrowUpRight />
        </Link>
      </div>
      <div className="hero-taste-mark" aria-hidden="true">
        <i>★</i>
        <span>CRUNCH · SPICE · HOME ·</span>
      </div>
      <div className="hero-meta">
        <span>SCROLL TO SNACK</span>
        <span>18.5204° N, 73.8567° E</span>
      </div>
    </section>
  );
}

function CategoryDiscovery() {
  const categories = [
    { name: 'CHAKLI', tag: 'THE CRUNCHY CLASSIC', img: '/zakaas-chakli.jpg', path: '/collections?category=chakli' },
    { name: 'BHAKARWADI', tag: 'THE SPICY SPIRAL', img: '/zakaas-bhakarwadi.jpg', path: '/collections?category=bhakarwadi' },
    { name: 'SHANKARPADA', tag: 'THE SWEET DELIGHT', img: '/zakaas-shankarpali.jpg', path: '/collections?category=shankarpada' },
  ];

  return (
    <section className="category-discovery">
      <div className="discovery-header">
        <p className="kicker">02 / DISCOVER BY FLAVOUR</p>
        <h2>THE MAHARASHTRIAN<br /><em>TRIO.</em></h2>
      </div>
      <div className="discovery-grid">
        {categories.map((cat, idx) => (
          <Link key={cat.name} to={cat.path} className="discovery-card">
            <img src={cat.img} alt={cat.name} />
            <div className="discovery-overlay">
              <span>0{idx + 1} / {cat.tag}</span>
              <h3>{cat.name}</h3>
              <p>EXPLORE RANGE <ArrowUpRight /></p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Map() {
  return (
    <section className="origin" id="maharashtra">
      <img
        className="origin-art"
        src="/zakaas-maharashtra-map.png"
        alt="Illustrated map of Maharashtra showing Mumbai, Pune, Nashik, Kolhapur and Nagpur"
      />
      <div className="origin-content">
        <p className="kicker">04 / FIVE CITIES, ONE HUNGER</p>
        <h2>WHERE THE<br /><em>FLAVOUR LIVES.</em></h2>
        <div className="origin-note">
          <span>FROM HERE,</span>
          <b>TO<br />EVERYWHERE.</b>
          <p>Made with the rhythm, spice, and full-volume warmth of home.</p>
          <Link to="/about" className="light-button inline-btn">
            OUR STORY <ArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Promise() {
  const data = [
    ['01', 'AUTHENTIC TASTE', 'Flavours rooted in Maharashtra home recipes.'],
    ['02', 'QUALITY YOU CAN TRUST', 'Ingredients we’d happily serve at home.'],
    ['03', 'MADE FOR TODAY', 'Traditional taste. Modern airtight packaging.'],
    ['04', 'MAHARASHTRA, EVERYWHERE', 'From Maharashtra kitchens to wherever you live.']
  ];
  return (
    <section className="manifesto">
      <div>
        <p className="kicker">05 / THE ZAKAAS STANDARD</p>
        <h2>NO SHORTCUTS.<br /><em>NO SMALL FEELING.</em></h2>
      </div>
      <div>
        {data.map(x => (
          <article key={x[0]}>
            <span>{x[0]}</span>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function GiftingSection({ onBuildBox }) {
  const navigate = useNavigate();

  return (
    <section className="gifting" id="gifting">
      <p className="kicker">07 / A BOX WITH A BACKSTORY</p>
      <h2>SEND A LITTLE<br /><em>MAHARASHTRA.</em></h2>
      <div>
        {['FOR FAMILY', 'FOR FRIENDS', 'FOR FESTIVALS'].map((x, i) => (
          <Link to="/collections?category=gifting" key={x}>
            <span>0{i + 1}</span>
            <b>{x}</b>
            <ArrowUpRight />
          </Link>
        ))}
        <button type="button" className="gift-link" onClick={onBuildBox}>
          <span>04</span>
          <b>BUILD A BOX</b>
          <ArrowUpRight />
        </button>
      </div>

      <div className="b2b-teaser">
        <div>
          <p className="kicker">08 / CORPORATE & EVENTS</p>
          <h2>ZAKAAS FOR<br /><em>BUSINESS.</em></h2>
          <p>Corporate gifting, weddings, events and retail. Make your next gesture one people actually remember.</p>
          <button onClick={() => navigate('/b2b')} className="hero-button">
            ENQUIRE FOR BULK ORDERS <ArrowUpRight />
          </button>
        </div>
        <ul>
          {['CORPORATE', 'WEDDINGS', 'EVENTS', 'RETAIL'].map(x => <li key={x}>{x}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function HomePage({ onAdd, catalog = [], live = false, onBuildBox }) {
  return (
    <div className="page-home">
      <Hero />
      <ProductSection onAdd={onAdd} products={catalog} live={live} />
      <CategoryDiscovery />
      <StoryFilm />
      <Map />
      <Promise />
      <ReviewsSection />
      <GiftingSection onBuildBox={onBuildBox} />

      <section className="final-frame">
        <p>JAGAHA BADLI.</p>
        <p className="final-second">SWAD NAHI.</p>
        <img src="/zakaas-logo.png" alt="ZAKAAS" />
        <small>MAHARASHTRA IN EVERY BITE</small>
        <div style={{ marginTop: '24px' }}>
          <Link to="/collections" className="light-button">
            EXPLORE ALL SNACKS <ArrowUpRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
