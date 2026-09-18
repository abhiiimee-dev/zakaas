import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, Minus, Plus, ShieldCheck, Truck, Utensils } from 'lucide-react';
import { getProductByHandle } from '../lib/shopify';
import { getFallbackProductByHandle, products as fallbackProducts } from '../data/products';
import { Footer } from '../components/Footer';

export function ProductDetailPage({ onAdd, cartData }) {
  const { handle } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProductByHandle(handle)
      .then((data) => {
        if (!isMounted) return;
        const resolved = data || getFallbackProductByHandle(handle);
        setProduct(resolved);
        if (resolved?.variants?.length) {
          setSelectedVariant(resolved.variants[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        const resolved = getFallbackProductByHandle(handle);
        setProduct(resolved);
        if (resolved?.variants?.length) {
          setSelectedVariant(resolved.variants[0]);
        }
        setLoading(false);
      });

    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [handle]);

  if (loading) {
    return (
      <div className="product-loading-screen">
        <p className="kicker">LOADING ZAKAAS SNACK...</p>
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
  const price = selectedVariant?.price || product.price || 220;
  const variants = product.variants || [
    { id: 'var-250', title: '250g Pack', price: product.price, variantId: product.variantId },
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAdd({
        ...product,
        variantId: selectedVariant?.variantId || selectedVariant?.id || product.variantId,
        price,
        name: selectedVariant?.title ? `${product.name} (${selectedVariant.title})` : product.name,
      });
    }
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
      <div className="pdp-container">
        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-main-image">
            <img src={images[selectedImage] || product.image} alt={product.name} />
            <span className="pdp-personality-tag">{product.personality || 'MAHARASHTRA ORIGINAL'}</span>
          </div>

          {images.length > 1 && (
            <div className="pdp-thumbnails">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`pdp-thumb ${selectedImage === i ? 'is-active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${product.name} thumbnail ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="pdp-info">
          <div className="pdp-kicker-row">
            <span className="kicker">01 / TRADITIONAL MANUFACTURE</span>
            <span className="pdp-origin-pill">{product.origin || 'Maharashtra'}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>
          <p className="pdp-quote">“{product.line || 'A taste of Maharashtrian heritage.'}”</p>

          <div className="pdp-price-row">
            <span className="pdp-price">₹{Number(price).toFixed(0)}</span>
            <span className="pdp-tax-note">Inclusive of all taxes · Airtight Sealed</span>
          </div>

          <p className="pdp-description">{product.description}</p>

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="pdp-section">
              <label className="pdp-label">SELECT PACK SIZE / QUANTITY</label>
              <div className="pdp-variant-grid">
                {variants.map((v) => (
                  <button
                    key={v.id || v.variantId || v.title}
                    type="button"
                    className={`pdp-variant-btn ${selectedVariant?.id === v.id ? 'is-selected' : ''}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    <b>{v.title}</b>
                    <span>₹{Number(v.price || price).toFixed(0)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & CTA */}
          <div className="pdp-actions-wrap">
            <div className="pdp-quantity-picker">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                <Plus />
              </button>
            </div>

            <button
              type="button"
              className={`hero-button pdp-add-btn ${added ? 'is-added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? <>ADDED TO BAG <Check /></> : <>ADD TO BAG <Plus /></>}
            </button>
          </div>

          <button type="button" className="pdp-buy-now-btn" onClick={handleBuyNow}>
            BUY NOW WITH SHOPIFY CHECKOUT <ArrowUpRight />
          </button>

          {/* Value Props Grid */}
          <div className="pdp-trust-grid">
            <div>
              <Truck className="trust-icon" />
              <div>
                <b>FAST PAN-INDIA SHIPPING</b>
                <p>Ships within 24 hours in moisture-resistant triple pouch.</p>
              </div>
            </div>
            <div>
              <Utensils className="trust-icon" />
              <div>
                <b>TRADITIONAL RECIPE</b>
                <p>Made with authentic Maharashtrian spices & pure groundnut oil.</p>
              </div>
            </div>
            <div>
              <ShieldCheck className="trust-icon" />
              <div>
                <b>QUALITY GUARANTEE</b>
                <p>No artificial preservatives. 60-90 days guaranteed crunch.</p>
              </div>
            </div>
          </div>

          {/* Ingredients Accordion */}
          <div className="pdp-accordion-section">
            <details open className="pdp-details">
              <summary>
                <b>INGREDIENTS & ALLERGENS</b>
              </summary>
              <p>{product.ingredients || 'Gram flour, rice flour, sesame seeds, chilli powder, peanut oil, salt, asafoetida.'}</p>
            </details>

            <details className="pdp-details">
              <summary>
                <b>SHELF LIFE & STORAGE</b>
              </summary>
              <p>
                Shelf Life: {product.shelfLife || '90 Days'}. Store in an airtight container away from direct heat and sunlight to maintain signature crunch.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="pdp-related-section">
        <div className="related-header">
          <p className="kicker">PAIR IT WITH</p>
          <h2>COMPLETE YOUR<br /><em>SNACK TABLE.</em></h2>
        </div>

        <div className="related-grid">
          {related.map((relItem) => (
            <Link key={relItem.id} to={`/products/${relItem.handle}`} className="related-card">
              <img src={relItem.image} alt={relItem.name} />
              <div className="related-card-info">
                <small>{relItem.personality}</small>
                <h3>{relItem.name}</h3>
                <p>₹{Number(relItem.price).toFixed(0)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
