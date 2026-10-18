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
          a: "Yes! All ZAKAAS snacks are crafted in small batches by Bharat Namkeen (Marketed by ZAKAAS, FSSAI Lic. No. 10021021000754), preserving traditional Maharashtrian spice ratios and textures."
        },
        {
          q: "What flours, oils, and spices are used in each snack?",
          a: "Every pouch lists its exact recipe on the back label: Chakli is made with wheat flour (atta), sesame seeds (til), cumin, carom seeds (ajwain), red chili, and turmeric in edible vegetable oil (no palm oil). Bhakarwadi is rolled with refined wheat flour (maida) and Bengal gram flour (besan), filled with sesame, fennel, ajowan, amchur, red chilli, and whole spices, and fried in refined palmolein oil. Shankarpada is made with refined wheat flour (maida, 72%), edible vegetable oil (palm oil, 16%), refined sugar (8%), and hydrogenated vegetable fat. None of our snacks use artificial flavours, artificial colours, or added preservatives."
        },
        {
          q: "How should I store ZAKAAS snacks for maximum freshness?",
          a: "Store in a cool, dry place and keep the pouch sealed after opening (or transfer to an airtight tin) to maintain crispness. Please refer to the MFG. DATE, EXP. DATE, and BATCH NO. printed on each pack."
        },
        {
          q: "Are your products 100% vegetarian?",
          a: "Yes, all ZAKAAS products are 100% vegetarian. Please check each product page for specific allergen information (such as wheat/gluten and sesame)."
        }
      ]
    },
    {
      title: "GIFT BOXES, ORDERS & PAYMENTS",
      items: [
        {
          q: "What gift box sizes and discounts are available?",
          a: "In our Gift Box Builder (/builder), you can curate The Trio Box (3 × 100g packs) or The Grand Box (6 × 100g packs) with custom festive sleeve art and a printed greeting card (+₹99 packaging charge). When you order 3 or more packs (including any 3-pack or 6-pack gift box), an automatic 15% bundle discount is applied at Shopify checkout."
        },
        {
          q: "How do I place an order on the ZAKAAS store?",
          a: "Simply browse our storefront, add your chosen 100g snack pouches (₹180 each) or custom gift box to your bag, and click 'Continue to Shopify Checkout'."
        },
        {
          q: "What payment methods are supported?",
          a: "Through Shopify Checkout, we support Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, and select wallets."
        }
      ]
    },
    {
      title: "SHIPPING & DELIVERY",
      items: [
        {
          q: "Where does ZAKAAS deliver?",
          a: "We ship across India to all major pin codes! For bulk or corporate orders, please visit our B2B page."
        },
        {
          q: "How long does shipping take?",
          a: "Metro cities in India receive orders within 2 to 4 business days. Non-metro locations typically take 4 to 6 business days."
        },
        {
          q: "How are the delicate snacks protected during transport?",
          a: "Our snacks are sealed in moisture-barrier pouches and packed inside protective outer cartons to prevent crushing during transit."
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
          a: "Yes! We specialize in custom festive gift boxes for weddings, Diwali, corporate appreciation, and events."
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
        <p className="kicker">01 / QUESTIONS &amp; ANSWERS</p>
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
