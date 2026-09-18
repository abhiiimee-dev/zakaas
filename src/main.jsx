import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight } from 'lucide-react';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { ProductSection } from './components/ProductSection';
import { StoryFilm } from './components/StoryFilm';
import { GiftBuilder } from './components/GiftBuilder';
import { addCartLines, createCart, getProductByHandle, getProducts, shopifyConfigured, updateCartLines, removeCartLines } from './lib/shopify';
import { products as fallbackProducts } from './data/products';
import './app.css';
import './story-pan.css';
import './origin-art.css';
const cities=[['MUMBAI',155,225],['PUNE',270,205],['NASHIK',285,145],['KOLHAPUR',260,290],['NAGPUR',510,160]];
function Hero(){return <section className="hero-film" id="top"><img src="/zakaas-hero.png" alt="ZAKAAS snack packs at a Maharashtra home"/><div className="hero-wash"/><div className="hero-content"><p className="kicker hero-kicker">EST. IN MAHARASHTRA · MADE FOR EVERYWHERE</p><h1><span>MAHARASHTRA.</span><em>IN EVERY BITE.</em></h1><p className="hero-lede">Traditional flavours.<br/>Reimagined for now.</p><a className="hero-button" href="#shop">SHOP ZAKAAS <ArrowUpRight/></a></div><div className="hero-taste-mark" aria-hidden="true"><i>★</i><span>CRUNCH · SPICE · HOME ·</span></div><div className="hero-meta"><span>SCROLL TO SNACK</span><span>18.5204° N, 73.8567° E</span></div></section>}
function Map(){return <section className="origin" id="maharashtra"><img className="origin-art" src="/zakaas-maharashtra-map.png" alt="Illustrated map of Maharashtra showing Mumbai, Pune, Nashik, Kolhapur and Nagpur"/><div className="origin-content"><p className="kicker">04 / FIVE CITIES, ONE HUNGER</p><h2>WHERE THE<br/><em>FLAVOUR LIVES.</em></h2><div className="origin-note"><span>FROM HERE,</span><b>TO<br/>EVERYWHERE.</b><p>Made with the rhythm, spice, and full-volume warmth of home.</p></div></div></section>}
function Promise(){const data=[['01','AUTHENTIC TASTE','Flavours rooted in Maharashtra.'],['02','QUALITY YOU CAN TRUST','Ingredients we’d happily serve at home.'],['03','MADE FOR TODAY','Traditional taste. Modern packaging.'],['04','MAHARASHTRA, EVERYWHERE','From Maharashtra to wherever you are.']];return <section className="manifesto"><div><p className="kicker">05 / THE ZAKAAS STANDARD</p><h2>NO SHORTCUTS.<br/><em>NO SMALL FEELING.</em></h2></div><div>{data.map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>}
function Rest({onBuildBox}){return <><section className="gifting" id="gifting"><p className="kicker">06 / A BOX WITH A BACKSTORY</p><h2>SEND A LITTLE<br/><em>MAHARASHTRA.</em></h2><div>{['FOR FAMILY','FOR FRIENDS','FOR FESTIVALS'].map((x,i)=><a href="#business" key={x}><span>0{i+1}</span><b>{x}</b><ArrowUpRight/></a>)}<button type="button" className="gift-link" onClick={onBuildBox}><span>04</span><b>BUILD A BOX</b><ArrowUpRight/></button></div></section><section className="b2b" id="business"><div><p className="kicker">07 / BIG MOMENTS, BETTER SNACKS</p><h2>ZAKAAS FOR<br/><em>BUSINESS.</em></h2><p>Corporate gifting, weddings, events and retail. Make your next gesture one people actually remember.</p><a href="mailto:hello@zakaas.in" className="hero-button">ENQUIRE FOR BULK ORDERS <ArrowUpRight/></a></div><ul>{['CORPORATE','WEDDINGS','EVENTS','RETAIL'].map(x=><li key={x}>{x}</li>)}</ul></section><section className="journal"><div><p className="kicker">08 / THE ZAKAAS JOURNAL</p><h2>MORE THAN<br/><em>A SNACK.</em></h2></div><div>{['WHY EVERY MAHARASHTRIAN FAMILY HAS THAT SNACK TIN.','THE BHAKARWADI DEBATE.','WHAT IT FEELS LIKE TO TASTE HOME AFTER MOVING AWAY.'].map((x,i)=><a href="#story" key={x}><span>0{i+1} / CULTURE</span><h3>{x}</h3><ArrowUpRight/></a>)}</div></section><section className="final-frame"><p>JAGAHA BADLI.</p><p className="final-second">SWAD NAHI.</p><img src="/zakaas-logo.png" alt="ZAKAAS"/><small>MAHARASHTRA IN EVERY BITE</small></section><footer><img src="/zakaas-logo.png" alt="ZAKAAS"/><p>MAHARASHTRA IN EVERY BITE.</p><div><a href="#shop">Shop</a><a href="#story">Our Story</a><a href="#gifting">Gifting</a><a href="#business">B2B</a></div><small>© 2026 ZAKAAS. ALL TASTE RESERVED.</small></footer></>}
function App(){const[items,setItems]=useState([]),[cart,setCart]=useState(false),[menu,setMenu]=useState(false),[toast,setToast]=useState(''),[catalog,setCatalog]=useState(fallbackProducts),[cartData,setCartData]=useState(null),[builder,setBuilder]=useState(false),[packaging,setPackaging]=useState(null);useEffect(()=>{if(shopifyConfigured){getProducts().then(setCatalog).catch(()=>setToast('Shopify catalog could not load — showing collection preview.'));getProductByHandle('zakaas-gift-packaging').then(setPackaging).catch(()=>{})}},[]);const add=async p=>{setItems(x=>[...x,p]);setCart(true);setToast(`${p.name} added to bag`);setTimeout(()=>setToast(''),1800);if(!p.variantId)return;try{const next=cartData?await addCartLines(cartData.id,[{merchandiseId:p.variantId,quantity:1}]):await createCart([{merchandiseId:p.variantId,quantity:1}]);setCartData(next)}catch{setToast('Shopify bag could not update. Please try again.')}};const addGift=async({selected,recipient,note,packaging:giftPackaging})=>{const packagingLine={merchandiseId:giftPackaging.variantId,quantity:1,attributes:[{key:'Gift box',value:'Build a Box'},{key:'For',value:recipient},...(note?[{key:'Gift note',value:note}]:[])]};const lines=[...selected.map(p=>({merchandiseId:p.variantId,quantity:1})),packagingLine];try{const next=cartData?await addCartLines(cartData.id,lines):await createCart(lines);setCartData(next);setItems(x=>[...x,...selected,{...giftPackaging,name:'ZAKAAS Gift Box'}]);setBuilder(false);setCart(true);setToast('Your ZAKAAS gift box is in the bag.')}catch{setToast('Your gift box could not be added. Please try again.')}};const change=async(p,d)=>{
  const currentQuantity=items.filter(x=>x.id===p.id).length;
  const nextQuantity=currentQuantity+d;
  if(nextQuantity<0)return;

  setItems(x=>{
    if(d>0)return [...x,p];
    const index=x.findIndex(z=>z.id===p.id);
    return index===-1?x:x.filter((_,i)=>i!==index);
  });

  if(!cartData)return;

  try{
    const shopifyLine=cartData.lines?.nodes?.find(
      line=>line.merchandise?.id===p.variantId
    );

    if(!shopifyLine)return;

    const next=d>0
      ?await updateCartLines(cartData.id,[{id:shopifyLine.id,quantity:nextQuantity}])
      :nextQuantity===0
        ?await removeCartLines(cartData.id,[shopifyLine.id])
        :await updateCartLines(cartData.id,[{id:shopifyLine.id,quantity:nextQuantity}]);

    setCartData(next);
  }catch{
    setToast('Shopify bag could not update. Please try again.');
  }
};const checkout=()=>{if(!cartData?.checkoutUrl){setToast("Shopify checkout URL is missing");return}window.open(cartData.checkoutUrl,"_blank")};return <><Header cartCount={items.length} onCartOpen={()=>setCart(true)} menuOpen={menu} setMenuOpen={setMenu}/><main><Hero/><ProductSection onAdd={add} products={catalog} live={shopifyConfigured}/><StoryFilm/><Map/><Promise/><Rest onBuildBox={()=>setBuilder(true)}/></main><CartDrawer open={cart} items={items} onClose={()=>setCart(false)} onChange={change} onCheckout={checkout} checkoutReady={Boolean(cartData?.checkoutUrl)}/><GiftBuilder open={builder} onClose={()=>setBuilder(false)} products={catalog} packaging={packaging} onAddGift={addGift}/>{toast&&<div className="toast">{toast}</div>}</>};createRoot(document.getElementById('root')).render(<App/>);
