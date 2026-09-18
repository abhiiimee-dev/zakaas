import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="page-about">
      {/* Editorial Hero */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/zakaas-story-kitchen.png" alt="ZAKAAS Maharashtrian kitchen tradition" />
          <div className="about-hero-wash" />
        </div>
        <div className="about-hero-content">
          <p className="kicker">01 / OUR STORY & PURPOSE</p>
          <h1>
            <span>ROOTED IN</span>
            <em>MAHARASHTRA.</em>
          </h1>
          <p className="about-hero-lede">
            In every Maharashtrian home, there is a round steel tin hidden in the kitchen cabinet. It holds memories of monsoon tea time, festive chatter, and taste that never compromises.
          </p>
        </div>
      </section>

      {/* Chapter 1 */}
      <section className="about-chapter">
        <div className="chapter-grid">
          <div className="chapter-copy">
            <p className="kicker">02 / WHY WE EXIST</p>
            <h2>THE TASTE OF<br /><em>HOME, EVERYWHERE.</em></h2>
            <p>
              ZAKAAS was born out of a quiet frustration: Maharashtrian snacks were either reduced to generic, machine-mashed store treats or diluted into bland corporate packs.
            </p>
            <p>
              We set out to protect the bold, fiery, warm flavor signatures of Maharashtra — the exact poppy-seed spice mix of Pune’s Bhakarwadi, the aromatic cumin-ajwain crunch of classic Chakli, and the golden, ghee-rich flake of traditional Shankarpali.
            </p>
          </div>
          <div className="chapter-image">
            <img src="/zakaas-home-kitchen.png" alt="Maharashtrian women rolling traditional snacks" />
            <div className="image-caption">HAND-ROLLED SPIRALS & TRADITIONAL MASALAS IN OUR KITCHEN</div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Five Cities */}
      <section className="about-map-story">
        <div className="map-story-content">
          <p className="kicker">03 / GEOGRAPHY OF FLAVOUR</p>
          <h2>FIVE CITIES.<br /><em>ONE HUNGER.</em></h2>
          <div className="city-pillars">
            <div className="city-pillar">
              <b>MUMBAI</b>
              <p>The speed, the sea air, and the loud cutting-chai breaks that demand crisp, spicy comfort.</p>
            </div>
            <div className="city-pillar">
              <b>PUNE</b>
              <p>The epicentre of Bhakarwadi precision. Sweet, spicy, and fiercely proud of its culinary heritage.</p>
            </div>
            <div className="city-pillar">
              <b>KOLHAPUR</b>
              <p>Uncompromising heat, rich groundnut oil aroma, and bold flavor that makes no apologies.</p>
            </div>
            <div className="city-pillar">
              <b>NASHIK & NAGPUR</b>
              <p>Festive hospitality, endless tea tins, and recipes passed down through generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Craft */}
      <section className="about-craft">
        <div className="craft-container">
          <p className="kicker">04 / THE ZAKAAS CRAFT</p>
          <h2>NO SHORTCUTS.<br /><em>JUST CRAFT.</em></h2>
          <div className="craft-grid">
            <article>
              <span>01 / INGREDIENTS</span>
              <h3>PURE GROUNDNUT OIL & REAL SPICES</h3>
              <p>We use cold-pressed groundnut oil, freshly roasted poppy seeds, sesame, and ajwain. Never palm oil, never synthetic powders.</p>
            </article>

            <article>
              <span>02 / TECHNIQUE</span>
              <h3>HAND-ROLLED & DOUGH-LOVED</h3>
              <p>Each Bhakarwadi is rolled by hand to build tight, spice-filled spiral layers that hold together through frying.</p>
            </article>

            <article>
              <span>03 / FRESHNESS</span>
              <h3>MOISTURE-PROOF SEALING</h3>
              <p>Packed immediately upon cooling in metallic foil pouches so you experience the crunch as if fried an hour ago.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <p className="kicker">READY TO SNACK?</p>
          <h2>BRING HOME A LITTLE<br /><em>MAHARASHTRA.</em></h2>
          <div className="cta-btn-group">
            <Link to="/collections" className="hero-button">
              SHOP STOREFRONT <ArrowUpRight />
            </Link>
            <Link to="/b2b" className="light-button">
              BULK & B2B ENQUIRIES <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
