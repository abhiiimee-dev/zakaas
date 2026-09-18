import { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqCategories = [
    {
      title: "PRODUCTS & INGREDIENTS",
      items: [
        {
          q: "Are ZAKAAS snacks made with authentic Maharashtrian recipes?",
          a: "Yes! All ZAKAAS recipes are developed directly from traditional family kitchen methods in Pune, Kolhapur, and Mumbai, preserving authentic spice ratios and hand-crafting techniques."
        },
        {
          q: "What oil do you use for frying?",
          a: "We fry exclusively in high-grade groundnut (peanut) oil and pure ghee (for Shankarpali). We never use palm oil or re-heated commercial vegetable oil blends."
        },
        {
          q: "How long do ZAKAAS snacks remain fresh?",
          a: "Unopened ZAKAAS packs maintain guaranteed crispness and flavor for 60 to 90 days from the date of manufacture. Once opened, store in an airtight container."
        },
        {
          q: "Are your products 100% vegetarian?",
          a: "Yes, 100% pure vegetarian (Jain option details available upon bulk request for specific non-garlic/non-onion variants)."
        }
      ]
    },
    {
      title: "ORDERS & PAYMENTS",
      items: [
        {
          q: "How do I place an order on the ZAKAAS store?",
          a: "Simply browse our storefront, add your chosen snack packs or gift boxes to your bag, and click 'Continue to Checkout'. Checkout is securely processed via Shopify."
        },
        {
          q: "What payment methods are supported?",
          a: "Through Shopify Checkout, we support Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, and select wallets."
        },
        {
          q: "Can I modify or cancel my order after placing it?",
          a: "Orders are processed swiftly within 12 hours. If you need to make changes, contact us immediately at hello@zakaas.in or via WhatsApp with your order number."
        }
      ]
    },
    {
      title: "SHIPPING & DELIVERY",
      items: [
        {
          q: "Where does ZAKAAS deliver?",
          a: "We ship across India to all major pin codes! For international shipping or custom gift exports, please contact our B2B team."
        },
        {
          q: "How long does shipping take?",
          a: "Metro cities in India receive orders within 2 to 4 business days. Non-metro locations typically take 4 to 6 business days."
        },
        {
          q: "How are the delicate snacks protected during transport?",
          a: "Our snacks are packed in nitrogen-flushed, moisture-barrier pouches and enclosed inside rigid protective boxes to prevent crushing or crumbling during transit."
        }
      ]
    },
    {
      title: "RETURNS & EXCHANGES",
      items: [
        {
          q: "What is your return policy?",
          a: "Because our products are edible food items, we cannot accept returns once opened. However, if your order arrives damaged or incorrect, we will issue a replacement or refund immediately."
        },
        {
          q: "What should I do if my package arrives damaged?",
          a: "Please take a quick photo or video of the damaged box and email it to hello@zakaas.in within 48 hours of delivery. We will dispatch a fresh package right away."
        }
      ]
    },
    {
      title: "BULK ORDERS & CORPORATE GIFTING",
      items: [
        {
          q: "Do you offer corporate gifting and custom boxes?",
          a: "Yes! We specialize in custom brass-finish and khadi-textured gift boxes for weddings, Diwali, corporate appreciation, and events."
        },
        {
          q: "How do I get a bulk quote?",
          a: "Visit our dedicated B2B page at /b2b and fill out the enquiry form. Our team will get back to you with custom pricing and delivery timelines within 24 hours."
        }
      ]
    }
  ];

  let itemCounter = 0;

  return (
    <div className="page-faq">
      <div className="faq-hero">
        <p className="kicker">01 / QUESTIONS & ANSWERS</p>
        <h1>
          <span>FREQUENTLY</span>
          <em>ASKED QUESTIONS.</em>
        </h1>
        <p className="faq-intro">
          Everything you need to know about our snacks, ingredients, packaging, delivery, and gifting.
        </p>
      </div>

      <main className="faq-main-container">
        {faqCategories.map((cat, catIdx) => (
          <section key={catIdx} className="faq-category-block">
            <h2 className="faq-category-title">{cat.title}</h2>
            <div className="faq-accordion-group">
              {cat.items.map((item) => {
                const currentIndex = itemCounter++;
                const isOpen = openIndex === currentIndex;

                return (
                  <article key={currentIndex} className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-accordion-header"
                      onClick={() => toggle(currentIndex)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">
                        <i className="faq-num">{String(currentIndex + 1).padStart(2, '0')}.</i> {item.q}
                      </span>
                      <ChevronDown className="faq-chevron" />
                    </button>
                    {isOpen && (
                      <div className="faq-accordion-content">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        <div className="faq-contact-card">
          <h3>HAVE A QUESTION NOT LISTED HERE?</h3>
          <p>Reach out to our team directly. We are always happy to talk snacks.</p>
          <div className="faq-contact-buttons">
            <Link to="/contact" className="hero-button">
              CONTACT US <ArrowUpRight />
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="light-button">
              WHATSAPP US <ArrowUpRight />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
