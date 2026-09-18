import { Search, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SearchModal({ open, onClose, products = [] }) {
  const [query, setQuery] = useState('');

  if (!open) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.personality?.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  return (
    <div className="search-modal-overlay">
      <div className="search-modal-content">
        <div className="search-modal-head">
          <div className="search-input-wrap">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="SEARCH CHAKLI, BHAKARWADI, SHANKARPADA..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button onClick={onClose} aria-label="Close search">
            <X />
          </button>
        </div>

        <div className="search-modal-body">
          <p className="search-kicker">
            {query ? `RESULTS FOR "${query.toUpperCase()}" (${results.length})` : 'POPULAR SNACKS'}
          </p>

          <div className="search-results-grid">
            {results.map((product) => (
              <Link
                key={product.id || product.handle}
                to={`/products/${product.handle || product.id}`}
                onClick={onClose}
                className="search-result-item"
              >
                <img src={product.image} alt={product.name} />
                <div>
                  <small>{product.personality || 'MAHARASHTRA CLASSIC'}</small>
                  <h3>{product.name}</h3>
                  <p>₹{Number(product.price || 200).toFixed(0)}</p>
                </div>
                <ArrowUpRight className="search-arrow" />
              </Link>
            ))}
            {results.length === 0 && (
              <p className="no-search-results">
                No ZAKAAS snacks found matching "{query}". Try searching for Chakli, Bhakarwadi or Shankarpali.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
