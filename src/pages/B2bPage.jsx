import { useState } from 'react';
import { ArrowUpRight, CheckCircle, Package, Sparkles, Building2, Gift, Store, Check } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Diya, Rangoli, Kandil } from '../components/DiwaliArt';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyb-kRbo7RM5qsjFFcg4xHw_XHgbET9ZUDv1kejC47Xc-kE6pF-LqXlzt7NtZCGmhYo/exec';

export function B2bPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [b2bData, setB2bData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    businessType: 'Corporate Gifting',
    productsInterested: ['Bhakarwadi', 'Chakli', 'Shankarpali', 'Royal Trio Box'],
    quantity: '100-250 Boxes',
    deliveryDate: '',
    customPackaging: 'Custom branded sleeve with company logo',
    message: ''
  });

  const handleChange = (e) => {
    setB2bData({ ...b2bData, [e.target.name]: e.target.value });
  };

  const handleProductCheckbox = (prod) => {
    const exists = b2bData.productsInterested.includes(prod);
    const updated = exists
      ? b2bData.productsInterested.filter((p) => p !== prod)
      : [...b2bData.productsInterested, prod];
    setB2bData({ ...b2bData, productsInterested: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: b2bData.name,
      company: b2bData.company,
      email: b2bData.email,
      phone: b2bData.phone,
      city: b2bData.city,
      businessType: b2bData.businessType,
      products: b2bData.productsInterested.join(', '),
      quantity: b2bData.quantity,
      deliveryDate: b2bData.deliveryDate || 'Flexible / To be confirmed',
      packaging: b2bData.customPackaging,
      message: b2bData.message || '—',
      recipientEmail: 'abhi.idgaf@gmail.com',
    };

    try {
      // Send to Google Apps Script (mode: 'no-cors' prevents browser CORS blocks from Google)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Google Script dispatch warning:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.dispatchEvent(new CustomEvent('zakaas:fireworks', { detail: { grand: true } }));
    }
  };

  return (
    <div className="page-b2b">
      {/* B2B Hero */}
      <section className="b2b-hero">
        <div className="b2b-hero-overlay" />
        <div className="b2b-hero-kandil b2b-kandil-left" aria-hidden="true">
          <Kandil variant="gold" />
        </div>
        <div className="b2b-hero-kandil b2b-kandil-right" aria-hidden="true">
          <Kandil variant="crimson" />
        </div>

        <div className="b2b-hero-content">
          <div className="b2b-hero-kicker-row">
            <span className="gt-deva b2b-deva-pill">॥ शुभ दीपावली · कॉर्पोरेट भेट ॥</span>
            <p className="kicker" style={{ margin: 0 }}>01 / BUSINESS & BULK ENQUIRIES</p>
          </div>
          <h1 className="b2b-royal-title">
            <span className="b2b-title-top">ZAKAAS FOR</span>
            <em className="b2b-title-em">Business & Celebrations</em>
          </h1>
          <p className="b2b-hero-lede">
            Diwali corporate hampers, royal wedding welcome boxes, luxury hospitality, and retail distribution. Share the unmistakable crunch of Maharashtra in brass-detailed keepsake boxes.
          </p>
          <div className="b2b-hero-actions">
            <a href="#quote-form" className="hero-button">
              REQUEST A CUSTOM PROPOSAL <ArrowUpRight size={15} />
            </a>
            <span className="b2b-hero-note">✦ PAN-INDIA DISPATCH · CUSTOM LOGO SLEEVES</span>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="b2b-solutions">
        <div className="gt-toran" aria-hidden="true" />
        <div className="b2b-section-head">
          <p className="kicker">02 / BESPOKE GIFTING & TRADE</p>
          <h2 className="b2b-sec-heading">
            <span>Crafted to Make a</span>
            <em>Lasting Impression</em>
          </h2>
        </div>

        <div className="b2b-grid-4">
          <article className="b2b-card">
            <div className="b2b-card-top">
              <span className="b2b-card-num">01</span>
              <Gift className="b2b-card-icon" />
            </div>
            <h3>Corporate Gifting</h3>
            <p>Diwali Faral hampers, employee onboarding kits, client appreciation boxes, and leadership milestones with custom gold-foiled sleeves.</p>
          </article>

          <article className="b2b-card">
            <div className="b2b-card-top">
              <span className="b2b-card-num">02</span>
              <Sparkles className="b2b-card-icon" />
            </div>
            <h3>Weddings & Events</h3>
            <p>Room welcome hampers for out-of-town guests, sangeet snack pouches, and festive return gifts tailored to your family crest.</p>
          </article>

          <article className="b2b-card">
            <div className="b2b-card-top">
              <span className="b2b-card-num">03</span>
              <Store className="b2b-card-icon" />
            </div>
            <h3>Retailers & Cafés</h3>
            <p>Counter display packs and 100g aroma-sealed pouches for gourmet stores, artisanal tea rooms, airport lounges, and boutique cafés.</p>
          </article>

          <article className="b2b-card">
            <div className="b2b-card-top">
              <span className="b2b-card-num">04</span>
              <Building2 className="b2b-card-icon" />
            </div>
            <h3>Trade & Export</h3>
            <p>Pan-India HORECA supply and international distribution for regional food networks, modern trade, and global diaspora shelves.</p>
          </article>
        </div>
      </section>

      {/* B2B Enquiry Form Section */}
      <section className="b2b-form-section" id="quote-form">
        <div className="b2b-form-bg-dots" aria-hidden="true" />

        <div className="b2b-form-container">
          <div className="b2b-form-intro">
            <div className="b2b-intro-crest">
              <span className="b2b-crest-diya"><Diya /></span>
              <span className="gt-deva">॥ खास आमंत्रण ॥</span>
            </div>
            <p className="kicker">03 / REQUEST A PROPOSAL</p>
            <h2 className="b2b-quote-heading">
              <span>Get a Custom Quote</span>
              <em>Within 24 Hours.</em>
            </h2>
            <p className="b2b-intro-desc">
              Tell us about your festive or corporate requirement, target quantities, and delivery timeline. Our Pune desk will prepare a tailored pricing sheet and tasting sample kit for your team.
            </p>

            <div className="b2b-perks-list">
              <div className="b2b-perk-item">
                <span className="b2b-perk-icon"><Package size={18} /></span>
                <div>
                  <strong>Bespoke Logo Sleeves & Diwali Cards</strong>
                  <small>Your company emblem gold-foiled on Paithani or Warli boxes</small>
                </div>
              </div>
              <div className="b2b-perk-item">
                <span className="b2b-perk-icon"><CheckCircle size={18} /></span>
                <div>
                  <strong>Tiered Bulk Pricing & Multi-Address Dispatch</strong>
                  <small>Direct doorstep delivery to clients or employees across India</small>
                </div>
              </div>
              <div className="b2b-perk-item">
                <span className="b2b-perk-icon"><Sparkles size={18} /></span>
                <div>
                  <strong>Complimentary Tasting Box</strong>
                  <small>Dispatched for qualified corporate & wedding enquiries (100+ boxes)</small>
                </div>
              </div>
            </div>

            <div className="b2b-intro-rangoli-card" aria-hidden="true">
              <div className="b2b-mini-rangoli"><Rangoli /></div>
              <div>
                <span className="gt-deva">झकास कॉर्पोरेट डेस्क · पुणे</span>
                <p>FRESH SMALL-BATCH FRYING · ZERO PRESERVATIVES · 90-DAY CRUNCH</p>
              </div>
            </div>
          </div>

          <div className="b2b-form-card">
            <div className="b2b-form-paithani-top" aria-hidden="true" />

            {submitted ? (
              <div className="b2b-success-box">
                <div className="b2b-success-diya"><Diya /></div>
                <span className="gt-deva b2b-success-deva">॥ धन्यवाद · शुभ दीपावली ॥</span>
                <h2>Proposal Request Received</h2>
                <p>
                  Dhanyawad! Our corporate partnerships lead is reviewing your requirement for <b>{b2bData.company || 'your organisation'}</b> and will send a tailored quote & tasting kit details to <b>{b2bData.email}</b> within 24 hours.
                </p>
                <button
                  type="button"
                  className="hero-button"
                  onClick={() => setSubmitted(false)}
                >
                  SUBMIT ANOTHER ENQUIRY <ArrowUpRight size={15} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="zakaas-form b2b-form">
                <div className="b2b-form-header">
                  <div className="b2b-form-header-top">
                    <span className="b2b-form-stamp">★ ZAKAAS TRADE & GIFTING LEDGER</span>
                    <span className="gt-deva b2b-form-deva">शुभ लाभ</span>
                  </div>
                  <h3 className="b2b-form-title">
                    <span>Corporate & Bulk</span>{' '}
                    <em>Enquiry</em>
                  </h3>
                  <p className="b2b-form-subtitle">
                    Fill in your details below — we respond to every business enquiry within one working day.
                  </p>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="b2b-name">01 / YOUR FULL NAME *</label>
                    <input
                      id="b2b-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Vikramaditya Salunkhe"
                      value={b2bData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="b2b-company">02 / COMPANY OR ORGANISATION *</label>
                    <input
                      id="b2b-company"
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. Tata Consultancy / Kulkarni Wedding"
                      value={b2bData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="b2b-email">03 / WORK EMAIL *</label>
                    <input
                      id="b2b-email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. vikram@company.com"
                      value={b2bData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="b2b-phone">04 / PHONE OR WHATSAPP *</label>
                    <input
                      id="b2b-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={b2bData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="b2b-city">05 / DELIVERY CITY & STATE *</label>
                    <input
                      id="b2b-city"
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Mumbai / Pune, Maharashtra"
                      value={b2bData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="b2b-type">06 / OCCASION OR BUSINESS TYPE *</label>
                    <div className="b2b-select-wrap">
                      <select
                        id="b2b-type"
                        name="businessType"
                        value={b2bData.businessType}
                        onChange={handleChange}
                      >
                        <option value="Corporate Gifting">Corporate Diwali & Festive Gifting</option>
                        <option value="Weddings & Celebrations">Weddings & Family Celebrations</option>
                        <option value="Retail & Gourmet Stores">Retail & Gourmet Stores</option>
                        <option value="Café & Hospitality">Café, Hotel & Hospitality</option>
                        <option value="Distribution Opportunities">Distribution & Export</option>
                        <option value="Other Bulk Orders">Other Bulk Orders</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Checkboxes for products */}
                <div className="form-group">
                  <label>07 / CURATIONS & SNACKS INTERESTED IN</label>
                  <div className="checkbox-pills-row">
                    {['Bhakarwadi', 'Chakli', 'Shankarpali', 'Royal Trio Box', 'Custom Gift Box'].map((prod) => {
                      const active = b2bData.productsInterested.includes(prod);
                      return (
                        <button
                          type="button"
                          key={prod}
                          className={`checkbox-pill ${active ? 'is-active' : ''}`}
                          onClick={() => handleProductCheckbox(prod)}
                        >
                          {active && <Check size={12} />}
                          <span>{prod}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="b2b-qty">08 / APPROXIMATE QUANTITY *</label>
                    <div className="b2b-select-wrap">
                      <select
                        id="b2b-qty"
                        name="quantity"
                        value={b2bData.quantity}
                        onChange={handleChange}
                      >
                        <option value="50-100 Packs">50 – 100 Packs</option>
                        <option value="100-250 Boxes">100 – 250 Gift Boxes</option>
                        <option value="250-500 Boxes">250 – 500 Gift Boxes</option>
                        <option value="500+ Boxes">500+ Boxes (Bespoke Tier)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="b2b-date">09 / TARGET DISPATCH DATE</label>
                    <input
                      id="b2b-date"
                      type="date"
                      name="deliveryDate"
                      value={b2bData.deliveryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="b2b-packaging">10 / CUSTOM BRANDING & PACKAGING</label>
                  <div className="b2b-select-wrap">
                    <select
                      id="b2b-packaging"
                      name="customPackaging"
                      value={b2bData.customPackaging}
                      onChange={handleChange}
                    >
                      <option value="Custom branded sleeve with company logo">Custom branded sleeve with company logo & Diwali card</option>
                      <option value="Standard ZAKAAS Boxes">Standard ZAKAAS Festive Gift Boxes</option>
                      <option value="Personalized message gift card inside">Personalized message gift card tucked inside</option>
                      <option value="Full custom gift box development">Full bespoke rigid box & hamper curation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="b2b-message">11 / SPECIAL NOTES OR BUDGET</label>
                  <textarea
                    id="b2b-message"
                    name="message"
                    rows="3"
                    placeholder="Share your per-box budget, branding guidelines, or multi-city delivery needs…"
                    value={b2bData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="b2b-submit-cta" disabled={loading}>
                  {loading ? (
                    <span>DISPATCHING ENQUIRY…</span>
                  ) : (
                    <>
                      <span>REQUEST CUSTOM PROPOSAL & TASTING KIT</span>
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
            <div className="b2b-form-paithani-bottom" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

