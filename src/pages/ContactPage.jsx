import { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { Footer } from '../components/Footer';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-contact">
      <div className="contact-hero">
        <p className="kicker">01 / GET IN TOUCH</p>
        <h1>
          <span>WE’RE ALL</span>
          <em>EARS.</em>
        </h1>
        <p className="contact-intro">
          Questions about your order, feedback on our recipes, or just want to tell us your favorite snack tin memory? We’d love to hear from you.
        </p>
      </div>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success-box">
              <CheckCircle className="success-icon" />
              <h2>MESSAGE RECEIVED!</h2>
              <p>
                Dhanyawad, {formData.name || 'Friend'}! Our ZAKAAS team has received your note and will get back to you within 24 hours.
              </p>
              <button
                type="button"
                className="hero-button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', orderNumber: '', subject: 'General Enquiry', message: '' });
                }}
              >
                SEND ANOTHER MESSAGE <ArrowUpRight />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="zakaas-form">
              <h3>SEND US A MESSAGE</h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="contact-name">YOUR FULL NAME *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Deshmukh"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">EMAIL ADDRESS *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="contact-phone">PHONE / WHATSAPP *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-order">ORDER NUMBER (OPTIONAL)</label>
                  <input
                    id="contact-order"
                    type="text"
                    name="orderNumber"
                    placeholder="e.g. #ZK-1049"
                    value={formData.orderNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">SUBJECT / CATEGORY</label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Order Tracking">Order Status / Tracking</option>
                  <option value="Product Feedback">Product Feedback</option>
                  <option value="Media / PR">Media & Press</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">YOUR MESSAGE *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="hero-button form-submit-btn">
                SUBMIT MESSAGE <ArrowUpRight />
              </button>
            </form>
          )}
        </div>

        {/* Info Cards */}
        <div className="contact-info-column">
          <div className="info-card">
            <Mail className="info-icon" />
            <div>
              <h4>EMAIL US</h4>
              <p>For general queries & order updates:</p>
              <a href="mailto:hello@zakaas.in" className="info-link">hello@zakaas.in</a>
            </div>
          </div>

          <div className="info-card">
            <Phone className="info-icon" />
            <div>
              <h4>WHATSAPP / PHONE</h4>
              <p>Monday to Saturday, 10 AM – 7 PM IST:</p>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="info-link">
                +91 98765 43210
              </a>
            </div>
          </div>

          <div className="info-card">
            <MapPin className="info-icon" />
            <div>
              <h4>OUR KITCHEN HQ</h4>
              <p>
                ZAKAAS Foods Private Limited<br />
                Plot 42, Food Park, Phase 1,<br />
                FC Road, Pune, Maharashtra - 411004
              </p>
            </div>
          </div>

          <div className="contact-quote-card">
            <p>“Sapadla swad, sapadliipriti.”</p>
            <small>— MAHARASHTRA KITCHEN MOTTO</small>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
