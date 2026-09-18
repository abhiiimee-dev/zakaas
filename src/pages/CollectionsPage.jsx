import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Plus, Check, ArrowUpRight, Filter } from 'lucide-react';
import { Footer } from '../components/Footer';

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

    if (activeCategory !== 'all') {
      const cat = activeCategory.toLowerCase();
      list = list.filter((p) => {
        const itemCat = (p.category || p.handle || p.name || '').toLowerCase();
        return itemCat.includes(cat) || (cat === 'shankarpada' && itemCat.includes('shankarpali'));
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
    }, 1500);
  };

  return (
    <div className="page-collections">
      <div className="collections-hero">
        <p className="kicker">01 / OUR FULL COLLECTION</p>
        <h1>
          <span>MAHARASHTRIAN</span>
          <em>SNACK STOREFRONT.</em>
        </h1>
        <p className="collections-intro">
          Handcrafted spirals, golden crunch, and melt-in-mouth sweetness. Handled with care, sealed for freshness.
        </p>
      </div>

      <div className="collections-toolbar">
        <div className="category-tabs">
          {[
            { id: 'all', label: 'ALL SNACKS' },
            { id: 'chakli', label: 'CHAKLI' },
            { id: 'bhakarwadi', label: 'BHAKARWADI' },
            { id: 'shankarpada', label: 'SHANKARPADA' },
            { id: 'gifting', label: 'GIFT BOXES' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`category-tab ${activeCategory === tab.id ? 'is-active' : ''}`}
              onClick={() => handleCategoryChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="sort-wrap">
          <Filter className="sort-icon" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort products">
            <option value="featured">Featured Order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      <main className="collections-grid-wrap">
        {filteredProducts.length === 0 ? (
          <div className="no-products-view">
            <h3>No snacks found in this category.</h3>
            <p>Explore our full collection or check out our bestsellers.</p>
            <button onClick={() => handleCategoryChange('all')} className="hero-button">
              VIEW ALL SNACKS <ArrowUpRight />
            </button>
          </div>
        ) : (
          <div className="collections-grid">
            {filteredProducts.map((product) => (
              <CollectionProductCard
                key={product.id || product.handle}
                product={product}
                onAdd={handleAddToCart}
                isAdded={addedIds[product.id]}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function CollectionProductCard({ product, onAdd, isAdded }) {
  const variants = product.variants || [
    { id: `var-250`, title: '250g Pack', price: product.price, variantId: product.variantId }
  ];
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);

  const displayPrice = selectedVariant?.price || product.price || 220;

  return (
    <article className="collection-card">
      <Link to={`/products/${product.handle || product.id}`} className="collection-card-image-wrap">
        <img src={product.image} alt={product.name} />
        <span className="card-badge">{product.personality || 'MAHARASHTRA CLASSIC'}</span>
      </Link>

      <div className="collection-card-body">
        <div className="card-title-row">
          <h3>
            <Link to={`/products/${product.handle || product.id}`}>{product.name}</Link>
          </h3>
          <span className="card-price">₹{Number(displayPrice).toFixed(0)}</span>
        </div>

        <p className="card-line">“{product.line || product.description || 'Traditional Maharashtrian snack.'}”</p>

        {variants.length > 1 && (
          <div className="variant-select-pills">
            {variants.map((v) => (
              <button
                key={v.id || v.variantId || v.title}
                type="button"
                className={`variant-pill ${selectedVariant?.id === v.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedVariant(v)}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}

        <div className="card-action-row">
          <button
            type="button"
            className={`product-add ${isAdded ? 'is-added' : ''}`}
            onClick={() => onAdd(product, selectedVariant)}
          >
            {isAdded ? (
              <>ADDED TO BAG <Check /></>
            ) : (
              <>ADD TO BAG <Plus /></>
            )}
          </button>
          <Link to={`/products/${product.handle || product.id}`} className="view-details-btn" aria-label={`View details for ${product.name}`}>
            <ArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
