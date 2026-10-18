import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, Minus, Plus, ChevronRight } from 'lucide-react';
import { getProductByHandle } from '../lib/shopify';
import {
  getFallbackProductByHandle,
  getUnitPrice,
  getUnitMrp,
  buildPackOptions,
} from '../data/products';
import { Footer } from '../components/Footer';

import { ProductGallery } from '../components/pdp/ProductGallery';
import { PackSelector } from '../components/pdp/PackSelector';
import { ProductFactStrip } from '../components/pdp/ProductFactStrip';
import { IngredientStorySection } from '../components/pdp/IngredientStorySection';
import { ProductDetailsSection } from '../components/pdp/ProductDetailsSection';
import { InstagramSection } from '../components/pdp/InstagramSection';
import { StickyMobileCTA } from '../components/pdp/StickyMobileCTA';

import '../components/pdp/pdp.css';

export function ProductDetailPage({ onAdd, cartData }) {
  const { handle } = useParams();
  const navigate = useNavigate();

  const initialProduct = getFallbackProductByHandle(handle);
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(initialProduct?.packOptions?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  const mainCtaRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fallback = getFallbackProductByHandle(handle);
    setProduct(fallback);
    setSelectedImage(0);
    setQuantity(1);
    if (fallback?.packOptions?.length) {
      setSelectedPack(fallback.packOptions[0]);
    }
    setLoading(false);

    getProductByHandle(handle)
      .then((data) => {
        if (!isMounted || !data) return;
        setProduct(data);
        if (data?.packOptions?.length) {
          setSelectedPack((prev) =>
            data.packOptions.find((p) => p.id === prev?.id) || data.packOptions[0]
          );
        }
      })
      .catch(() => {});

    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [handle]);

  // Observer for mobile sticky CTA
  useEffect(() => {
    if (!mainCtaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
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
  const baseUnitPrice = getUnitPrice(product);
  const baseUnitMrp = getUnitMrp(product);
  const packOptions = product.packOptions?.length
    ? product.packOptions
    : buildPackOptions(baseUnitPrice, baseUnitMrp, product.variantId);

  const currentPack = selectedPack || packOptions[0];
  const packPrice = Number(currentPack?.price) || baseUnitPrice;
  const packMrp = Number(currentPack?.mrp) || baseUnitMrp;
  const packCount = Number(currentPack?.packCount) || 1;

  const handleAddToCart = () => {
    const totalPouches = packCount * quantity;
    const baseItem = {
      ...product,
      id: product.handle || product.id,
      variantId: currentPack.variantId || product.variantId,
      price: baseUnitPrice,
      mrp: baseUnitMrp,
      name: product.name,
      quantity: 1,
    };

    onAdd(baseItem, totalPouches);
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

  return (
    <div className="page-product-detail">
      {/* 01. Minimal Breadcrumb Navigation */}
      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight className="crumb-separator" />
        <Link to="/collections">Snacks</Link>
        <ChevronRight className="crumb-separator" />
        <span aria-current="page">{product.name}</span>
      </nav>

      {/* 01. Product Hero */}
      <div className="pdp-hero-container">
        {/* Left: Product Photography */}
        <div className="pdp-hero-visual-col">
          <ProductGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            productName={product.name}
          />
        </div>

        {/* Right: Product Purchase Column */}
        <div className="pdp-hero-info-col">
          <h1 className="product-title">{product.name}</h1>

          {/* Verified Buyer Star Rating */}
          <div className="product-review-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div className="stars" style={{ color: 'var(--red, #B8281B)', display: 'flex', gap: '2px' }}>
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(26, 24, 21, 0.8)', fontFamily: 'var(--font-mono)' }}>4.9/5 (120+ REVIEWS)</span>
          </div>

          <p className="product-summary">
            {product.shortDescription || product.description}
          </p>

          <div className="product-pricing-line">
            <span className="current-price">₹{packPrice}</span>
            <span className="original-mrp">MRP ₹{packMrp}</span>
            <span className="pack-weight-indicator">{currentPack.weight}</span>
          </div>

          {/* Pack Selector (1 / 3 / 5 Packs Only) */}
          <PackSelector
            options={packOptions}
            selectedOptionId={currentPack.id}
            onSelect={(pack) => setSelectedPack(pack)}
            unitPrice={baseUnitPrice}
          />

          {/* 01. Buy Now (Placed Above Add to Bag) */}
          <button
            type="button"
            className="pdp-buy-now-button"
            onClick={handleBuyNow}
          >
            BUY NOW
          </button>

          {/* 02. Quantity Stepper & Add to Bag */}
          <div className="pdp-cta-group" ref={mainCtaRef}>
            <div className="stepper-picker" aria-label="Adjust quantity">
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
              className={`primary-add-button ${added ? 'is-added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  ADDED TO BAG <Check className="btn-icon" />
                </>
              ) : (
                <>
                  ADD TO BAG — ₹{packPrice * quantity}
                </>
              )}
            </button>
          </div>

          {/* Delivery & Trust Note */}
          <div className="delivery-simple-note" style={{ marginTop: '24px', padding: '16px', backgroundColor: '#FDF1EC', border: '1.5px solid var(--charcoal, #1A1815)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--ochre, #D9822B)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={12} color="#fff" strokeWidth={3} />
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>FRESHLY FRIED IN SMALL BATCHES</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.5', margin: 0, color: 'rgba(26, 24, 21, 0.8)' }}>
              Standard delivery in 3–5 business days across India. Automatic 15% multi-pack discount applies at Shopify checkout on 3+ packs.
            </p>
          </div>
        </div>
      </div>

      {/* 02. Product Facts Strip */}
      <ProductFactStrip product={product} />

      {/* 03. What's In The Crunch (Product-Specific Ingredients) */}
      <IngredientStorySection product={product} />

      {/* 04. Nutrition & Product Details */}
      <ProductDetailsSection product={product} selectedPack={currentPack} />

      {/* 05. Real Zakaas Content (Zakaas, IRL) */}
      <InstagramSection />

      {/* Sticky Mobile Bar */}
      <StickyMobileCTA
        productName={product.name}
        selectedPack={currentPack}
        price={packPrice * quantity}
        added={added}
        onAddToCart={handleAddToCart}
        visible={showStickyCta}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
