import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Plus, Minus, ShoppingBag, Gift, Flame, ArrowRight, ArrowLeft, Eye, Lock } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Diya } from '../components/DiwaliArt';
import {
  products as fallbackProducts,
  UNIT_PRICE,
  GIFT_PACKAGING_PRICE,
  ACTIVE_GIFT_DISCOUNT,
  getUnitPrice,
  calculateGiftBoxPricing,
} from '../data/products';

const formatRupees = (value, allowDecimals = false) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: allowDecimals && Number(value) % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: allowDecimals ? 2 : 0,
  }).format(Number(value || 0));

const BOX_SIZES = [
  { slots: 3, name: 'The Trio Box', label: 'Trio · 3 × 100g' },
  { slots: 6, name: 'The Grand Box', label: 'Grand · 6 × 100g' },
];

const THEMES = [
  { id: 'warli', name: 'Royal Warli Teal & Gold', bg: '#0F4C4A', tray: '#082C2B', ink: '#F2D08A', accent: '#D9A94B', ribbon: '#D9A94B', pattern: 'warli', premium: true },
  { id: 'diya', name: 'Diya Gold & Saffron', bg: '#C98A1B', tray: '#523405', ink: '#2A1500', accent: '#FFE7A8', ribbon: '#7A1C16', pattern: 'dots' },
  { id: 'rangoli', name: 'Paithani Crimson & Gold', bg: '#8B1E16', tray: '#3D0B07', ink: '#FFF3DE', accent: '#F4B63C', ribbon: '#F4B63C', pattern: 'paithani' },
  { id: 'midnight', name: 'Midnight Akash Kandil', bg: '#1B1E3A', tray: '#0E1022', ink: '#FFE9B0', accent: '#F2A93B', ribbon: '#E85D2A', pattern: 'stars' },
  { id: 'marigold', name: 'Festive Marigold', bg: '#D9720E', tray: '#4F2602', ink: '#2B1400', accent: '#FFF1CF', ribbon: '#7A1C16', pattern: 'toran' },
];

const OCCASIONS = [
  { id: 'Diwali', headline: 'शुभ दीपावली · HAPPY DIWALI', lines: ['May your Diwali be bright, sweet and crunchy.', 'Shubh Deepavali! Sharing a little Maharashtra with you.', 'Light, laughter and snacks. Happy Diwali!'] },
  { id: 'Bhau Beej', headline: 'HAPPY BHAU BEEJ', lines: ['Happy Bhau Beej! Snacks are on me this time.', 'For my favourite sibling. Happy Bhau Beej!'] },
  { id: 'Family', headline: 'FOR THE FAMILY', lines: ['A little Maharashtra, sent with love.', 'Made to be shared, so share.'] },
  { id: 'Friends', headline: 'FOR FRIENDS', lines: ['Crunch first, questions later.', 'Just one more? Go on, have it.'] },
  { id: 'Corporate Gifting', headline: 'SEASON’S GREETINGS', lines: ['With thanks for a great year together.', 'Wishing you and your team a prosperous Diwali.'] },
];

const STEPS = [
  { num: '1', label: 'Fill tray', nextLabel: 'box sleeve', stage: 'FORMING THE TRAY' },
  { num: '2', label: 'Box sleeve', nextLabel: 'gift card', stage: 'DRESSING THE BOX' },
  { num: '3', label: 'Gift card', nextLabel: 'seal & ribbon', stage: 'TUCKING THE NOTE' },
  { num: '4', label: 'Seal & ribbon', nextLabel: '', stage: 'READY TO GIFT' },
];

const getProductImage = (p) => p?.images?.[0] || p?.image || '/zakaas-chakli.jpg';

export function BuilderPage({ products = [], packaging, onAddGift }) {
  const [params] = useSearchParams();
  const initSize = Number(params.get('size')) === 6 ? 6 : 3;
  const initStyle = THEMES.some((t) => t.id === params.get('style')) ? params.get('style') : 'rangoli';
  const [step, setStep] = useState(0);
  const [size, setSize] = useState(initSize);
  const [selected, setSelected] = useState([]);
  const [themeId, setThemeId] = useState(initStyle);
  const [occasionId, setOccasionId] = useState('Diwali');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [note, setNote] = useState('May your Diwali be bright, sweet and crunchy.');
  const [lidClosed, setLidClosed] = useState(false);
  const [added, setAdded] = useState(false);

  const stepHeadingRef = useRef(null);
  const didMountRef = useRef(false);

  const availableProducts = products.length ? products.slice(0, 3) : fallbackProducts.slice(0, 3);

  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const occasion = OCCASIONS.find((o) => o.id === occasionId) || OCCASIONS[0];

  // Sync lid state naturally with the current formation step and bring step heading into view
  useEffect(() => {
    if (step === 0 || step === 2) {
      setLidClosed(false);
    } else if (step === 3) {
      setLidClosed(true);
    }

    if (didMountRef.current && stepHeadingRef.current) {
      stepHeadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      stepHeadingRef.current.focus({ preventScroll: true });
    } else {
      didMountRef.current = true;
    }
  }, [step]);

  // Keep selected items synced with latest catalog prices if catalog updates
  useEffect(() => {
    if (!availableProducts.length) return;
    setSelected((cur) =>
      cur.map((item) => {
        const match = availableProducts.find(
          (p) => String(p.id) === String(item.id) || String(p.handle) === String(item.handle)
        );
        return match ? { ...item, price: getUnitPrice(match), name: match.name, image: getProductImage(match) } : item;
      })
    );
  }, [products]);

  // Trim packs if the user shrinks the box.
  useEffect(() => {
    setSelected((cur) => (cur.length > size ? cur.slice(0, size) : cur));
  }, [size]);

  const countOf = (p) => selected.filter((i) => String(i.id) === String(p.id)).length;
  const addPack = (p) => setSelected((cur) => (cur.length < size ? [...cur, p] : cur));
  const removePack = (p) =>
    setSelected((cur) => {
      const idx = cur.findIndex((i) => String(i.id) === String(p.id));
      if (idx < 0) return cur;
      const next = [...cur];
      next.splice(idx, 1);
      return next;
    });
  const removeSlotAt = (slotIdx) =>
    setSelected((cur) => cur.filter((_, idx) => idx !== slotIdx));
  const quickAssort = () => {
    const next = Array.from({ length: size }, (_, i) => availableProducts[i % availableProducts.length]);
    setSelected(next);
  };

  const packagingPrice = Number(packaging?.price || GIFT_PACKAGING_PRICE);
  const pricing = calculateGiftBoxPricing(selected, packagingPrice);
  const ready = selected.length === size;
  const remaining = size - selected.length;

  const canNext = step === 0 ? ready : true;

  const pickLine = (line) => setNote(line.slice(0, 180));

  const summary = useMemo(() => {
    const counts = {};
    selected.forEach((i) => { counts[i.name] = (counts[i.name] || 0) + 1; });
    return Object.entries(counts).map(([name, n]) => `${n} × ${name}`).join(', ');
  }, [selected]);

  const handleSubmit = () => {
    if (!ready) return;
    setLidClosed(true);
    setAdded(true);
    if (typeof onAddGift === 'function') {
      onAddGift({
        selected,
        recipient: occasion.id,
        note,
        packaging: packaging || { id: 'gift-box-pkg', price: GIFT_PACKAGING_PRICE, variantId: 'var-pkg' },
        attributes: [
          { key: 'Box size', value: `${BOX_SIZES.find((b) => b.slots === size).name} (${size} packs)` },
          { key: 'Box style', value: theme.name },
          ...(toName.trim() ? [{ key: 'To', value: toName.trim() }] : []),
          ...(fromName.trim() ? [{ key: 'From', value: fromName.trim() }] : []),
          { key: 'Contents', value: summary },
        ],
      });
    }
    setTimeout(() => setAdded(false), 1800);
  };

  const hasStyledSleeve = step >= 1 || Boolean(themeId);
  const showCardInside = step >= 2;

  return (
    <div className="page-builder gb">
      <header className="gb-hero">
        <div className="gb-hero-inner">
          <div>
            <p className="kicker">01 / DIWALI FARAL GIFT STUDIO</p>
            <h1>
              <span>FORM YOUR</span>
              <em>GIFT BOX.</em>
            </h1>
            <p className="gb-hero-sub">
              Slot in 3 or 6 freshly sealed Maharashtrian snack pouches (₹{UNIT_PRICE} each), dress the keepsake box (+₹{packagingPrice}), tuck in a personal Diwali card, and enjoy an automatic {ACTIVE_GIFT_DISCOUNT.percent}% bundle discount at checkout.
            </p>
          </div>
          <div className="gb-hero-badge" aria-hidden="true">
            <div className="gb-hero-diya">
              <Diya />
            </div>
            <span className="gt-deva">शुभ दीपावली</span>
            <small>AUTOMATIC 15% OFF AT CHECKOUT</small>
          </div>
        </div>
      </header>

      <main className="gb-main">
        <div className="gb-layout">
          <div className="gb-flow">
            <ol className="gb-progress" aria-label="Gift box assembly steps">
              {STEPS.map((item, i) => (
                <li key={item.label} className="gb-prog-item">
                  <button
                    type="button"
                    className={`gb-prog-btn ${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''}`}
                    onClick={() => (i <= step || ready) && setStep(i)}
                    disabled={i > step && !ready}
                  >
                    <span className="gb-prog-num">{i < step ? <Check size={11} /> : item.num}</span>
                    <span className="gb-prog-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="gb-panel">
              {step === 0 && (
                <section className="gb-step-section">
                  <header className="gb-step-header">
                    <h2 className="gb-main-heading" ref={stepHeadingRef} tabIndex={-1}>
                      Build your gift box
                    </h2>
                    <p className="gb-supporting-line">Choose your size, then add your favourites.</p>
                  </header>

                  <div className="gb-size-block">
                    <div className="gb-size-segmented" role="radiogroup" aria-label="Gift box size">
                      {BOX_SIZES.map((b) => {
                        const active = size === b.slots;
                        return (
                          <button
                            type="button"
                            role="radio"
                            aria-checked={active}
                            key={b.slots}
                            className={`gb-size-seg-btn ${active ? 'is-active' : ''}`}
                            onClick={() => setSize(b.slots)}
                          >
                            {b.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="gb-snacks-block">
                    <div className="gb-snacks-head">
                      <div className="gb-snacks-title-row">
                        <h3 className="gb-section-heading">Choose your snacks</h3>
                        <span className="gb-selection-count" aria-live="polite">
                          {selected.length} of {size} selected
                        </span>
                      </div>
                      <button type="button" className="gb-assort-link" onClick={quickAssort}>
                        Choose an assortment for me
                      </button>
                    </div>

                    <div className="gb-products">
                      {availableProducts.map((p) => {
                        const qty = countOf(p);
                        const imgSrc = getProductImage(p);
                        const unitPrice = getUnitPrice(p);
                        return (
                          <article key={p.id || p.handle} className={`gb-product ${qty > 0 ? 'is-selected' : ''}`}>
                            <div
                              className="gb-product-img"
                              onClick={() => remaining > 0 && addPack(p)}
                              role="button"
                              tabIndex={0}
                              aria-label={`Add ${p.name}`}
                              onKeyDown={(e) => {
                                if ((e.key === 'Enter' || e.key === ' ') && remaining > 0) {
                                  e.preventDefault();
                                  addPack(p);
                                }
                              }}
                            >
                              <img src={imgSrc} alt={p.name} />
                            </div>
                            <div className="gb-product-meta">
                              <h4 className="gb-product-name">{p.name}</h4>
                              <span className="gb-product-price">{formatRupees(unitPrice)}</span>
                            </div>
                            <div className="gb-stepper" aria-label={`${p.name} quantity`}>
                              <button
                                type="button"
                                onClick={() => removePack(p)}
                                disabled={!qty}
                                aria-label={`Remove one ${p.name}`}
                              >
                                <Minus size={14} />
                              </button>
                              <span aria-live="polite">{qty}</span>
                              <button
                                type="button"
                                onClick={() => addPack(p)}
                                disabled={remaining === 0}
                                aria-label={`Add one ${p.name}`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {step === 1 && (
                <section className="gb-step-section">
                  <header className="gb-step-header">
                    <h2 className="gb-main-heading" ref={stepHeadingRef} tabIndex={-1}>
                      Choose your box sleeve
                    </h2>
                    <p className="gb-supporting-line">Watch the box walls, silk-lined tray, and gold foil lid transform live on the right.</p>
                  </header>

                  <div className="gb-themes">
                    {THEMES.map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        className={`gb-theme ${themeId === t.id ? 'is-active' : ''}`}
                        onClick={() => setThemeId(t.id)}
                      >
                        <i style={{ background: t.bg, borderColor: t.accent }}>
                          <Flame size={18} color={t.accent} />
                        </i>
                        <div className="gb-theme-info">
                          <span>{t.name}</span>
                          {t.premium && <small>SIGNATURE EDITION</small>}
                        </div>
                        {themeId === t.id && <Check size={15} />}
                      </button>
                    ))}
                  </div>

                  <div className="gb-sub-block">
                    <h3 className="gb-section-heading">What are you celebrating?</h3>
                    <div className="gb-occasions">
                      {OCCASIONS.map((o) => (
                        <button
                          type="button"
                          key={o.id}
                          className={`gb-pill ${occasionId === o.id ? 'is-active' : ''}`}
                          onClick={() => setOccasionId(o.id)}
                        >
                          {o.id}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {step === 2 && (
                <section className="gb-step-section">
                  <header className="gb-step-header">
                    <h2 className="gb-main-heading" ref={stepHeadingRef} tabIndex={-1}>
                      Personalize the gift card
                    </h2>
                    <p className="gb-supporting-line">We print your note on a heavy cream &amp; gold festive card and tuck it right over the pouches.</p>
                  </header>

                  <div className="gb-names">
                    <label>
                      TO (RECIPIENT)
                      <input value={toName} onChange={(e) => setToName(e.target.value)} maxLength={30} placeholder="Aai, Priya, The Kulkarni Family…" />
                    </label>
                    <label>
                      FROM (SENDER)
                      <input value={fromName} onChange={(e) => setFromName(e.target.value)} maxLength={30} placeholder="Your name" />
                    </label>
                  </div>

                  <div className="gb-sub-block">
                    <h3 className="gb-section-heading">Festive message on card</h3>
                    <div className="gb-note">
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={180}
                        rows={4}
                        placeholder="Your message goes on a card tucked inside the box."
                      />
                      <small>{note.length} / 180</small>
                    </div>
                    <p className="gb-suggest-label">Tap a festive wish to use it:</p>
                    <div className="gb-suggest">
                      {occasion.lines.map((l) => (
                        <button type="button" key={l} onClick={() => pickLine(l)}>
                          “{l}”
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section className="gb-step-section">
                  <header className="gb-step-header gb-step-header-split">
                    <div>
                      <h2 className="gb-main-heading" ref={stepHeadingRef} tabIndex={-1}>
                        Your gift box is ready
                      </h2>
                      <p className="gb-supporting-line">Review your selections and pricing breakdown before adding your sealed box to the bag.</p>
                    </div>
                    <span className="gb-sealed-pill"><Lock size={12} /> RIBBON SEALED</span>
                  </header>

                  <dl className="gb-review">
                    <div><dt>Box Size</dt><dd>{BOX_SIZES.find((b) => b.slots === size).name} ({size} × 100g packs)</dd></div>
                    <div><dt>Pouches</dt><dd>{summary || 'No packs selected'}</dd></div>
                    <div><dt>Box Sleeve</dt><dd>{theme.name}</dd></div>
                    <div><dt>Occasion</dt><dd>{occasion.id}</dd></div>
                    <div><dt>Addressed To</dt><dd>{toName || '—'}</dd></div>
                    <div><dt>Sent From</dt><dd>{fromName || '—'}</dd></div>
                    <div><dt>Card Note</dt><dd>{note ? `“${note}”` : '—'}</dd></div>
                  </dl>
                  <div className="gb-price">
                    <div>
                      <span>Snack Subtotal ({size} × 100g pouches @ {formatRupees(UNIT_PRICE)})</span>
                      <b>{formatRupees(pricing.snackSubtotal)}</b>
                    </div>
                    <div>
                      <span>Gift Box Packaging, Card &amp; Ribbon Charge</span>
                      <b>{formatRupees(pricing.packagingCharge)}</b>
                    </div>
                    <div>
                      <span>Box Subtotal (Before Checkout Discount)</span>
                      <b>{formatRupees(pricing.grossTotal)}</b>
                    </div>
                    {pricing.eligibleForDiscount && (
                      <div className="gb-price-discount">
                        <span>
                          Automatic {pricing.discountPercent}% Bundle Discount (3+ packs · applied at checkout)
                        </span>
                        <b>−{formatRupees(pricing.discountAmount, true)}</b>
                      </div>
                    )}
                    <div className="gb-price-total">
                      <span>Estimated Checkout Total</span>
                      <b>{formatRupees(pricing.finalTotal, true)}</b>
                    </div>
                  </div>
                  <p className="gb-ship">
                    ✦ {ACTIVE_GIFT_DISCOUNT.summaryNote} Ships pan-India in a protective outer carton.
                  </p>
                </section>
              )}

              <div className="gb-action-area">
                {step === 0 ? (
                  <div className="gb-action-progress">
                    <div className="gb-progress-bar" aria-hidden="true">
                      <span
                        className="gb-progress-fill"
                        style={{ width: `${Math.min(100, (selected.length / size) * 100)}%` }}
                      />
                    </div>
                    <p className="gb-progress-note" aria-live="polite">
                      {ready
                        ? `All ${size} packs selected · Snacks ${formatRupees(pricing.snackSubtotal)} + Box ${formatRupees(pricing.packagingCharge)} − 15% checkout discount = ${formatRupees(pricing.finalTotal, true)}`
                        : `Add ${remaining} more ${remaining === 1 ? 'pack' : 'packs'} to complete your box.`}
                    </p>
                  </div>
                ) : (
                  <button type="button" className="gb-back" onClick={() => setStep(step - 1)}>
                    <ArrowLeft size={15} /> Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    className="gb-next"
                    onClick={() => canNext && setStep(step + 1)}
                    disabled={!canNext}
                  >
                    Continue to {STEPS[step].nextLabel} <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`gb-next gb-add ${added ? 'is-added' : ''}`}
                    onClick={handleSubmit}
                    disabled={!ready}
                  >
                    {added ? (
                      <>Gift Box Added to Bag <Check size={15} /></>
                    ) : (
                      <>Add Gift Box to Bag · {formatRupees(pricing.finalTotal, true)} <ShoppingBag size={15} /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* INTERACTIVE LIVE BOX FORMATION STAGE */}
          <aside className="gb-preview-col">
            <div className="gb-preview">
              <div className="gb-preview-head">
                <div className="gb-preview-stage-tag">
                  <Gift size={15} />
                  <span>{STEPS[step]?.stage || 'LIVE BOX STUDIO'}</span>
                </div>
                <button
                  type="button"
                  className="gb-lid-toggle"
                  onClick={() => setLidClosed((c) => !c)}
                >
                  <Eye size={13} />
                  {lidClosed ? 'Open Lid & Peek Inside' : 'Close Lid & Preview Seal'}
                </button>
              </div>

              {/* Assembly Blueprint Checklist Bar */}
              <div className="gb-blueprint-bar" aria-label="Box formation checklist">
                <span className={`gb-bp-chip ${selected.length > 0 ? 'is-on' : ''} ${ready ? 'is-complete' : ''}`}>
                  1. Tray ({selected.length}/{size})
                </span>
                <span className={`gb-bp-chip ${hasStyledSleeve ? 'is-complete' : ''}`}>
                  2. {theme.id.toUpperCase()} Box
                </span>
                <span className={`gb-bp-chip ${showCardInside ? 'is-complete' : ''}`}>
                  3. Gift Card
                </span>
                <span className={`gb-bp-chip ${lidClosed ? 'is-complete' : ''}`}>
                  4. {lidClosed ? 'Sealed' : 'Open'}
                </span>
              </div>

              {/* 3D Layered Physical Box */}
              <div
                className={`gb-box-stage ${lidClosed ? 'is-sealed' : 'is-open'} size-${size} pattern-${theme.pattern}`}
                style={{
                  '--gb-bg': theme.bg,
                  '--gb-tray': theme.tray,
                  '--gb-ink': theme.ink,
                  '--gb-accent': theme.accent,
                  '--gb-ribbon': theme.ribbon,
                }}
              >
                {/* Outer Box Rim & Velvet Cushion Tray */}
                <div className="gb-box-chassis">
                  <div className="gb-box-inner-wall">
                    <div className="gb-tray-header">
                      <span>ZAKAAS FESTIVE KEEPSAKE BOX</span>
                      <span>{size} × 100G COMPARTMENTS</span>
                    </div>

                    <div className={`gb-slots-grid slots-${size}`}>
                      {Array.from({ length: size }).map((_, i) => {
                        const item = selected[i];
                        return (
                          <div
                            key={i}
                            className={`gb-slot-cell ${item ? 'is-filled' : 'is-empty'}`}
                            onClick={() => item && step === 0 && removeSlotAt(i)}
                            title={item && step === 0 ? `Click to remove ${item.name}` : undefined}
                          >
                            {item ? (
                              <div className="gb-slot-pouch">
                                <img src={getProductImage(item)} alt={item.name} />
                                <span className="gb-slot-pouch-label">{item.name.replace('ZAKAAS ', '').split(' (')[0]}</span>
                                {step === 0 && <span className="gb-slot-remove">×</span>}
                              </div>
                            ) : (
                              <div className="gb-slot-placeholder">
                                <span className="gb-slot-num">SLOT 0{i + 1}</span>
                                <span className="gb-slot-hint">+ Select pack</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Tucked Festive Postcard Overlay */}
                    {showCardInside && (
                      <div className={`gb-tucked-card ${step === 2 ? 'is-highlighted' : ''}`}>
                        <div className="gb-card-seal">✦ शुभ दीपावली ✦</div>
                        <div className="gb-card-body">
                          {toName && <p className="gb-card-to">Dearest {toName},</p>}
                          <p className="gb-card-msg">“{note || 'Wishing you joy, light and crunch!'}”</p>
                          {fromName && <p className="gb-card-from">— With love, {fromName}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hinged Box Lid with Festive Art & Gold Ribbon */}
                <div className="gb-box-lid-3d" onClick={() => setLidClosed((c) => !c)}>
                  <div className="gb-lid-ornament-border">
                    <span className="gb-lid-corner tl">✦</span>
                    <span className="gb-lid-corner tr">✦</span>
                    <span className="gb-lid-corner bl">✦</span>
                    <span className="gb-lid-corner br">✦</span>

                    {/* Ribbon Cross */}
                    <div className="gb-ribbon-h" />
                    <div className="gb-ribbon-v" />
                    <div className="gb-ribbon-bow">
                      <span className="bow-loop left" />
                      <span className="bow-loop right" />
                      <span className="bow-knot" />
                    </div>

                    {/* Center Royal Crest */}
                    <div className="gb-lid-plaque">
                      <span className="gb-lid-kicker">॥ झकास दिवाळी फराळ ॥</span>
                      <p className="gb-lid-brand">ZAKAAS</p>
                      <p className="gb-lid-head">{occasion.headline}</p>
                      {toName && <p className="gb-lid-to">PREPARED FOR {toName.toUpperCase()}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="gb-preview-foot">
                <div className="gb-preview-meta">
                  <span>{selected.length}/{size} pouches slotted (+₹{packagingPrice} box)</span>
                  <small>
                    {ready
                      ? `Includes 15% checkout discount (−${formatRupees(pricing.discountAmount, true)})`
                      : theme.name}
                  </small>
                </div>
                <b>{ready ? formatRupees(pricing.finalTotal, true) : formatRupees(pricing.grossTotal)}</b>
              </div>
            </div>
            <Link className="gb-singles" to="/collections">← Or shop individual 100g snack pouches</Link>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
