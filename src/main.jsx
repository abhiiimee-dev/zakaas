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
  removeCartLines,
  resolveShopifyVariantId,
  KNOWN_SHOPIFY_VARIANTS,
} from './lib/shopify';
import { startRazorpayCheckout } from './lib/razorpay';
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

function PaymentSuccessModal({ details, onClose }) {
  if (!details) return null;
  return (
    <div className="payment-success-overlay" role="dialog" aria-modal="true">
      <div className="payment-success-card">
        <div className="success-badge-icon">✓</div>
        <h2>PAYMENT SUCCESSFUL!</h2>
        <p className="success-sub">
          Your order with ZAKAAS is confirmed. We are packing your traditional Maharashtrian savouries fresh from the kettle.
        </p>
        <div className="payment-receipt-box">
          <div className="receipt-row">
            <span>Payment ID</span>
            <code>{details.paymentId}</code>
          </div>
          <div className="receipt-row">
            <span>Order ID</span>
            <code>{details.orderId}</code>
          </div>
          <div className="receipt-row">
            <span>Amount Paid</span>
            <b>₹{Number(details.amount).toFixed(0)}</b>
          </div>
          <div className="receipt-row">
            <span>Payment Method</span>
            <span>Razorpay Standard Checkout (Verified)</span>
          </div>
        </div>
        <button type="button" className="hero-button full-width" onClick={onClose}>
          CONTINUE TO STOREFRONT
        </button>
      </div>
    </div>
  );
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
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    if (shopifyConfigured) {
      getProducts()
        .then(setCatalog)
        .catch(() => showToast('Shopify catalog preview loaded.'));

      getProductByHandle('zakaas-gift-packaging')
        .then(setPackaging)
        .catch(() => {});
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 3000);
  };

  const handleAdd = async (product, customQty) => {
    const qty = customQty || product.quantity || 1;
    const newItems = Array.from({ length: qty }, () => ({ ...product }));
    setItems((prev) => [...prev, ...newItems]);
    setCartOpen(true);
    showToast(`${product.name} added to bag`);

    // Dispatch pulse event for header bag icon
    window.dispatchEvent(new CustomEvent('zakaas:add-to-bag'));

    const variantId = resolveShopifyVariantId(product);
    if (!variantId || !shopifyConfigured) return;

    try {
      const next = cartData
        ? await addCartLines(cartData.id, [{ merchandiseId: variantId, quantity: qty }])
        : await createCart([{ merchandiseId: variantId, quantity: qty }]);
      setCartData(next);
    } catch (err) {
      console.warn('Shopify cart sync warning:', err);
      // Attempt fresh cart if previous session expired
      try {
        const fresh = await createCart([{ merchandiseId: variantId, quantity: qty }]);
        setCartData(fresh);
      } catch {
        // Will sync on checkout
      }
    }
  };

  const handleAddGift = async ({ selected, recipient, note, packaging: giftPackaging }) => {
    const pkg = giftPackaging || packaging || {
      id: 'gift-box-pkg',
      price: 99,
      variantId: KNOWN_SHOPIFY_VARIANTS['zakaas-gift-packaging'],
    };
    const pkgVariantId = resolveShopifyVariantId(pkg);

    const packagingLine = {
      merchandiseId: pkgVariantId,
      quantity: 1,
      attributes: [
        { key: 'Gift box', value: 'Build a Box' },
        { key: 'For', value: recipient || 'Gift' },
        ...(note ? [{ key: 'Gift note', value: note }] : []),
      ],
    };

    const lines = [
      ...selected.map((p) => ({ merchandiseId: resolveShopifyVariantId(p), quantity: 1 })),
      packagingLine,
    ];

    setItems((prev) => [
      ...prev,
      ...selected,
      {
        id: pkg.id || 'gift-box-pkg',
        name: 'ZAKAAS Custom Gift Packaging',
        price: pkg.price || 99,
        image: '/zakaas-logo.png',
        personality: 'CUSTOM GIFT BOX',
        variantId: pkgVariantId,
      },
    ]);
    setBuilderOpen(false);
    setCartOpen(true);
    showToast('ZAKAAS Gift Box added to bag.');

    if (!shopifyConfigured) return;

    try {
      const next = cartData ? await addCartLines(cartData.id, lines) : await createCart(lines);
      setCartData(next);
    } catch (err) {
      console.warn('Gift cart sync warning:', err);
      try {
        const fresh = await createCart(lines);
        setCartData(fresh);
      } catch {
        // Will sync on checkout
      }
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

    if (!cartData || !shopifyConfigured) return;

    const variantId = resolveShopifyVariantId(product);

    try {
      const shopifyLine = cartData.lines?.nodes?.find(
        (line) => line.merchandise?.id === variantId
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
      console.warn('Shopify bag update failed in background.');
    }
  };

  /**
   * Seamless Shopify Checkout
   * Creates cart on the fly if needed and redirects directly to checkoutUrl
   */
  const handleShopifyCheckout = async () => {
    if (!items.length) {
      showToast('Your bag is empty.');
      return;
    }

    setCheckoutLoading(true);
    showToast('Connecting to Shopify checkout…');

    try {
      // 1. If we already have a valid checkoutUrl, redirect directly
      if (cartData?.checkoutUrl) {
        window.location.href = cartData.checkoutUrl;
        return;
      }

      // 2. Otherwise create a Shopify cart on demand using current bag items
      const countByVariant = {};
      for (const item of items) {
        const vid = resolveShopifyVariantId(item);
        if (vid) {
          countByVariant[vid] = (countByVariant[vid] || 0) + 1;
        }
      }

      const lines = Object.entries(countByVariant).map(([merchandiseId, quantity]) => ({
        merchandiseId,
        quantity,
      }));

      if (!lines.length) {
        lines.push({ merchandiseId: KNOWN_SHOPIFY_VARIANTS.chakli, quantity: items.length || 1 });
      }

      const cart = await createCart(lines);
      setCartData(cart);

      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      } else {
        throw new Error('Shopify checkout URL could not be generated.');
      }
    } catch (err) {
      console.error('Shopify checkout error:', err);
      showToast(`Shopify checkout: ${err.message || 'Please try again.'}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  /**
   * Razorpay Standard Web Checkout
   * Creates order via /api/create-order, displays modal, and verifies signature via /api/verify-payment
   */
  const handleRazorpayCheckout = async () => {
    if (!items.length) {
      showToast('Your bag is empty.');
      return;
    }

    const totalAmount = items.reduce((sum, item) => sum + Number(item.price || 150), 0);

    setCheckoutLoading(true);
    showToast('Opening payment gateway…');

    try {
      await startRazorpayCheckout({
        amountInRupees: totalAmount,
        items,
        onSuccess: (result) => {
          setPaymentSuccess(result);
          setItems([]);
          setCartData(null);
          setCartOpen(false);
          showToast(`Payment verified! ID: ${result.paymentId}`);
        },
        onFailure: (err) => {
          showToast(`Payment error: ${err.message || 'Payment not completed'}`);
        },
        onDismiss: () => {
          showToast('Payment window closed');
        },
      });
    } catch (err) {
      console.error('Razorpay checkout error:', err);
      showToast(`Payment error: ${err.message || 'Could not start payment'}`);
    } finally {
      setCheckoutLoading(false);
    }
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
              catalog={catalog}
              products={catalog}
              onAdd={handleAdd}
              onBuildBox={() => setBuilderOpen(true)}
              live={shopifyConfigured}
              cartData={cartData}
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
        <Route
          path="/product/:handle"
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
              onShopifyCheckout={handleShopifyCheckout}
              checkoutLoading={checkoutLoading}
              checkoutReady={Boolean(cartData?.checkoutUrl || items.length > 0)}
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
        onShopifyCheckout={handleShopifyCheckout}
        checkoutLoading={checkoutLoading}
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

      <PaymentSuccessModal
        details={paymentSuccess}
        onClose={() => setPaymentSuccess(null)}
      />

      {toast && <div className="toast">{toast}</div>}
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
