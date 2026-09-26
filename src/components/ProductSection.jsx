import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products as fallbackProducts } from '../data/products';

const tones = ['terracotta', 'ochre-deep', 'maroon'];
const crops = ['50% 32%', '35% 65%', '65% 60%'];

const productDescriptors = {
  chakli: 'Crispy Spirals',
  bhakarwadi: 'Spiced Pinwheels',
  shankarpali: 'Sweet Diamonds',
  shankarpada: 'Sweet Diamonds'
};

const productSubtitles = {
  chakli: 'Slow-roasted multigrain flour with brittle cumin ridges and aromatic ajwain crunch.',
  bhakarwadi: 'Crisp fried rolls packed with roasted coconut, poppy seeds, and spicy warmth.',
  shankarpali: 'Golden sweet flaky diamonds handcrafted with pure desi ghee and cardamom.',
  shankarpada: 'Golden sweet flaky diamonds handcrafted with pure desi ghee and cardamom.'
};

const productFrames = product => {
  const rawList = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.image];
  // Deduplicate images to prevent accidental repeated rendering of the same image
  const uniqueUrls = Array.from(new Set(rawList.filter(Boolean)));
  return uniqueUrls.map((image, i) => ({
    image,
    position: crops[i % crops.length] || '50% 50%'
  }));
};

function ProductCard({ product, index, onAdd, onFly, cartData }) {
  const [frame, setFrame] = useState(0);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const pointer = useRef(null);
  const visualRef = useRef(null);
  const frames = useMemo(() => productFrames(product), [product]);
  const hasMultipleFrames = frames.length > 1;

  const wasDragged = useRef(false);

  const go = direction => {
    if (!hasMultipleFrames) return;
    setFrame(current => (current + direction + frames.length) % frames.length);
  };

  const down = event => {
    if (!hasMultipleFrames) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    wasDragged.current = false;
  };

  const up = event => {
    if (!hasMultipleFrames || !pointer.current) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
      wasDragged.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const handleVisualClick = event => {
    if (wasDragged.current) {
      event.preventDefault();
      event.stopPropagation();
      wasDragged.current = false;
    }
  };

  const add = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.variantId && !product.id) return;
    setAdded(true);
    if (onFly) onFly(product, visualRef.current, frames[frame] || { image: product.image });
    if (onAdd) onAdd(product, qty);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const buyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.variantId && !product.id) return;
    if (onAdd) onAdd(product, qty);
    if (cartData?.checkoutUrl) {
      window.open(cartData.checkoutUrl, '_blank');
    } else {
      navigate('/cart');
    }
  };

  const handle = product.handle || product.id;
  const normalizedKey = (handle || '').toLowerCase();
  const descriptor = productDescriptors[normalizedKey] || product.personality || 'MAHARASHTRA ORIGINAL';
  const descriptionText = productSubtitles[normalizedKey] || productSubtitles[product.id] || product.shortDescription || product.line || 'Traditional Maharashtrian snack.';
  const primaryImage = frames[0]?.image || product.image || '/zakaas-chakli.jpg';
  const unitPrice = Number(product.price) || 150;
  const unitMrp = (product.mrp && Number(product.mrp) > unitPrice) 
    ? Number(product.mrp) 
    : Math.round(unitPrice * 1.25);
  const toneClass = tones[index % tones.length];

  return (
    <article className={`zakaas-anti-card tone-${toneClass}`} aria-label={`${product.name} product card`}>
      {/* Anti-Gravity Floating Stage */}
      <div className="anti-pouch-stage">
        <Link 
          to={`/products/${handle}`}
          className="anti-pouch-anchor"
          ref={visualRef} 
          onPointerDown={down} 
          onPointerUp={up}
          onClick={handleVisualClick}
          aria-label={`View ${product.name} details`}
        >
          <div className="anti-pouch-float-box">
            {hasMultipleFrames ? (
              <>
                <div className="anti-gallery-track" style={{ transform: `translateX(-${frame * 100}%)` }}>
                  {frames.map((item, imageIndex) => (
                    <div className="anti-gallery-frame" key={`${item.image}-${imageIndex}`}>
                      <img 
                        src={item.image} 
                        style={{ objectPosition: item.position }} 
                        alt={imageIndex === 0 ? `${product.name} ZAKAAS pack` : `${product.name} detail`}
                        className="anti-pouch-img"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>

                <div className="anti-gallery-controls" onClick={e => e.stopPropagation()}>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }} aria-label={`Previous ${product.name} image`}>
                    <ChevronLeft size={15} />
                  </button>
                  <span>{String(frame + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}</span>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }} aria-label={`Next ${product.name} image`}>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="anti-gallery-frame single-frame">
                <img 
                  src={primaryImage} 
                  alt={`${product.name} ZAKAAS pack`}
                  className="anti-pouch-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            )}
          </div>
        </Link>

        {/* Soft Blurred Elliptical Contact Shadow */}
        <div className="anti-pouch-shadow" aria-hidden="true" />
      </div>

      {/* Card Content & Details */}
      <div className="anti-card-content">
        <div className="anti-card-kicker">
          <span className="anti-kicker-num">0{index + 1} / {descriptor.toUpperCase()}</span>
          <span className="anti-kicker-weight">200g</span>
        </div>

        <Link to={`/products/${handle}`} className="anti-card-title-link">
          <h3 className="anti-product-name">{product.name}</h3>
        </Link>
        <p className="anti-product-descriptor">{descriptor}</p>
        <p className="anti-product-summary">{descriptionText}</p>
        
        <div className="anti-price-row">
          <span className="anti-current-price">₹{unitPrice}</span>
          <span className="anti-original-mrp">MRP ₹{unitMrp}</span>
          <span className="anti-weight-tag">200g PACK</span>
        </div>

        {/* Card Purchase Actions */}
        <div className="product-card-actions anti-card-actions">
          {/* 01. Buy Now (Above Add to Bag) */}
          <button 
            type="button"
            className="product-buy-now-btn anti-buy-btn" 
            onClick={buyNow}
            aria-label={`Buy ${product.name} now`}
          >
            BUY NOW
          </button>
          
          {/* 02. Quantity Stepper + Add to Bag (Aligned Row) */}
          <div className="product-cart-row anti-cart-row">
            <div className="product-stepper anti-stepper" aria-label={`Adjust ${product.name} quantity`}>
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty(q => Math.max(1, q - 1)); }}
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span aria-live="polite">{qty}</span>
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty(q => q + 1); }}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>

            <button 
              type="button"
              className={`product-add anti-add-btn ${added ? 'is-added' : ''}`} 
              onClick={add}
              aria-label={`Add ${product.name} to bag`}
            >
              {added ? (
                <>ADDED TO BAG <Check size={14} /></>
              ) : (
                <>ADD TO BAG — ₹{unitPrice * qty}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductSection({ onAdd, products = fallbackProducts, live = false, cartData }) {
  const [flying, setFlying] = useState(null);

  const fly = (product, visual, frame) => {
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = visual.getBoundingClientRect();
    const bag = document.querySelector('.bag-button')?.getBoundingClientRect();
    if (!bag) return;
    setFlying({ product, image: frame.image, start, bag });
    window.requestAnimationFrame(() => 
      window.requestAnimationFrame(() => 
        setFlying(current => current ? { ...current, go: true } : null)
      )
    );
    window.setTimeout(() => {
      setFlying(null);
      window.dispatchEvent(new CustomEvent('zakaas:add-to-bag'));
    }, 850);
  };

  const style = flying ? {
    '--start-x': `${flying.start.left + flying.start.width * 0.5}px`,
    '--start-y': `${flying.start.top + flying.start.height * 0.63}px`,
    '--end-x': `${flying.bag.left + flying.bag.width * 0.5}px`,
    '--end-y': `${flying.bag.top + flying.bag.height * 0.5}px`
  } : {};

  const displayProducts = products.length >= 3 ? products.slice(0, 3) : fallbackProducts.slice(0, 3);

  return (
    <section className="products-section zakaas-anti-section" id="shop">
      {/* Editorial Header */}
      <div className="zakaas-anti-header">
        <span className="zakaas-anti-brand-label">ZAKAAS {live && '· LIVE FROM SHOPIFY'}</span>
        <h2 className="zakaas-anti-title">TRADITIONAL MAHARASHTRIAN SNACKS</h2>
        <p className="zakaas-anti-tagline">“Timeless recipes. Irresistible flavours.”</p>
        <div className="zakaas-anti-header-action">
          <Link to="/collections" className="zakaas-anti-link">
            EXPLORE ALL SNACKS <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Anti-Gravity Cards Grid */}
      <div className="zakaas-anti-grid">
        {displayProducts.map((product, index) => (
          <ProductCard 
            key={product.id || index} 
            product={product} 
            index={index} 
            onAdd={onAdd} 
            onFly={fly} 
            cartData={cartData}
          />
        ))}
      </div>

      {/* Subtle Heritage Footer Detail */}
      <footer className="zakaas-anti-footer" aria-label="Brand heritage note">
        <span>Natural ingredients</span>
        <span className="anti-footer-sep" aria-hidden="true">✦</span>
        <span>Authentic Maharashtrian recipes</span>
        <span className="anti-footer-sep" aria-hidden="true">✦</span>
        <span>Made with love and tradition</span>
      </footer>

      {flying && (
        <div className={`snack-flight ${flying.go ? 'is-flying' : ''}`} style={style} aria-hidden="true">
          <img src={flying.image} alt="" />
        </div>
      )}
    </section>
  );
}
