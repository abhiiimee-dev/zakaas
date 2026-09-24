import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products as fallbackProducts } from '../data/products';

const tones = ['terracotta', 'ochre-deep', 'maroon'];
const crops = ['50% 50%', '35% 65%', '65% 60%'];

const productSubtitles = {
  chakli: 'Slow-roasted multigrain flour with brittle cumin ridges and nutty sesame crunch.',
  bhakarwadi: 'Crisp fried rolls packed with roasted coconut, poppy seeds, and spicy warmth.',
  shankarpali: 'Golden sweet flaky diamonds made with pure ghee and melt-in-mouth sweetness.'
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

function ProductCard({ product, index, onAdd, onFly }) {
  const [frame, setFrame] = useState(0);
  const [added, setAdded] = useState(false);
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
    if (onAdd) onAdd(product);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handle = product.handle || product.id;
  const descriptionText = productSubtitles[product.id] || product.line || product.description || 'A little taste of home.';
  const primaryImage = frames[0]?.image || product.image || '/zakaas-chakli.jpg';

  return (
    <article className={`product-feature product-editorial ${tones[index % tones.length]}`}>
      <div className="product-top">
        <span className="product-origin-label">0{index + 1} / ZAKAAS ORIGINAL</span>
        <span className="product-price">
          {product.price ? `₹${Number(product.price).toFixed(0)}` : '₹150'} · 100g
        </span>
      </div>

      <Link 
        to={`/products/${handle}`}
        className="product-visual product-gallery" 
        ref={visualRef} 
        onPointerDown={down} 
        onPointerUp={up}
        onClick={handleVisualClick}
        aria-label={`View ${product.name} details`}
      >
        {hasMultipleFrames ? (
          <>
            <div className="product-gallery-track" style={{ transform: `translateX(-${frame * 100}%)` }}>
              {frames.map((item, imageIndex) => (
                <div className="product-gallery-frame" key={`${item.image}-${imageIndex}`}>
                  <img 
                    src={item.image} 
                    style={{ objectPosition: item.position }} 
                    alt={imageIndex === 0 ? `${product.name} ZAKAAS pack` : `${product.name} detail`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            <div className="gallery-controls" onClick={e => e.stopPropagation()}>
              <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }} aria-label={`Previous ${product.name} image`}>
                <ChevronLeft size={16} />
              </button>
              <span>{String(frame + 1).padStart(2, '0')} <i /> {String(frames.length).padStart(2, '0')}</span>
              <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }} aria-label={`Next ${product.name} image`}>
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="product-gallery-frame single-frame">
            <img 
              src={primaryImage} 
              style={{ objectPosition: '50% 50%' }} 
              alt={`${product.name} ZAKAAS pack`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        )}
      </Link>

      <div className="product-copy">
        <div className="product-header-line">
          <small>{product.personality || 'MAHARASHTRA ORIGINAL'}</small>
        </div>
        <Link to={`/products/${handle}`} className="product-title-link">
          <h3>{product.name}</h3>
        </Link>
        <p className="product-subline">“{descriptionText}”</p>
        
        <div className="product-card-actions">
          <button 
            type="button"
            className={`product-add ${added ? 'is-added' : ''}`} 
            onClick={add}
            aria-label={`Add ${product.name} to bag`}
          >
            {added ? (
              <>ADDED TO BAG <Check size={14} /></>
            ) : (
              <>ADD TO BAG — ₹{product.price || '150'} <Plus size={14} /></>
            )}
          </button>
          
          <Link to={`/products/${handle}`} className="product-detail-btn" aria-label={`View ${product.name} details`}>
            DETAILS <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductSection({ onAdd, products = fallbackProducts, live = false }) {
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
    <section className="products-section" id="shop">
      <div className="section-intro">
        <div className="section-title-wrap">
          <p className="kicker">01 / THE MAHARASHTRIAN TRIO {live && '· LIVE FROM SHOPIFY'}</p>
          <h2>THREE CLASSICS.</h2>
        </div>
        <div className="section-intro-right">
          <p>Handcrafted with slow-roasted grains, whole spices, and pure ghee. Pick your pack, tear it open, pass it around.</p>
          <Link to="/collections" className="light-button inline-btn">
            EXPLORE ALL SNACKS <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="product-rail">
        {displayProducts.map((product, index) => (
          <ProductCard 
            key={product.id || index} 
            product={product} 
            index={index} 
            onAdd={onAdd} 
            onFly={fly} 
          />
        ))}
      </div>

      {flying && (
        <div className={`snack-flight ${flying.go ? 'is-flying' : ''}`} style={style} aria-hidden="true">
          <img src={flying.image} alt="" />
        </div>
      )}
    </section>
  );
}
