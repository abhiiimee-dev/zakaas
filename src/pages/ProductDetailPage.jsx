import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, Minus, Plus, ChevronRight } from 'lucide-react';
import { getProductByHandle } from '../lib/shopify';
import { getFallbackProductByHandle, products as fallbackProducts } from '../data/products';
import { Footer } from '../components/Footer';

import { ProductGallery } from '../components/pdp/ProductGallery';
import { ProductTrustStrip } from '../components/pdp/ProductTrustStrip';
import { ProductHighlights } from '../components/pdp/ProductHighlights';
import { PackSelector } from '../components/pdp/PackSelector';
import { DeliveryTrust } from '../components/pdp/DeliveryTrust';
import { DeliveryEstimate } from '../components/pdp/DeliveryEstimate';
import { ProductAccordions } from '../components/pdp/ProductAccordions';
import { StickyMobileCTA } from '../components/pdp/StickyMobileCTA';
import '../components/pdp/pdp.css';

export function ProductDetailPage({ onAdd, cartData }) {
  const { handle } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  const mainCtaRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProductByHandle(handle)
      .then((data) => {
        if (!isMounted) return;
        const resolved = data || getFallbackProductByHandle(handle);
        setProduct(resolved);
        // Default to the first pack option (1 Pack: 100g)
        if (resolved?.packOptions?.length) {
          setSelectedPack(resolved.packOptions[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        const resolved = getFallbackProductByHandle(handle);
        setProduct(resolved);
        if (resolved?.packOptions?.length) {
          setSelectedPack(resolved.packOptions[0]);
        }
        setLoading(false);
      });

    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [handle]);

  // Monitor visibility of main CTA to display sticky mobile CTA
  useEffect(() => {
    if (!mainCtaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky when main CTA is scrolled above viewport on mobile
        setShowStickyCta(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(mainCtaRef.current);
    return () => observer.disconnect();
  }, [product, loading]);

  if (loading) {
    return (
      <div className="product-loading-screen">
        <p className="kicker">PREPARING ZAKAAS SNACK...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Snack not found.</h2>
        <Link to="/collections" className="hero-button">
          EXPLORE STOREFRONT <ArrowUpRight />
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const packOptions = product.packOptions?.length ? product.packOptions : [
    {
      id: 'pack-1',
      packCount: 1,
      title: '1 PACK',
      weight: '100g',
      mrp: 199,
      price: 150,
      savings: 49,
      badge: null,
      variantId: product.variantId
    }
  ];

  const currentPack = selectedPack || packOptions[0];
  const unitPrice = currentPack?.price || 150;
  const unitMrp = currentPack?.mrp || 199;
  const unitSavings = currentPack?.savings || 49;

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      id: `${product.id}-${currentPack.id}`,
      variantId: currentPack.variantId || product.variantId,
      price: unitPrice,
      mrp: unitMrp,
      name: `${product.name} (${currentPack.title} · ${currentPack.weight})`,
      quantity: 1
    };

    onAdd(itemToAdd, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (cartData?.checkoutUrl) {
      window.open(cartData.checkoutUrl, '_blank');
    } else {
      navigate('/cart');
    }
  };

  const related = fallbackProducts.filter((p) => p.handle !== product.handle).slice(0, 3);

  return (
    <div className="page-product-detail">
      {/* Breadcrumb row */}
      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight className="crumb-separator" />
        <Link to="/collections">Snacks</Link>
        <ChevronRight className="crumb-separator" />
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp-container">
        {/* 1. Gallery Section (Left on Desktop) */}
        <div className="pdp-gallery-col">
          <ProductGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            productName={product.name}
            personality={product.personality}
          />
        </div>

        {/* 2. Product Info Column (Right on Desktop) */}
        <div className="pdp-info-col">
          {/* Header row: Kicker + Origin */}
          <div className="pdp-meta-header">
            <span className="kicker">01 / TRADITIONAL MANUFACTURE</span>
            <span className="pdp-origin-pill">{product.origin || 'Maharashtra Heritage'}</span>
          </div>

          {/* Product Name */}
          <h1 className="pdp-title">{product.name}</h1>

          {/* Editorial Tagline */}
          <p className="pdp-quote">“{product.line || 'A taste of Maharashtrian heritage.'}”</p>

          {/* Pricing Row */}
          <div className="zakaas-pdp-price-block">
            <div className="zakaas-price-primary-row">
              <span className="zakaas-selling-price">₹{unitPrice}</span>
              <span className="zakaas-mrp-price">₹{unitMrp}</span>
              <span className="zakaas-savings-badge">SAVE ₹{unitSavings}</span>
            </div>
            <div className="zakaas-tax-notice">
              <span>Inclusive of all taxes</span>
              <span className="bullet-sep">·</span>
              <span>100g vacuum sealed pack</span>
            </div>
          </div>

          {/* Product Trust / Value Strip */}
          <ProductTrustStrip claims={product.trustClaims} />

          {/* Short Product Description */}
          <p className="zakaas-short-description">
            {product.shortDescription || product.description}
          </p>

          {/* Product Highlight Pointers */}
          <ProductHighlights highlights={product.highlights} />

          {/* Pack Selector (1 / 3 / 5 Packs Only) */}
          <PackSelector
            options={packOptions}
            selectedOptionId={currentPack.id}
            onSelect={(pack) => setSelectedPack(pack)}
          />

          {/* Quantity Controls & Primary Add to Cart */}
          <div className="pdp-actions-wrap" ref={mainCtaRef}>
            <div className="pdp-quantity-picker" aria-label="Adjust quantity">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus />
              </button>
            </div>

            <button
              type="button"
              className={`hero-button pdp-add-btn ${added ? 'is-added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  ADDED TO BAG <Check />
                </>
              ) : (
                <>
                  ADD TO BAG — ₹{unitPrice * quantity} <Plus />
                </>
              )}
            </button>
          </div>

          {/* Secondary Buy Now */}
          <button
            type="button"
            className="pdp-buy-now-btn"
            onClick={handleBuyNow}
          >
            BUY NOW WITH SHOPIFY CHECKOUT <ArrowUpRight />
          </button>

          {/* COD / Shipping / Delivery Trust Bar */}
          <DeliveryTrust />

          {/* Dynamic Delivery Estimate */}
          <DeliveryEstimate />

          {/* Manufacturing Information & Product Accordions */}
          <ProductAccordions
            product={product}
            selectedPack={currentPack}
          />

          {/* Subtle Editorial Brand Hashtags */}
          <div className="zakaas-editorial-hashtags">
            <span>#Zakaas</span>
            <span className="dot">·</span>
            <span>#MaharashtraInEveryBite</span>
            <span className="dot">·</span>
            <span>#JagaBadliSwadNahi</span>
          </div>
        </div>
      </div>

      {/* Related Products / Pair With */}
      <section className="pdp-related-section">
        <div className="related-header">
          <p className="kicker">PAIR IT WITH</p>
          <h2>
            COMPLETE YOUR<br />
            <em>SNACK TABLE.</em>
          </h2>
        </div>

        <div className="related-grid">
          {related.map((relItem) => (
            <Link
              key={relItem.id}
              to={`/products/${relItem.handle}`}
              className="related-card"
            >
              <img src={relItem.image} alt={relItem.name} loading="lazy" />
              <div className="related-card-info">
                <small>{relItem.personality}</small>
                <h3>{relItem.name}</h3>
                <p>₹{Number(relItem.price || 150).toFixed(0)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sticky Mobile Add to Cart Bar */}
      <StickyMobileCTA
        productName={product.name}
        selectedPack={currentPack}
        price={unitPrice * quantity}
        added={added}
        onAddToCart={handleAddToCart}
        visible={showStickyCta}
      />

      <Footer />
    </div>
  );
}
