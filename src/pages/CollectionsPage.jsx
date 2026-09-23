import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Plus, Check, ArrowUpRight, Filter, Sparkles, Package, ArrowDown } from 'lucide-react';
import { Footer } from '../components/Footer';

export function CollectionsPage({ onAdd, products = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [addedIds, setAddedIds] = useState({});

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory === 'gifting') {
      return []; // Handled specially by showing the custom box showcase
    }

    if (activeCategory !== 'all') {
      const cat = activeCategory.toLowerCase();
      list = list.filter((p) => {
        const itemCat = (p.category || p.handle || p.name || p.id || '').toLowerCase();
        if (cat === 'shankarpali' || cat === 'shankarpada') {
          return itemCat.includes('shankar');
        }
        return itemCat.includes(cat);
      });
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeCategory, sortBy]);

  const handleAddToCart = (product, selectedVariant) => {
    const itemToAdd = selectedVariant
      ? {
          ...product,
          variantId: selectedVariant.variantId || selectedVariant.id || product.variantId,
          price: selectedVariant.price || product.price,
          name: `${product.name} (${selectedVariant.title || 'Pack'})`,
        }
      : product;

    onAdd(itemToAdd);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1600);
  };

  const productCounts = useMemo(() => {
    const counts = { all: products.length, chakli: 0, bhakarwadi: 0, shankarpali: 0, gifting: 1 };
    products.forEach((p) => {
      const key = (p.category || p.handle || p.id || '').toLowerCase();
      if (key.includes('chakli')) counts.chakli++;
      if (key.includes('bhakarwadi')) counts.bhakarwadi++;
      if (key.includes('shankar')) counts.shankarpali++;
    });
    return counts;
  }, [products]);

  return (
    <div className="page-collections">
      {/* RETRO SHOP FRONTISPIECE / HERO */}
      <section className="collections-shop-hero" aria-label="Storefront Collection Banner">
        <div className="shop-hero-inner">
          <div className="shop-hero-copy">
            <div className="shop-hero-stamp">
              <span className="stamp-icon">★</span>
              <span>MAHARASHTRA FARSAN COUNTER • FRESH DAILY DISPATCH</span>
            </div>
            <h1>
              <span>THE ZAKAAS</span>
              <em>SNACK COUNTER.</em>
            </h1>
            <p className="shop-hero-desc">
              Three authentic Maharashtrian classics: brittle spiral Chakli, spiced coconut Bhakarwadi, and slow-fried sweet Shankarpali. Crafted with traditional flours and sealed airtight in 100g aroma pouches.
            </p>

            <div className="shop-hero-specs">
              <div className="shop-spec-badge">
                <span className="spec-dot" />
                <span>100% VEGETARIAN</span>
              </div>
              <div className="shop-spec-badge">
                <span className="spec-dot" />
                <span>ALL RECIPES ₹150</span>
              </div>
              <div className="shop-spec-badge">
                <span className="spec-dot" />
                <span>100g AROMA SEALED</span>
              </div>
            </div>

            <div className="shop-hero-actions">
              <a href="#shelves" className="shop-hero-browse-btn">
                EXPLORE THE SHELVES <ArrowDown size={14} />
              </a>
              <Link to="/builder" className="shop-hero-gift-btn">
                BUILD A GIFT BOX <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* PHYSICAL COUNTER STAGE — REAL PACKAGING HERO */}
          <div className="shop-hero-stage" aria-hidden="true">
            <div className="hero-stage-ledge">
              <div className="hero-stage-pack pack-chakli">
                <img src="/zakaas-chakli.jpg" alt="Zakaas Chakli 100g" />
                <span className="hero-pack-tag tag-blue">CHAKLI</span>
              </div>
              <div className="hero-stage-pack pack-bhakarwadi">
                <img src="/zakaas-bhakarwadi.jpg" alt="Zakaas Bhakarwadi 100g" />
                <span className="hero-pack-tag tag-red">BHAKARWADI</span>
              </div>
              <div className="hero-stage-pack pack-shankarpali">
                <img src="/zakaas-shankarpali.jpg" alt="Zakaas Shankarpali 100g" />
                <span className="hero-pack-tag tag-pink">SHANKARPALI</span>
              </div>
            </div>
            <div className="hero-stage-sill">
              <span className="stage-wood-label">HAND-PACKED IN RAJKOT, GUJARAT • FOR BHARAT</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SORT TOOLBAR */}
      <section className="collections-toolbar-section" id="shelves" aria-label="Product categories and sorting">
        <div className="toolbar-container">
          <div className="category-tabs" role="tablist" aria-label="Snack categories">
            {[
              { id: 'all', label: 'ALL SNACKS', count: productCounts.all },
              { id: 'chakli', label: 'CHAKLI', count: productCounts.chakli },
              { id: 'bhakarwadi', label: 'BHAKARWADI', count: productCounts.bhakarwadi },
              { id: 'shankarpali', label: 'SHANKARPALI', count: productCounts.shankarpali },
              { id: 'gifting', label: 'GIFT BOXES', count: 'BOX' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`category-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(tab.id)}
                >
                  <span className="tab-label">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="tab-count">[{tab.count}]</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="sort-wrap">
            <label htmlFor="collection-sort-select" className="sort-label">
              <Filter size={13} aria-hidden="true" />
              <span>SORT:</span>
            </label>
            <select
              id="collection-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <main className="collections-grid-wrap" aria-live="polite">
        <div className="grid-meta-bar">
          <p className="grid-count-note">
            SHOWING {activeCategory === 'gifting' ? '1 GIFT CURATION' : `${filteredProducts.length} SIGNATURE RECIPES`}
          </p>
          <span className="grid-guarantee">★ SEALED FOR FRESHNESS • 100% VEG</span>
        </div>

        {activeCategory === 'gifting' ? (
          <div className="gifting-featured-container">
            <CustomGiftBoxCard isHero={true} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products-view">
            <div className="no-products-sign">SHELF EMPTY</div>
            <h3>No snacks found in this category.</h3>
            <p>Our freshly fried batches roll out daily. Switch category to discover our classics.</p>
            <button onClick={() => handleCategoryChange('all')} className="hero-button">
              VIEW ALL SNACKS <ArrowUpRight size={15} />
            </button>
          </div>
        ) : (
          <div className="collections-grid">
            {filteredProducts.map((product) => (
              <ArtDirectedProductCard
                key={product.id || product.handle}
                product={product}
                onAdd={handleAddToCart}
                isAdded={addedIds[product.id]}
              />
            ))}

            {/* ART-DIRECTED 4TH CARD: CUSTOM GIFT BOX (DISCOVERY UPSELL) */}
            {activeCategory === 'all' && (
              <CustomGiftBoxCard isHero={false} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/**
 * ArtDirectedProductCard
 * Implements packaging-derived colour coordination (Chakli Blue, Bhakarwadi Red, Shankarpali Pink),
 * oversized pack hero, tactile interactive pack options, price hierarchy, and instant Add to Bag feedback.
 */
function ArtDirectedProductCard({ product, onAdd, isAdded }) {
  const categoryKey = (product.category || product.handle || product.id || '').toLowerCase();
  
  // Packaging Theme Configuration
  const theme = useMemo(() => {
    if (categoryKey.includes('chakli')) {
      return {
        class: 'theme-chakli',
        badge: 'TRADITIONAL BHAJAN FLOUR',
        accentColor: '#1E4D8C',
        tagText: 'SPIRAL CRUNCH',
        subtext: 'Brittle spiral crunch made from roasted rice & chana dal with cumin, sesame and ajwain.'
      };
    } else if (categoryKey.includes('bhakarwadi')) {
      return {
        class: 'theme-bhakarwadi',
        badge: 'SPICED COCONUT SPIRAL',
        accentColor: '#B8281B',
        tagText: 'SWEET & SPICY',
        subtext: 'Crisp golden rolls packed with roasted coconut, sesame, poppy seeds & warm warming spices.'
      };
    } else {
      return {
        class: 'theme-shankarpali' || 'theme-shankarpada',
        badge: 'GOLDEN MELT-IN-MOUTH',
        accentColor: '#D23868',
        tagText: 'SWEET DIAMONDS',
        subtext: 'Delicate sweet diamond crisps slow-kneaded with pure milk and lightly caramelized.'
      };
    }
  }, [categoryKey]);

  // Pack Variants Options
  const packVariants = product.packOptions || product.variants || [
    { id: 'pack-1', title: '1 PACK', weight: '100g', price: product.price || 150, mrp: product.mrp || 199 }
  ];

  const [selectedPack, setSelectedPack] = useState(packVariants[0]);

  const currentPrice = selectedPack?.price || product.price || 150;
  const currentMrp = selectedPack?.mrp || (currentPrice === 150 ? 199 : Math.round(currentPrice * 1.33));
  const savings = currentMrp - currentPrice;

  return (
    <article className={`art-collection-card ${theme.class}`} aria-label={`${product.name} snack card`}>
      {/* Top Card Kicker Row */}
      <div className="card-top-tag-bar">
        <span className="card-origin-pill">{theme.badge}</span>
        <span className="card-weight-pill">{selectedPack?.weight || product.weight || '100g'}</span>
      </div>

      {/* Visual Product Pack Stage */}
      <Link 
        to={`/products/${product.handle || product.id}`} 
        className="card-pack-stage"
        aria-label={`View full details for Zakaas ${product.name}`}
      >
        <div className="card-pack-pedestal">
          <img 
            src={product.image} 
            alt={`Zakaas ${product.name} 100g Pack`} 
            className="card-pack-img"
            loading="lazy"
          />
        </div>
        <div className="card-personality-flag">
          <span>{product.personality || theme.tagText}</span>
        </div>
      </Link>

      {/* Card Content & Interaction */}
      <div className="card-body-content">
        <div className="card-header-row">
          <h2 className="card-product-title">
            <Link to={`/products/${product.handle || product.id}`}>{product.name}</Link>
          </h2>
        </div>

        <p className="card-flavor-description">
          {product.shortDescription || theme.subtext}
        </p>

        {/* Tactile Pack Selector (1 Pack, 3 Packs, 5 Packs) */}
        {packVariants.length > 1 && (
          <div className="card-variant-selector" role="radiogroup" aria-label="Select pack size">
            {packVariants.map((v) => {
              const isSelected = (selectedPack?.id || selectedPack?.title) === (v.id || v.title);
              return (
                <button
                  key={v.id || v.title}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`pack-selector-pill ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedPack(v)}
                >
                  <span className="pill-title">{v.title}</span>
                  <span className="pill-price">₹{v.price}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Price & Purchase Actions */}
        <div className="card-footer-action-bar">
          <div className="card-price-stack">
            <div className="card-current-price">
              <span className="currency-symbol">₹</span>
              <span className="amount">{Number(currentPrice).toFixed(0)}</span>
            </div>
            {currentMrp > currentPrice && (
              <div className="card-mrp-row">
                <span className="mrp-strikethrough">MRP ₹{currentMrp}</span>
                {savings > 0 && <span className="savings-tag">SAVE ₹{savings}</span>}
              </div>
            )}
          </div>

          <div className="card-btn-cluster">
            <button
              type="button"
              className={`card-add-btn ${isAdded ? 'is-added' : ''}`}
              onClick={() => onAdd(product, selectedPack)}
              aria-label={`Add ${product.name} to shopping bag`}
            >
              {isAdded ? (
                <>
                  <span>ADDED</span>
                  <Check size={14} aria-hidden="true" />
                </>
              ) : (
                <>
                  <span>ADD TO BAG</span>
                  <Plus size={14} aria-hidden="true" />
                </>
              )}
            </button>

            <Link 
              to={`/products/${product.handle || product.id}`} 
              className="card-pdp-arrow-btn"
              aria-label={`View ingredients and story for ${product.name}`}
            >
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * CustomGiftBoxCard
 * An art-directed Discovery / Upsell card embedded directly inside the snack grid.
 */
function CustomGiftBoxCard({ isHero = false }) {
  return (
    <article className={`art-collection-card theme-gifting ${isHero ? 'is-hero-card' : ''}`} aria-label="Curate custom snack gift box">
      <div className="card-top-tag-bar">
        <span className="card-origin-pill">FESTIVE BOX CURATION</span>
        <span className="card-weight-pill">3 OR 5 PACKS</span>
      </div>

      <Link to="/builder" className="card-pack-stage gifting-stage" aria-label="Open Gift Box Builder">
        <div className="gifting-pack-cluster">
          <img src="/zakaas-chakli.jpg" alt="Chakli" className="gift-thumb-1" />
          <img src="/zakaas-bhakarwadi.jpg" alt="Bhakarwadi" className="gift-thumb-2" />
          <img src="/zakaas-shankarpali.jpg" alt="Shankarpali" className="gift-thumb-3" />
        </div>
        <div className="card-personality-flag tag-gold">
          <span>CURATE YOUR BOX</span>
        </div>
      </Link>

      <div className="card-body-content">
        <div className="card-header-row">
          <h2 className="card-product-title">
            <Link to="/builder">BUILD A BOX</Link>
          </h2>
        </div>

        <p className="card-flavor-description">
          Can't pick just one? Curate your own combination of freshly sealed Maharashtrian snack pouches in our signature gift box.
        </p>

        <div className="gifting-perks-row">
          <span className="gifting-perk-tag">★ Choose 3 or 5 Packs</span>
          <span className="gifting-perk-tag">★ Custom Gift Note</span>
        </div>

        <div className="card-footer-action-bar">
          <div className="card-price-stack">
            <div className="card-current-price">
              <span className="from-prefix">FROM </span>
              <span className="currency-symbol">₹</span>
              <span className="amount">450</span>
            </div>
            <span className="gifting-box-note">3 Packs Included</span>
          </div>

          <div className="card-btn-cluster full-width">
            <Link to="/builder" className="gifting-launch-btn">
              <span>LAUNCH BUILDER</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
