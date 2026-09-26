import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, Minus, Plus, ChevronRight } from 'lucide-react';
import { getProductByHandle } from '../lib/shopify';
import { getFallbackProductByHandle } from '../data/products';
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
      badge: null,
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

          <p className="product-summary">
            {product.shortDescription || 'Crisp, savoury Maharashtrian chakli made with traditional bhajan flour, cumin and ajwain.'}
          </p>

          <div className="product-pricing-line">
            <span className="current-price">₹{unitPrice}</span>
            <span className="original-mrp">MRP ₹{unitMrp}</span>
            <span className="pack-weight-indicator">{currentPack.weight}</span>
          </div>

          {/* Pack Selector (1 / 3 / 5 Packs Only) */}
          <PackSelector
            options={packOptions}
            selectedOptionId={currentPack.id}
            onSelect={(pack) => setSelectedPack(pack)}
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
                  ADD TO BAG — ₹{unitPrice * quantity}
                </>
              )}
            </button>
          </div>

          {/* Delivery Note */}
          <p className="delivery-simple-note">
            Standard delivery in 3–5 business days across India. Cash on Delivery available.
          </p>
        </div>
      </div>

      {/* 02. Product Facts Strip */}
      <ProductFactStrip />

      {/* 03. What's In The Crunch (Single Visual Composition) */}
      <IngredientStorySection />

      {/* 04. Nutrition & Product Details */}
      <ProductDetailsSection selectedPack={currentPack} />

      {/* 05. Real Zakaas Content (Zakaas, IRL) */}
      <InstagramSection />

      {/* Sticky Mobile Bar */}
      <StickyMobileCTA
        productName={product.name}
        selectedPack={currentPack}
        price={unitPrice * quantity}
        added={added}
        onAddToCart={handleAddToCart}
        visible={showStickyCta}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
