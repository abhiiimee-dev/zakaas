import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, ArrowUpRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import {
  UNIT_PRICE,
  GIFT_PACKAGING_PRICE,
  getUnitPrice,
  getUnitMrp,
  buildPackOptions,
  calculateGiftBoxPricing,
} from '../data/products';

export function CollectionsPage({ onAdd, products = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
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
      return [];
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
      list.sort((a, b) => getUnitPrice(a) - getUnitPrice(b));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => getUnitPrice(b) - getUnitPrice(a));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeCategory, sortBy]);

  const handleAddToCart = (product, selectedVariant) => {
    const baseUnitPrice = getUnitPrice(product);
    const baseUnitMrp = getUnitMrp(product);
    const packCount = Number(selectedVariant?.packCount) || 1;

    const baseItem = {
      ...product,
      id: product.handle || product.id,
      variantId: selectedVariant?.variantId || product.variantId,
      price: baseUnitPrice,
      mrp: baseUnitMrp,
      name: product.name,
      quantity: 1,
    };

    onAdd(baseItem, packCount);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1600);
  };

  return (
    <div className="page-collections">
      {/* EDITORIAL COLLECTION HEADER */}
      <section className="collections-shop-hero" aria-label="Storefront Collection Banner">
        <div className="shop-hero-inner">
          <div className="shop-hero-copy">
            <p className="shop-hero-eyebrow">THE COLLECTION · MAHARASHTRA ORIGINALS</p>
            <h1>
              <span>THE ZAKAAS</span>
              <em>Snack Counter.</em>
            </h1>
            <p className="shop-hero-desc">
              Three timeless Maharashtrian classics — crisp spiral Chakli, spiced pinwheel Bhakarwadi, and diamond-cut sweet Shankarpada. Freshly fried in small batches and sealed in 100g aroma pouches.
            </p>

            <div className="shop-hero-actions">
              <a href="#shelves" className="shop-hero-browse-btn">
                Explore the Collection
              </a>
              <Link to="/builder" className="shop-hero-gift-btn">
                Build a Gift Box <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="shop-hero-stage" aria-hidden="true">
            <div className="hero-stage-ledge">
              <div className="hero-stage-pack pack-chakli">
                <img src="/zakaas-chakli.jpg" alt="ZAKAAS Chakli 100g" />
              </div>
              <div className="hero-stage-pack pack-bhakarwadi">
                <img src="/zakaas-bhakarwadi.jpg" alt="ZAKAAS Bhakarwadi 100g" />
              </div>
              <div className="hero-stage-pack pack-shankarpali">
                <img src="/zakaas-shankarpali.jpg" alt="ZAKAAS Shankarpada 100g" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL EDITORIAL FILTER & SORT BAR */}
      <section className="collections-toolbar-section" id="shelves" aria-label="Product categories and sorting">
        <div className="toolbar-container">
          <div className="category-tabs" role="tablist" aria-label="Snack categories">
            {[
              { id: 'all', label: 'All Snacks' },
              { id: 'chakli', label: 'Chakli' },
              { id: 'bhakarwadi', label: 'Bhakarwadi' },
              { id: 'shankarpada', label: 'Shankarpada' },
              { id: 'gifting', label: 'Gift Boxes' },
            ].map((tab) => {
              const isActive =
                activeCategory === tab.id ||
                (tab.id === 'shankarpada' && activeCategory === 'shankarpali');
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`category-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="sort-wrap">
            <label htmlFor="collection-sort-select" className="sort-label">
              Sort by
            </label>
            <select
              id="collection-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* EDITORIAL PRODUCT GRID */}
      <main className="collections-grid-wrap" aria-live="polite">
        {activeCategory === 'gifting' ? (
          <div className="gifting-featured-container">
            <CustomGiftBoxCard isHero={true} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products-view">
            <h3>No snacks found in this category.</h3>
            <p>Switch categories to explore our signature Maharashtrian snacks.</p>
            <button onClick={() => handleCategoryChange('all')} className="hero-button">
              View All Snacks <ArrowUpRight size={15} />
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

function ArtDirectedProductCard({ product, onAdd, isAdded }) {
  const categoryKey = (product.category || product.handle || product.id || '').toLowerCase();

  const meta = useMemo(() => {
    if (categoryKey.includes('chakli')) {
      return {
        kicker: '100G POUCH · CRISPY SPIRALS',
        subtext: 'Crisp golden spirals made with wheat flour, white sesame seeds, cumin, and ajwain.',
      };
    } else if (categoryKey.includes('bhakarwadi')) {
      return {
        kicker: '100G POUCH · SPICED PINWHEELS',
        subtext: 'Crisp layered pinwheels rolled with tangy amchur, sesame, fennel, and warm spices.',
      };
    } else {
      return {
        kicker: '100G POUCH · SWEET DIAMONDS',
        subtext: 'Crisp, flaky diamond-cut sweet bites crafted with refined wheat flour and balanced sweetness.',
      };
    }
  }, [categoryKey]);

  const baseUnitPrice = getUnitPrice(product);
  const baseUnitMrp = getUnitMrp(product);
  const packVariants = useMemo(
    () =>
      product.packOptions?.length
        ? product.packOptions
        : buildPackOptions(baseUnitPrice, baseUnitMrp, product.variantId),
    [product.packOptions, baseUnitPrice, baseUnitMrp, product.variantId]
  );

  const [selectedPackId, setSelectedPackId] = useState(packVariants[0]?.id || 'pack-1');
  const selectedPack = packVariants.find((v) => v.id === selectedPackId) || packVariants[0];
  const currentPrice = Number(selectedPack?.price) || baseUnitPrice;

  const packLabel = (v) => {
    const count = Number(v.packCount) || 1;
    return count === 1 ? '1 Pack' : `${count} Packs`;
  };

  return (
    <article className="art-collection-card" aria-label={`${product.name} snack card`}>
      <Link
        to={`/products/${product.handle || product.id}`}
        className="card-pack-stage"
        aria-label={`View full details for ZAKAAS ${product.name}`}
      >
        <img
          src={product.image}
          alt={`ZAKAAS ${product.name} 100g Pack`}
          className="card-pack-img"
          loading="lazy"
        />
      </Link>

      <div className="card-body-content">
        <div className="card-top-copy">
          <span className="card-editorial-kicker">{meta.kicker}</span>
          <div className="card-header-row">
            <h2 className="card-product-title">
              <Link to={`/products/${product.handle || product.id}`}>{product.name}</Link>
            </h2>
            <span className="card-inline-price">₹{Number(currentPrice).toFixed(0)}</span>
          </div>
          <p className="card-flavor-description">
            {meta.subtext}
          </p>
        </div>

        <div className="card-controls-stack">
          {packVariants.length > 1 && (
            <div className="card-variant-selector" role="radiogroup" aria-label={`${product.name} pack size`}>
              {packVariants.map((v) => {
                const isSelected = (selectedPack?.id || selectedPack?.title) === (v.id || v.title);
                return (
                  <button
                    key={v.id || v.title}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`pack-selector-pill ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedPackId(v.id)}
                  >
                    {packLabel(v)}
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            className={`card-add-btn ${isAdded ? 'is-added' : ''}`}
            onClick={() => onAdd(product, selectedPack)}
            aria-label={`Add ${product.name} to shopping bag`}
          >
            {isAdded ? (
              <>
                <span>Added to Bag</span>
                <Check size={14} aria-hidden="true" />
              </>
            ) : (
              <span>Add to Bag · ₹{Number(currentPrice).toFixed(0)}</span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function CustomGiftBoxCard({ isHero = false }) {
  const trioPricing = calculateGiftBoxPricing(
    [{ price: UNIT_PRICE }, { price: UNIT_PRICE }, { price: UNIT_PRICE }],
    GIFT_PACKAGING_PRICE
  );

  return (
    <article className={`art-collection-card theme-gifting ${isHero ? 'is-hero-card' : ''}`} aria-label="Curate custom snack gift box">
      <Link to="/builder" className="card-pack-stage gifting-stage" aria-label="Open Gift Box Builder">
        <div className="gifting-pack-cluster">
          <img src="/zakaas-chakli.jpg" alt="Chakli" className="gift-thumb-1" loading="lazy" decoding="async" />
          <img src="/zakaas-bhakarwadi.jpg" alt="Bhakarwadi" className="gift-thumb-2" loading="lazy" decoding="async" />
          <img src="/zakaas-shankarpali.jpg" alt="Shankarpada" className="gift-thumb-3" loading="lazy" decoding="async" />
        </div>
      </Link>

      <div className="card-body-content">
        <div className="card-top-copy">
          <span className="card-editorial-kicker">BESPOKE GIFTING · 3 OR 6 PACKS</span>
          <div className="card-header-row">
            <h2 className="card-product-title">
              <Link to="/builder">Custom Gift Box</Link>
            </h2>
            <span className="card-inline-price">From ₹{Math.round(trioPricing.finalTotal)}</span>
          </div>
          <p className="card-flavor-description">
            Assemble a 3-pack Trio or 6-pack Grand Box in our festive keepsake box with a personal gift card and 15% bundle savings at checkout.
          </p>
        </div>

        <div className="card-controls-stack">
          <Link to="/builder" className="gifting-launch-btn">
            <span>Build Your Gift Box</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
