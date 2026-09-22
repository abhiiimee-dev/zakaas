import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { GiftBuilder } from './components/GiftBuilder';
import { SearchModal } from './components/SearchModal';

import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { B2bPage } from './pages/B2bPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { CartPage } from './pages/CartPage';
import { BuilderPage } from './pages/BuilderPage';

import {
  addCartLines,
  createCart,
  getProductByHandle,
  getProducts,
  shopifyConfigured,
  updateCartLines,
  removeCartLines
} from './lib/shopify';
import { products as fallbackProducts } from './data/products';

import './app.css';
import './story-pan.css';
import './origin-art.css';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

function App() {
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [catalog, setCatalog] = useState(fallbackProducts);
  const [cartData, setCartData] = useState(null);
  const [packaging, setPackaging] = useState(null);

  useEffect(() => {
    if (shopifyConfigured) {
      getProducts()
        .then(setCatalog)
        .catch(() => showToast('Shopify catalog could not load — showing preview.'));

      getProductByHandle('zakaas-gift-packaging')
        .then(setPackaging)
        .catch(() => {});
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2200);
  };

  const handleAdd = async (product, customQty) => {
    const qty = customQty || product.quantity || 1;
    const newItems = Array.from({ length: qty }, () => ({ ...product }));
    setItems((prev) => [...prev, ...newItems]);
    setCartOpen(true);
    showToast(`${product.name} added to bag`);

    // Dispatch pulse event for header bag icon
    window.dispatchEvent(new CustomEvent('zakaas:add-to-bag'));

    if (!product.variantId) return;

    try {
      const next = cartData
        ? await addCartLines(cartData.id, [{ merchandiseId: product.variantId, quantity: qty }])
        : await createCart([{ merchandiseId: product.variantId, quantity: qty }]);
      setCartData(next);
    } catch {
      showToast('Shopify bag update failed.');
    }
  };

  const handleAddGift = async ({ selected, recipient, note, packaging: giftPackaging }) => {
    const pkg = giftPackaging || packaging || { id: 'gift-box-pkg', price: 99, variantId: 'var-packaging' };
    const packagingLine = {
      merchandiseId: pkg.variantId || 'var-packaging',
      quantity: 1,
      attributes: [
        { key: 'Gift box', value: 'Build a Box' },
        { key: 'For', value: recipient },
        ...(note ? [{ key: 'Gift note', value: note }] : []),
      ],
    };

    const lines = [
      ...selected.map((p) => ({ merchandiseId: p.variantId || p.id, quantity: 1 })),
      packagingLine,
    ];

    try {
      if (shopifyConfigured && pkg.variantId) {
        const next = cartData ? await addCartLines(cartData.id, lines) : await createCart(lines);
        setCartData(next);
      }
      setItems((prev) => [
        ...prev,
        ...selected,
        { id: pkg.id || 'gift-box-pkg', name: 'ZAKAAS Custom Gift Packaging', price: pkg.price || 99, image: '/zakaas-logo.png', personality: 'CUSTOM GIFT BOX' },
      ]);
      setBuilderOpen(false);
      setCartOpen(true);
      showToast('ZAKAAS Gift Box added to bag.');
    } catch {
      showToast('ZAKAAS Gift Box added to bag.');
      setItems((prev) => [
        ...prev,
        ...selected,
        { id: pkg.id || 'gift-box-pkg', name: 'ZAKAAS Custom Gift Packaging', price: pkg.price || 99, image: '/zakaas-logo.png', personality: 'CUSTOM GIFT BOX' },
      ]);
      setBuilderOpen(false);
      setCartOpen(true);
    }
  };

  const handleChange = async (product, delta) => {
    const currentQty = items.filter((x) => x.id === product.id).length;
    const nextQty = currentQty + delta;
    if (nextQty < 0) return;

    setItems((prev) => {
      if (delta > 0) return [...prev, product];
      const idx = prev.findIndex((z) => z.id === product.id);
      return idx === -1 ? prev : prev.filter((_, i) => i !== idx);
    });

    if (!cartData) return;

    try {
      const shopifyLine = cartData.lines?.nodes?.find(
        (line) => line.merchandise?.id === product.variantId
      );

      if (!shopifyLine) return;

      const next =
        delta > 0
          ? await updateCartLines(cartData.id, [{ id: shopifyLine.id, quantity: nextQty }])
          : nextQty === 0
          ? await removeCartLines(cartData.id, [shopifyLine.id])
          : await updateCartLines(cartData.id, [{ id: shopifyLine.id, quantity: nextQty }]);

      setCartData(next);
    } catch {
      showToast('Shopify bag update failed.');
    }
  };

  const handleCheckout = () => {
    if (!cartData?.checkoutUrl) {
      showToast('Shopify checkout URL is missing');
      return;
    }
    window.open(cartData.checkoutUrl, '_blank');
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header
        cartCount={items.length}
        onCartOpen={() => setCartOpen(true)}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={catalog}
              onAdd={handleAdd}
              onBuildBox={() => setBuilderOpen(true)}
              live={shopifyConfigured}
            />
          }
        />
        <Route
          path="/collections"
          element={<CollectionsPage products={catalog} onAdd={handleAdd} />}
        />
        <Route
          path="/products/:handle"
          element={<ProductDetailPage products={catalog} onAdd={handleAdd} cartData={cartData} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/b2b" element={<B2bPage />} />
        <Route path="/policies" element={<PoliciesPage />} />
        <Route
          path="/builder"
          element={
            <BuilderPage
              products={catalog}
              packaging={packaging}
              onAddGift={handleAddGift}
            />
          }
        />
        <Route
          path="/build-a-box"
          element={
            <BuilderPage
              products={catalog}
              packaging={packaging}
              onAddGift={handleAddGift}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              items={items}
              onChange={handleChange}
              onCheckout={handleCheckout}
              checkoutReady={Boolean(cartData?.checkoutUrl)}
              cartData={cartData}
            />
          }
        />
      </Routes>

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onChange={handleChange}
        onCheckout={handleCheckout}
        checkoutReady={Boolean(cartData?.checkoutUrl)}
      />

      <GiftBuilder
        open={builderOpen}
        onClose={() => setBuilderOpen(false)}
        products={catalog}
        packaging={packaging}
        onAddGift={handleAddGift}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={catalog}
      />

      {toast && <div className="toast">{toast}</div>}
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
