import { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';

const recipientOptions = ['Family', 'Friend', 'Festival', 'Corporate'];
const rupees = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));

export function GiftBuilder({ open, onClose, products, packaging, onAddGift }) {
  const [selected, setSelected] = useState([]);
  const [recipient, setRecipient] = useState('Family');
  const [note, setNote] = useState('');
  if (!open) return null;
  const choose = product => setSelected(current => {
    const exists = current.some(item => item.id === product.id);
    if (exists) return current.filter(item => item.id !== product.id);
    return current.length < 3 ? [...current, product] : current;
  });
  const total = selected.reduce((sum, item) => sum + Number(item.price || 0), 0) + Number(packaging?.price || 99);
  const ready = selected.length === 3 && packaging?.variantId;
  return <div className="builder-layer" role="dialog" aria-modal="true" aria-label="Build a ZAKAAS gift box">
    <button className="builder-scrim" onClick={onClose} aria-label="Close gift box builder" />
    <section className="gift-builder">
      <header className="builder-head"><div><p className="kicker">ZAKAAS GIFTING / 03 SNACKS</p><h2>BUILD A<br/><em>BOX.</em></h2></div><button onClick={onClose} aria-label="Close gift box builder"><X/></button></header>
      <div className="builder-grid">
        <div className="builder-choices"><p className="builder-step"><span>01</span> PICK ANY THREE PACKS</p><div className="builder-products">{products.slice(0, 3).map(product => { const active = selected.some(item => item.id === product.id); return <button type="button" className={`builder-product ${active ? 'is-selected' : ''}`} key={product.id} onClick={() => choose(product)}><img src={product.image} alt=""/><span>{active ? <Check/> : <Plus/>}</span><div><small>{product.personality || 'ZAKAAS ORIGINAL'}</small><b>{product.name}</b><em>{rupees(product.price)}</em></div></button>})}</div>
          <p className="builder-step"><span>02</span> THIS BOX IS FOR</p><div className="recipient-options">{recipientOptions.map(option => <button type="button" key={option} onClick={() => setRecipient(option)} className={recipient === option ? 'is-selected' : ''}>{option}</button>)}</div>
          <label className="gift-note">ADD A NOTE <textarea value={note} onChange={event => setNote(event.target.value)} placeholder="A little Maharashtra, sent with love…" maxLength="160"/></label>
        </div>
        <aside className="gift-summary"><p className="kicker">YOUR BASKET</p><div className="box-window"><div className="box-label">ZAKAAS<br/><span>MADE TO SHARE</span></div><div className="box-count">{selected.length}<small>/ 3</small></div></div><div className="box-lines">{[0,1,2].map(index => <div key={index}>{selected[index] ? <><img src={selected[index].image} alt=""/><span>{selected[index].name}</span><b>{rupees(selected[index].price)}</b></> : <><i/><span>Choose a snack pack</span></>}</div>)}<div className="pack-line"><span>Gift packaging</span><b>{rupees(packaging?.price || 99)}</b></div></div><p className="delivery-note">Shipping is calculated safely at Shopify checkout.</p><div className="gift-total"><span>BOX TOTAL</span><b>{rupees(total)}</b></div><button className="add-gift" disabled={!ready} onClick={() => onAddGift({ selected, recipient, note, packaging })}>{selected.length === 3 ? 'ADD GIFT BOX TO BAG' : `CHOOSE ${3 - selected.length} MORE PACK${3 - selected.length === 1 ? '' : 'S'}`} <Plus/></button></aside>
      </div>
    </section>
  </div>;
}
