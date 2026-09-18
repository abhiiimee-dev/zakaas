import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const scenes = [
  ['03 / THE HOME KITCHEN ARCHIVES', 'MAHARASHTRA\nHAS A TASTE.', 'BEFORE PACKETS. BEFORE SHELVES. BEFORE BRANDS.\nTHERE WAS THE KITCHEN.', 'wide'],
  ['THE FIRST STEP', 'FIRST,\nTHE DOUGH.', 'Hands, patience, and a kitchen that knew every measurement without a scale.', 'hands'],
  ['THE FLAVOUR', 'THEN,\nTHE MASALA.', 'The kind that arrives before the snack does. Warm. Sharp. Unmistakably home.', 'spice'],
  ['THE MOMENT', 'THEN\nTHE CRUNCH.', 'Dough turns to spirals. Spirals turn into the sound everyone comes running for.', 'crunch'],
  ['THE RULE', 'ONE BATCH\nWAS NEVER ENOUGH.', 'Fresh on the tray. Someone reaches in. Someone says, “Bas, one more batch.”', 'family'],
  ['THEN → NOW', 'OLD SOUL.\nNEW PACK.', 'The same feeling, packed for wherever life takes you.', 'now'],
];

export function StoryFilm(){
  const root = useRef(null); const [active, setActive] = useState(0);
  useEffect(() => { const update = () => { if (!root.current) return; const box = root.current.getBoundingClientRect(); const progress = Math.max(0, Math.min(1, -box.top / (box.height - window.innerHeight))); setActive(Math.min(scenes.length - 1, Math.floor(progress * scenes.length))); }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <section className="story-film" id="story" ref={root}><div className="story-sticky"><div className="film-image">{scenes.map((scene, i) => <div key={scene[0]} className={`film-frame ${scene[3]} ${active === i ? 'is-active' : ''}`}><img src="/zakaas-story-film.png" alt=""/></div>)}<div className="film-grain"/></div><div className="film-content"><div className="film-count">0{active + 1} <i/> 06</div><div className="film-text" key={active}><p className="kicker">{scenes[active][0]}</p><h2>{scenes[active][1].split('\n').map(line => <span key={line}>{line}</span>)}</h2><p>{scenes[active][2]}</p>{active === scenes.length - 1 && <a className="light-button" href="#shop">DISCOVER ZAKAAS <ArrowUpRight/></a>}</div></div><div className="film-progress"><i style={{height: `${((active + 1) / scenes.length) * 100}%`}}/></div></div></section>;
}
