import { ArrowUpRight, Plus, Check } from 'lucide-react';
import { products as fallbackProducts } from '../data/products';

const formatRupees = (val) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(val || 0));

export function ProductSection({ onAdd, products = fallbackProducts, live = false, addingId = null }) {
  // Ensure we find or map Shankarpali, Chakli, Bhakarvadi
  const items = products.length ? products : fallbackProducts;
  const shankarpali = items.find((p) => p.handle?.includes('shankarpali') || p.id?.includes('shankarpali')) || items[0];
  const chakli = items.find((p) => p.handle?.includes('chakli') || p.id?.includes('chakli')) || items[1] || items[0];
  const bhakarvadi = items.find((p) => p.handle?.includes('bhakar') || p.id?.includes('bhakar')) || items[2] || items[0];

  return (
    <section className="originals-showcase" id="shop">
      {/* 03 PRODUCT INTRO */}
      <div className="originals-intro">
        <div className="intro-header">
          <p className="kicker">03 / THE ORIGINALS {live && '· LIVE SHOPIFY CATALOG'}</p>
          <h2 className="display-title">
            NOT SOUVENIRS.<br />
            <em>SERIOUS SNACKS.</em>
          </h2>
        </div>
        <div className="intro-side">
          <p className="intro-lede">
            Three Maharashtra staples. Zero timid flavours. Packed for the way people actually snack:
            straight from the bag, loud, and unshared.
          </p>
          <div className="intro-meta-strip">
            <span>PACKED FRESH</span>
            <span>·</span>
            <span>NO COMPROMISES</span>
            <span>·</span>
            <span>100% REAL CRUNCH</span>
          </div>
        </div>
      </div>

      {/* 04 SHANKARPALI */}
      <article className="product-stage stage-shankarpali" id="shankarpali">
        <div className="stage-text">
          <div className="stage-top-meta">
            <span className="editorial-num">04</span>
            <span className="editorial-tag">ZAKAAS ORIGINAL NO. 01</span>
          </div>
          <p className="product-punchline">JUST ONE MORE.</p>
          <h3 className="product-headline">{shankarpali?.name || 'Zakaas Shankarpali'}</h3>
          <p className="product-desc">
            {shankarpali?.description ||
              'Golden fried diamonds dusted in delicate sugar. Crisp, airy, and notoriously impossible to put down once the pack is torn open.'}
          </p>
          <div className="product-spec-row">
            <span>DIAMOND CUT</span>
            <span>GHEE CRUNCH</span>
            <span>SUBTLY SWEET</span>
          </div>
          <div className="stage-action-bar">
            <div className="price-tag">
              <small>PRICE</small>
              <strong>{formatRupees(shankarpali?.price || 180)}</strong>
            </div>
            <button
              type="button"
              className="editorial-add-btn"
              onClick={() => onAdd(shankarpali)}
              disabled={addingId === shankarpali?.id}
            >
              {addingId === shankarpali?.id ? (
                <>
                  <Check size={16} /> ADDED
                </>
              ) : (
                <>
                  <Plus size={16} /> ADD SHANKARPALI
                </>
              )}
            </button>
          </div>
        </div>

        <div className="stage-visual">
          <div className="visual-frame">
            <div className="visual-watermark" aria-hidden="true">01</div>
            <img
              src={shankarpali?.image || '/zakaas-shankarpali.jpg'}
              alt={shankarpali?.name || 'Zakaas Shankarpali pack'}
              loading="lazy"
            />
            <div className="visual-badge">
              <span>MAHARASHTRA CLASSIC</span>
              <b>SWEET CRUNCH</b>
            </div>
          </div>
        </div>
      </article>

      {/* 05 CHAKLI */}
      <article className="product-stage stage-chakli" id="chakli">
        <div className="stage-visual">
          <div className="visual-frame">
            <div className="visual-watermark" aria-hidden="true">02</div>
            <img
              src={chakli?.image || '/zakaas-chakli.jpg'}
              alt={chakli?.name || 'Zakaas Chakli pack'}
              loading="lazy"
            />
            <div className="visual-badge dark">
              <span>DECIBEL SIGNATURE</span>
              <b>CRUNCH FIRST</b>
            </div>
          </div>
        </div>

        <div className="stage-text">
          <div className="stage-top-meta">
            <span className="editorial-num">05</span>
            <span className="editorial-tag">ZAKAAS ORIGINAL NO. 02</span>
          </div>
          <p className="product-punchline">CRUNCH FIRST.</p>
          <h3 className="product-headline">{chakli?.name || 'Zakaas Chakli'}</h3>
          <p className="product-desc">
            {chakli?.description ||
              'Crisp spirals packed with roasted cumin, carom seeds, and Maharashtrian spices. The unmistakable acoustic signature of real home snacking.'}
          </p>
          <div className="product-spec-row">
            <span>SPIRAL GEOMETRY</span>
            <span>AJWAIN & CUMIN</span>
            <span>HIGH DECIBEL</span>
          </div>
          <div className="stage-action-bar">
            <div className="price-tag">
              <small>PRICE</small>
              <strong>{formatRupees(chakli?.price || 195)}</strong>
            </div>
            <button
              type="button"
              className="editorial-add-btn red"
              onClick={() => onAdd(chakli)}
              disabled={addingId === chakli?.id}
            >
              {addingId === chakli?.id ? (
                <>
                  <Check size={16} /> ADDED
                </>
              ) : (
                <>
                  <Plus size={16} /> ADD CHAKLI
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* 06 BHAKARVADI */}
      <article className="product-stage stage-bhakarvadi" id="bhakarvadi">
        <div className="stage-text">
          <div className="stage-top-meta">
            <span className="editorial-num">06</span>
            <span className="editorial-tag">ZAKAAS ORIGINAL NO. 03</span>
          </div>
          <p className="product-punchline">THIS WON'T LAST LONG.</p>
          <h3 className="product-headline">{bhakarvadi?.name || 'Zakaas Bhakarvadi'}</h3>
          <p className="product-desc">
            {bhakarvadi?.description ||
              'Ami konala nai ghabrat. Rolled tight with roasted dry coconut, poppy seeds, sesame, and signature Maharashtrian heat. Sweet, tangy, fiery.'}
          </p>
          <div className="product-spec-row">
            <span>PINWHEEL SPIRAL</span>
            <span>COCONUT & SESAME</span>
            <span>SWEET-FIERY PUNCH</span>
          </div>
          <div className="stage-action-bar">
            <div className="price-tag">
              <small>PRICE</small>
              <strong>{formatRupees(bhakarvadi?.price || 210)}</strong>
            </div>
            <button
              type="button"
              className="editorial-add-btn"
              onClick={() => onAdd(bhakarvadi)}
              disabled={addingId === bhakarvadi?.id}
            >
              {addingId === bhakarvadi?.id ? (
                <>
                  <Check size={16} /> ADDED
                </>
              ) : (
                <>
                  <Plus size={16} /> ADD BHAKARVADI
                </>
              )}
            </button>
          </div>
        </div>

        <div className="stage-visual">
          <div className="visual-frame">
            <div className="visual-watermark" aria-hidden="true">03</div>
            <img
              src={bhakarvadi?.image || '/zakaas-bhakarwadi.jpg'}
              alt={bhakarvadi?.name || 'Zakaas Bhakarvadi pack'}
              loading="lazy"
            />
            <div className="visual-badge">
              <span>SIGNATURE HEAT</span>
              <b>AMI KONALA NAI GHABRAT</b>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

