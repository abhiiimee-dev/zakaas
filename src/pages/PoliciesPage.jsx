import { useState } from 'react';
import { Footer } from '../components/Footer';

export function PoliciesPage() {
  const [activeTab, setActiveTab] = useState('shipping');

  const policies = [
    { id: 'shipping', title: '1. SHIPPING POLICY' },
    { id: 'returns', title: '2. RETURN & EXCHANGE POLICY' },
    { id: 'delivery', title: '3. DELIVERY POLICY' },
    { id: 'terms', title: '4. TERMS OF SERVICE' },
    { id: 'privacy', title: '5. PRIVACY POLICY' },
  ];

  return (
    <div className="page-policies">
      <div className="policies-hero">
        <p className="kicker">01 / STORE POLICIES & COMPLIANCE</p>
        <h1>
          <span>ZAKAAS STORE</span>
          <em>POLICIES.</em>
        </h1>
        <p className="policies-intro">
          Transparent, straightforward rules for shipping, returns, delivery, terms, and privacy.
        </p>
      </div>

      <div className="policies-tabs-nav">
        {policies.map((p) => (
          <button
            key={p.id}
            className={`policy-nav-btn ${activeTab === p.id ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab(p.id);
              document.getElementById(`policy-section-${p.id}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <main className="policies-content-container">
        {/* Shipping Policy */}
        <section id="policy-section-shipping" className={`policy-block ${activeTab === 'shipping' ? 'is-highlighted' : ''}`}>
          <h2>SHIPPING POLICY</h2>
          <div className="policy-text">
            <p>
              At ZAKAAS, we ensure that every snack pack leaves our Maharashtra kitchens in prime condition.
            </p>
            <ul>
              <li><b>Processing Time:</b> Orders placed before 2 PM IST are processed and packed on the same business day. Orders placed after 2 PM or on Sundays/Public Holidays are processed on the next business day.</li>
              <li><b>Packaging Standards:</b> All items are sealed in multi-layer metallic barrier pouches with food-grade nitrogen flushing to guarantee 100% moisture resistance and zero breakage during transit.</li>
              <li><b>Pan-India Courier Network:</b> We partner with top-tier express courier services (BlueDart, Delhivery, DTDC) for fast delivery across all Indian pin codes.</li>
              <li><b>Tracking Updates:</b> Once dispatched, you will receive an automated tracking link via SMS and email.</li>
            </ul>
          </div>
        </section>

        {/* Return & Exchange Policy */}
        <section id="policy-section-returns" className={`policy-block ${activeTab === 'returns' ? 'is-highlighted' : ''}`}>
          <h2>RETURN & EXCHANGE POLICY</h2>
          <div className="policy-text">
            <p>
              Because ZAKAAS products are perishable food items, we cannot accept returns once packages are opened or delivered.
            </p>
            <ul>
              <li><b>Damaged or Defective Items:</b> If your package arrives crushed, punctured, or damaged during transport, please notify us within 48 hours of delivery at <b>hello@zakaas.in</b> with photographs of the damaged box.</li>
              <li><b>Incorrect Orders:</b> If you receive an item different from your order confirmation, we will dispatch the correct item immediately at no additional cost.</li>
              <li><b>Refund Processing:</b> Approved refunds are processed back to the original payment method within 5 to 7 business days via Shopify Checkout gateway.</li>
            </ul>
          </div>
        </section>

        {/* Delivery Policy */}
        <section id="policy-section-delivery" className={`policy-block ${activeTab === 'delivery' ? 'is-highlighted' : ''}`}>
          <h2>DELIVERY POLICY</h2>
          <div className="policy-text">
            <p>
              Expected delivery timeframes across India:
            </p>
            <ul>
              <li><b>Maharashtra Metro Areas (Mumbai, Pune, Thane, Nagpur, Nashik, Kolhapur):</b> 1 to 3 business days.</li>
              <li><b>Other Indian Tier 1 & Metro Cities (Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</b> 2 to 4 business days.</li>
              <li><b>Rest of India:</b> 4 to 6 business days.</li>
              <li><b>Failed Delivery Attempts:</b> Our logistics partners attempt delivery up to 3 times. Please ensure accurate address information and contact phone numbers at checkout.</li>
            </ul>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="policy-section-terms" className={`policy-block ${activeTab === 'terms' ? 'is-highlighted' : ''}`}>
          <h2>TERMS OF SERVICE</h2>
          <div className="policy-text">
            <p>
              By accessing and placing an order on the ZAKAAS storefront, you agree to the following terms:
            </p>
            <ul>
              <li><b>Intellectual Property:</b> The ZAKAAS logo, visual identity, taglines, typography, and website content are exclusive trademarks and property of ZAKAAS Foods Pvt. Ltd.</li>
              <li><b>Pricing & Availability:</b> Prices, pack weights, and product availability are subject to change without prior notice. All prices are listed in INR (₹) inclusive of applicable GST taxes.</li>
              <li><b>User Account Responsibilities:</b> You are responsible for providing current, complete, and accurate purchase and account information for all orders.</li>
            </ul>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="policy-section-privacy" className={`policy-block ${activeTab === 'privacy' ? 'is-highlighted' : ''}`}>
          <h2>PRIVACY POLICY</h2>
          <div className="policy-text">
            <p>
              ZAKAAS respects your privacy and is committed to protecting your personal data:
            </p>
            <ul>
              <li><b>Data Collected:</b> We collect essential contact information (Name, Email, Delivery Address, Phone Number) necessary to process and fulfill your orders through Shopify.</li>
              <li><b>Payment Security:</b> We do NOT store credit/debit card credentials or UPI PINs on our servers. All transaction details are processed by encrypted PCI-DSS compliant payment gateways.</li>
              <li><b>Third-Party Sharing:</b> Your personal information is shared strictly with authorized logistics partners for delivery purposes only. We never sell your personal data to advertising networks.</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
