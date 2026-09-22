import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, Minus, Plus, ChevronRight, Truck, Banknote, ShieldCheck } from 'lucide-react';
import { getProductByHandle } from '../lib/shopify';
import { getFallbackProductByHandle } from '../data/products';
import { Footer } from '../components/Footer';

import { ProductGallery } from '../components/pdp/ProductGallery';
import { PackSelector } from '../components/pdp/PackSelector';
import { ProductFactStrip } from '../components/pdp/ProductFactStrip';
import { SnackMacroHero } from '../components/pdp/SnackMacroHero';
import { ProductStorySection } from '../components/pdp/ProductStorySection';
import { IngredientStorySection } from '../components/pdp/IngredientStorySection';
import { NutritionPanel } from '../components/pdp/NutritionPanel';
import { ProductAccordions } from '../components/pdp/ProductAccordions';
import { SocialTableSection } from '../components/pdp/SocialTableSection';
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
    },
    {
      id: 'pack-3',
      packCount: 3,
      title: '3 PACKS',
      weight: '300g',
      mrp: 597,
      price: 450,
      savings: 147,
      badge: 'BEST SELLER',
      variantId: product.variantId
    },
    {
      id: 'pack-5',
      packCount: 5,
      title: '5 PACKS',
      weight: '500g',
      mrp: 995,
      price: 750,
      savings: 245,
      badge: 'STOCK UP',
      variantId: product.variantId
    }
  ];

  const currentPack = selectedPack || packOptions[0];
  const unitPrice = currentPack?.price || 150;
  const unitMrp = currentPack?.mrp || 199;

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

  return (
    <div className="page-product-detail">
      {/* 1. Header & Minimal Breadcrumb */}
      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight className="crumb-separator" />
        <Link to="/collections">Snacks</Link>
        <ChevronRight className="crumb-separator" />
        <span aria-current="page">{product.name}</span>
      </nav>

      {/* 2. Hero Section: Packaging Gallery + Product Purchase Column */}
      <div className="pdp-container">
        {/* Left: Large Editorial Packaging Photo with Annotations */}
        <div className="pdp-gallery-col">
          <ProductGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            productName={product.name}
            personality={product.personality}
            annotations={product.editorialAnnotations}
          />
        </div>

        {/* Right: Highly Readable, Visually Exciting Product Information */}
        <div className="pdp-info-col">
          <div className="pdp-personality-lead">
            <span className="personality-label">{product.personality || 'THE CRUNCHY ONE'}</span>
            <span className="heritage-badge">{product.origin || 'MAHARASHTRA CLASSIC'}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          <p className="pdp-short-lead">
            {product.shortDescription || 'Crisp Maharashtrian chakli made with traditional bhajan flour, cumin and ajwain.'}
          </p>

          {/* Pricing Row: Product first, clear price & weight */}
          <div className="pdp-hero-price-line">
            <div className="price-num-group">
              <span className="price-main">₹{unitPrice}</span>
              <span className="price-strike">₹{unitMrp}</span>
            </div>
            <span className="price-pack-weight">{currentPack.weight}</span>
          </div>

          {/* Pack Size Selector (1 / 3 / 5 Packs Only) */}
          <PackSelector
            options={packOptions}
            selectedOptionId={currentPack.id}
            onSelect={(pack) => setSelectedPack(pack)}
          />

          {/* Quantity Controls & Bold Red/Orange Primary Food CTA */}
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
              className={`pdp-primary-cta ${added ? 'is-added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  ADDED TO BAG <Check className="btn-icon" />
                </>
              ) : (
                <>
                  ADD TO BAG — ₹{unitPrice * quantity} <Plus className="btn-icon" />
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
            BUY NOW WITH SHOPIFY CHECKOUT <ArrowUpRight className="btn-icon" />
          </button>

          {/* Delivery & Assurance Reassurance */}
          <div className="pdp-quick-delivery-bar">
            <div className="quick-item">
              <Banknote className="quick-icon" />
              <span>COD AVAILABLE</span>
            </div>
            <span className="quick-sep">|</span>
            <div className="quick-item">
              <Truck className="quick-icon" />
              <span>FREE SHIPPING</span>
            </div>
            <span className="quick-sep">|</span>
            <div className="quick-item">
              <ShieldCheck className="quick-icon" />
              <span>DELIVERY IN 3–5 DAYS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Editorial Product Fact Strip (Typography & Dividers) */}
      <ProductFactStrip facts={product.editorialFactStrip} />

      {/* 4. Large Food Photograph — "Show the Actual Snack" */}
      <SnackMacroHero
        image={images[0]}
        title={product.name}
        personality={product.personality}
      />

      {/* 5. "Why Chakli?" — The Product Story */}
      <ProductStorySection product={product} />

      {/* 6. Ingredient Story & Education — "What's in the Crunch?" */}
      <IngredientStorySection product={product} />

      {/* 7. Nutrition at a Glance — Real Laboratory/Manufacturer Data */}
      <NutritionPanel nutritionFacts={product.nutritionFacts} />

      {/* 8. Product Details & Exact Manufacturer Information */}
      <section className="zakaas-details-wrapper">
        <div className="details-container">
          <div className="details-section-header">
            <span className="kicker">AUTHENTIC PRODUCTION</span>
            <h2 className="details-main-title">PRODUCT & MAKER SPECIFICATIONS</h2>
          </div>

          <ProductAccordions
            product={product}
            selectedPack={currentPack}
          />
        </div>
      </section>

      {/* 9. From the Zakaas Table / Zakaas IRL (Authentic Community Moments) */}
      <SocialTableSection />

      {/* 10. Sticky Mobile Add to Cart Bar */}
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
