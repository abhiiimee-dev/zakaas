import { useEffect, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { CulturalInterruption } from './components/CulturalInterruption';
import { BrandStory } from './components/BrandStory';
import { MaharashtraRemixed } from './components/MaharashtraRemixed';
import { GiftingSection } from './components/GiftingSection';
import { B2BSection } from './components/B2BSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { GiftBuilder } from './components/GiftBuilder';
import {
  shopifyConfigured,
  getProducts,
  getProductByHandle,
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from './lib/shopify';
import { products as fallbackProducts } from './data/products';
import './app.css';

function mapShopifyLinesToState(cart, catalog = []) {
  if (!cart?.lines?.nodes) return [];
  return cart.lines.nodes.map((node) => {
    const variant = node.merchandise;
    const matchedProduct = catalog.find(
      (p) => p.variantId === variant?.id || p.handle === variant?.product?.handle
    );
    return {
      lineId: node.id,
      id: matchedProduct?.id || variant?.id || node.id,
      merchandiseId: variant?.id,
      name: variant?.product?.title || matchedProduct?.name || 'Zakaas Pack',
      price: variant?.price?.amount || matchedProduct?.price || '180',
      currencyCode: variant?.price?.currencyCode || 'INR',
      quantity: node.quantity,
      image:
        variant?.product?.featuredImage?.url ||
        matchedProduct?.image ||
        '/zakaas-hero.png',
      personality: matchedProduct?.personality || 'ZAKAAS ORIGINAL',
      attributes: node.attributes || [],
    };
  });
}

function App() {
  const [catalog, setCatalog] = useState(fallbackProducts);
  const [packaging, setPackaging] = useState(null);
  const [cartLines, setCartLines] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [addingId, setAddingId] = useState(null);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((current) => (current === message ? '' : current));
    }, 2800);
  };

  // Load Shopify products and packaging variant
  useEffect(() => {
    if (shopifyConfigured) {
      getProducts()
        .then((items) => {
          if (items && items.length > 0) {
            setCatalog(items);
          }
        })
        .catch(() => {
          showToast('Shopify catalog preview mode active.');
        });

      getProductByHandle('zakaas-gift-packaging')
        .then(setPackaging)
        .catch(() => {});
    }
  }, []);

  // Add individual product pack to bag
  const handleAddProduct = async (product) => {
    setAddingId(product.id);
    setTimeout(() => setAddingId(null), 1200);

    if (shopifyConfigured && product.variantId) {
      setIsUpdatingCart(true);
      try {
        let updatedCart;
        if (cartData?.id) {
          // Check if variant is already present
          const existing = cartLines.find((line) => line.merchandiseId === product.variantId);
          if (existing?.lineId) {
            updatedCart = await updateCartLines(cartData.id, [
              { id: existing.lineId, quantity: existing.quantity + 1 },
            ]);
          } else {
            updatedCart = await addCartLines(cartData.id, [
              { merchandiseId: product.variantId, quantity: 1 },
            ]);
          }
        } else {
          updatedCart = await createCart([
            { merchandiseId: product.variantId, quantity: 1 },
          ]);
        }

        setCartData(updatedCart);
        setCartLines(mapShopifyLinesToState(updatedCart, catalog));
        setCartOpen(true);
        showToast(`${product.name} added to your bag.`);
      } catch (err) {
        showToast(err.message || 'Could not update bag. Please try again.');
      } finally {
        setIsUpdatingCart(false);
      }
    } else {
      // Fallback local cart handling
      setCartLines((current) => {
        const existingIdx = current.findIndex((item) => item.id === product.id);
        if (existingIdx > -1) {
          const next = [...current];
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: (next[existingIdx].quantity || 1) + 1,
          };
          return next;
        }
        return [
          ...current,
          {
            ...product,
            lineId: `line_${Date.now()}_${product.id}`,
            quantity: 1,
          },
        ];
      });
      setCartOpen(true);
      showToast(`${product.name} added to your bag.`);
    }
  };

  // Synchronized quantity changes: cartLinesUpdate or cartLinesRemove
  const handleUpdateQuantity = async (line, newQuantity) => {
    if (shopifyConfigured && cartData?.id && line.lineId) {
      setIsUpdatingCart(true);
      try {
        let updatedCart;
        if (newQuantity <= 0) {
          updatedCart = await removeCartLines(cartData.id, [line.lineId]);
          showToast(`${line.name} removed from bag.`);
        } else {
          updatedCart = await updateCartLines(cartData.id, [
            { id: line.lineId, quantity: newQuantity },
          ]);
        }
        setCartData(updatedCart);
        setCartLines(mapShopifyLinesToState(updatedCart, catalog));
      } catch (err) {
        showToast('Quantity update could not be synced with Shopify.');
      } finally {
        setIsUpdatingCart(false);
      }
    } else {
      // Fallback mode
      setCartLines((current) => {
        if (newQuantity <= 0) {
          return current.filter((item) => (item.lineId || item.id) !== (line.lineId || line.id));
        }
        return current.map((item) => {
          if ((item.lineId || item.id) === (line.lineId || line.id)) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      });
    }
  };

  // Synchronized item removal: cartLinesRemove
  const handleRemoveLine = async (line) => {
    await handleUpdateQuantity(line, 0);
  };

  // Add customized gift box with line item attributes
  const handleAddGiftBox = async ({ selected, recipient, note, packaging: giftPkg }) => {
    const packagingVariantId = giftPkg?.variantId || packaging?.variantId;
    
    if (shopifyConfigured && packagingVariantId) {
      setIsUpdatingCart(true);
      try {
        const packagingLine = {
          merchandiseId: packagingVariantId,
          quantity: 1,
          attributes: [
            { key: 'Gift box', value: 'Build a Box' },
            { key: 'For', value: recipient },
            ...(note ? [{ key: 'Gift note', value: note }] : []),
          ],
        };

        const snackLines = selected.map((p) => ({
          merchandiseId: p.variantId,
          quantity: 1,
          attributes: [{ key: 'Bundle', value: `Zakaas Box for ${recipient}` }],
        }));

        const linesToSubmit = [...snackLines, packagingLine];
        const updatedCart = cartData?.id
          ? await addCartLines(cartData.id, linesToSubmit)
          : await createCart(linesToSubmit);

        setCartData(updatedCart);
        setCartLines(mapShopifyLinesToState(updatedCart, catalog));
        setBuilderOpen(false);
        setCartOpen(true);
        showToast('Your custom Zakaas gift box is in the bag.');
      } catch (err) {
        showToast('Gift box could not be added to Shopify checkout.');
      } finally {
        setIsUpdatingCart(false);
      }
    } else {
      // Fallback local cart handling
      const giftBoxLine = {
        id: `gift_box_${Date.now()}`,
        lineId: `line_gift_${Date.now()}`,
        name: `Zakaas Gift Box (3 Packs)`,
        price: (
          selected.reduce((sum, item) => sum + Number(item.price || 0), 0) +
          Number(giftPkg?.price || 99)
        ).toString(),
        quantity: 1,
        image: '/zakaas-hero.png',
        personality: 'CUSTOM PRESENTATION BOX',
        attributes: [
          { key: 'For', value: recipient },
          { key: 'Packs', value: selected.map((s) => s.name).join(', ') },
          ...(note ? [{ key: 'Gift note', value: note }] : []),
        ],
      };
      setCartLines((current) => [...current, giftBoxLine]);
      setBuilderOpen(false);
      setCartOpen(true);
      showToast('Your custom Zakaas gift box is in the bag.');
    }
  };

  const handleCheckout = () => {
    if (cartData?.checkoutUrl) {
      window.location.assign(cartData.checkoutUrl);
    } else {
      showToast('Connecting you to secure checkout…');
    }
  };

  const totalQuantity = cartLines.reduce((sum, line) => sum + (line.quantity || 1), 0);

  return (
    <div className="site-wrapper">
      {/* 01 NAVIGATION */}
      <Header
        cartCount={totalQuantity}
        onCartOpen={() => setCartOpen(true)}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main>
        {/* 02 HERO */}
        <Hero onShopClick={() => setCartOpen(false)} />

        {/* 03-06 PRODUCT INTRO, SHANKARPALI, CHAKLI, BHAKARVADI */}
        <ProductSection
          onAdd={handleAddProduct}
          products={catalog}
          live={shopifyConfigured}
          addingId={addingId}
        />

        {/* 07 CULTURAL INTERRUPTION */}
        <CulturalInterruption />

        {/* 08 SHORT BRAND STORY */}
        <BrandStory />

        {/* 09 MAHARASHTRA, REMIXED */}
        <MaharashtraRemixed />

        {/* 10 GIFTING */}
        <GiftingSection onOpenBuilder={() => setBuilderOpen(true)} />

        {/* 11 B2B */}
        <B2BSection />
      </main>

      {/* 12 FOOTER */}
      <Footer />

      {/* SHOPPING BAG DRAWER */}
      <CartDrawer
        open={cartOpen}
        lines={cartLines}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveLine={handleRemoveLine}
        onCheckout={handleCheckout}
        checkoutReady={Boolean(cartData?.checkoutUrl || !shopifyConfigured)}
        isUpdating={isUpdatingCart}
      />

      {/* BUILD-A-BOX GIFT DRAWER */}
      <GiftBuilder
        open={builderOpen}
        onClose={() => setBuilderOpen(false)}
        products={catalog}
        packaging={packaging}
        onAddGift={handleAddGiftBox}
      />

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span className="toast-dot" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);


