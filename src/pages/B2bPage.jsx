import { useState } from 'react';
import { ArrowUpRight, CheckCircle, Package, Sparkles, Building2, Gift, Store } from 'lucide-react';
import { Footer } from '../components/Footer';

export function B2bPage() {
  const [submitted, setSubmitted] = useState(false);
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
    customPackaging: 'Yes, custom branded sleeve',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-b2b">
      {/* B2B Hero */}
      <section className="b2b-hero">
        <div className="b2b-hero-overlay" />
        <div className="b2b-hero-content">
          <p className="kicker">01 / BUSINESS & BULK ENQUIRIES</p>
          <h1>
            <span>ZAKAAS FOR</span>
            <em>BUSINESS.</em>
          </h1>
          <p className="b2b-hero-lede">
            Corporate gifting, weddings, grand celebrations, luxury hospitality, and retail distribution. Elevate your gestures with authentic Maharashtrian heritage.
          </p>
          <a href="#quote-form" className="hero-button">
            GET A CUSTOM QUOTE <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="b2b-solutions">
        <div className="b2b-section-head">
          <p className="kicker">02 / BUSINESS OPPORTUNITIES</p>
          <h2>MADE TO MAKE AN<br /><em>IMPRESSION.</em></h2>
        </div>

        <div className="b2b-grid-4">
          <article className="b2b-card">
            <Gift className="b2b-card-icon" />
            <h3>CORPORATE GIFTING</h3>
            <p>Diwali hampers, employee onboarding kits, client appreciation boxes, and milestone gifts in brass-detailed rigid packaging.</p>
          </article>

          <article className="b2b-card">
            <Sparkles className="b2b-card-icon" />
            <h3>WEDDINGS & EVENTS</h3>
            <p>Welcome hampers for out-of-town guests, sangeet snack pouches, and luxury return gifts tailored to your wedding theme.</p>
          </article>

          <article className="b2b-card">
            <Store className="b2b-card-icon" />
            <h3>RETAILERS & CAFES</h3>
            <p>Counter display packs and retail-ready pouches for premium gourmet stores, sweet shops, airport lounges, and cafes.</p>
          </article>

          <article className="b2b-card">
            <Building2 className="b2b-card-icon" />
            <h3>DISTRIBUTION</h3>
            <p>Pan-India and export distribution opportunities for regional food networks, boutique grocers, and overseas diaspora markets.</p>
          </article>
        </div>
      </section>

      {/* B2B Enquiry Form Section */}
      <section className="b2b-form-section" id="quote-form">
        <div className="b2b-form-container">
          <div className="b2b-form-intro">
            <p className="kicker">03 / REQUEST A PROPOSAL</p>
            <h2>GET A QUOTE.<br /><em>WITHIN 24 HOURS.</em></h2>
            <p>
              Tell us about your business requirement, target quantities, and desired delivery timelines. Our corporate team will prepare a customized quote and sample kit for you.
            </p>

            <div className="b2b-perks-list">
              <div>
                <Package />
                <span>Custom logo sleeve printing & personalized greeting cards</span>
              </div>
              <div>
                <CheckCircle />
                <span>Tiered bulk pricing & dedicated corporate logistics</span>
              </div>
              <div>
                <Sparkles />
                <span>Sample kits available upon qualified request</span>
              </div>
            </div>
          </div>

          <div className="b2b-form-card">
            {submitted ? (
              <div className="b2b-success-box">
                <CheckCircle className="b2b-success-icon" />
                <h2>ENQUIRY SUBMITTED!</h2>
                <p>
                  Dhanyawad! Our corporate partnerships lead will review your requirements for <b>{b2bData.company || 'your organisation'}</b> and send a detailed proposal to <b>{b2bData.email}</b> within 24 hours.
                </p>
                <button
                  type="button"
                  className="hero-button"
                  onClick={() => setSubmitted(false)}
                >
                  SUBMIT ANOTHER ENQUIRY <ArrowUpRight />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="zakaas-form b2b-form">
                <h3>B2B / BULK ENQUIRY FORM</h3>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="b2b-name">YOUR NAME *</label>
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
                    <label htmlFor="b2b-company">COMPANY / ORGANISATION *</label>
                    <input
                      id="b2b-company"
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. Tata Consultancy / Independent Café"
                      value={b2bData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="b2b-email">WORK EMAIL *</label>
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
                    <label htmlFor="b2b-phone">PHONE / WHATSAPP *</label>
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
                    <label htmlFor="b2b-city">CITY & STATE *</label>
                    <input
                      id="b2b-city"
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={b2bData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="b2b-type">BUSINESS TYPE *</label>
                    <select
                      id="b2b-type"
                      name="businessType"
                      value={b2bData.businessType}
                      onChange={handleChange}
                    >
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Weddings & Celebrations">Weddings & Celebrations</option>
                      <option value="Retail & Gourmet Stores">Retail & Gourmet Stores</option>
                      <option value="Café & Hospitality">Café & Hospitality</option>
                      <option value="Distribution Opportunities">Distribution Opportunities</option>
                      <option value="Other Bulk Orders">Other Bulk Orders</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes for products */}
                <div className="form-group">
                  <label>PRODUCTS INTERESTED IN</label>
                  <div className="checkbox-pills-row">
                    {['Bhakarwadi', 'Chakli', 'Shankarpali', 'Royal Trio Box', 'Custom Gift Box'].map((prod) => (
                      <button
                        type="button"
                        key={prod}
                        className={`checkbox-pill ${b2bData.productsInterested.includes(prod) ? 'is-active' : ''}`}
                        onClick={() => handleProductCheckbox(prod)}
                      >
                        {prod}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="b2b-qty">APPROXIMATE QUANTITY *</label>
                    <select
                      id="b2b-qty"
                      name="quantity"
                      value={b2bData.quantity}
                      onChange={handleChange}
                    >
                      <option value="50-100 Packs">50 - 100 Packs</option>
                      <option value="100-250 Boxes">100 - 250 Boxes</option>
                      <option value="250-500 Boxes">250 - 500 Boxes</option>
                      <option value="500+ Boxes">500+ Boxes (Custom Tier)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="b2b-date">REQUIRED DELIVERY DATE</label>
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
                  <label htmlFor="b2b-packaging">CUSTOM PACKAGING REQUIREMENT</label>
                  <select
                    id="b2b-packaging"
                    name="customPackaging"
                    value={b2bData.customPackaging}
                    onChange={handleChange}
                  >
                    <option value="Standard ZAKAAS Boxes">Standard ZAKAAS Boxes</option>
                    <option value="Custom branded sleeve with company logo">Custom branded sleeve with company logo</option>
                    <option value="Personalized message gift card inside">Personalized message gift card inside</option>
                    <option value="Full custom gift box development">Full custom gift box development</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="b2b-message">ADDITIONAL NOTES / SPECIFICATIONS</label>
                  <textarea
                    id="b2b-message"
                    name="message"
                    rows="3"
                    placeholder="Tell us about your event budget or special requests..."
                    value={b2bData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="hero-button form-submit-btn">
                  GET A QUOTE <ArrowUpRight />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
