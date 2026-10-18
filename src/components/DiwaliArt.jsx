const RANGOLI_DOTS = Array.from({ length: 32 }, (_, i) => i);
const RANGOLI_16 = Array.from({ length: 16 }, (_, i) => i * 22.5);
const RANGOLI_8 = Array.from({ length: 8 }, (_, i) => i * 45);

/* Hand-drawn style floor rangoli, drawn as layered lotus petals and dot rings. */
export function Rangoli() {
  return (
    <svg className="gt-rangoli" viewBox="0 0 200 200" role="presentation">
      <defs>
        <radialGradient id="rg-saffron" cx="50%" cy="100%" r="100%"><stop offset="0" stopColor="#F4B63C" /><stop offset="1" stopColor="#E0700E" /></radialGradient>
        <radialGradient id="rg-pink" cx="50%" cy="100%" r="100%"><stop offset="0" stopColor="#E0558C" /><stop offset="1" stopColor="#A81F5E" /></radialGradient>
        <radialGradient id="rg-green" cx="50%" cy="100%" r="100%"><stop offset="0" stopColor="#4FA36B" /><stop offset="1" stopColor="#1F6B3E" /></radialGradient>
        <filter id="rg-grain"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" /></filter>
      </defs>
      <g filter="url(#rg-grain)">
        {RANGOLI_DOTS.map((i) => (
          <circle key={i} cx="100" cy="6" r="2.4" fill="#FFFDF6" transform={`rotate(${i * (360 / 32)} 100 100)`} />
        ))}
        {RANGOLI_16.map((a) => (
          <ellipse key={`o${a}`} cx="100" cy="30" rx="9.5" ry="22" fill="url(#rg-saffron)" stroke="#FFFDF6" strokeWidth="1.6" transform={`rotate(${a} 100 100)`} />
        ))}
        {RANGOLI_16.map((a) => (
          <ellipse key={`g${a}`} cx="100" cy="42" rx="5" ry="10" fill="url(#rg-green)" stroke="#FFFDF6" strokeWidth="1" transform={`rotate(${a + 11.25} 100 100)`} />
        ))}
        {RANGOLI_8.map((a) => (
          <ellipse key={`p${a}`} cx="100" cy="50" rx="11" ry="20" fill="url(#rg-pink)" stroke="#FFFDF6" strokeWidth="1.6" transform={`rotate(${a} 100 100)`} />
        ))}
        {RANGOLI_8.map((a) => (
          <ellipse key={`w${a}`} cx="100" cy="62" rx="4.5" ry="9" fill="#FFFDF6" transform={`rotate(${a + 22.5} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="30" fill="#FFFDF6" />
        <circle cx="100" cy="100" r="25" fill="#7A1C16" />
        {RANGOLI_8.map((a) => (
          <circle key={`d${a}`} cx="100" cy="82" r="2.2" fill="#F4B63C" transform={`rotate(${a} 100 100)`} />
        ))}
      </g>
    </svg>
  );
}

/* Clay diya with shaded bowl, oil, wick and a layered, flickering flame. */
export function Diya() {
  return (
    <svg className="gt-diya" viewBox="0 -30 140 130" role="presentation">
      <defs>
        <linearGradient id="dy-clay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E08A4A" /><stop offset="0.55" stopColor="#B4521F" /><stop offset="1" stopColor="#6B2A0E" /></linearGradient>
        <linearGradient id="dy-side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="rgba(0,0,0,0.28)" /><stop offset="0.35" stopColor="rgba(255,255,255,0.14)" /><stop offset="1" stopColor="rgba(0,0,0,0.35)" /></linearGradient>
        <radialGradient id="dy-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="rgba(255,190,70,0.75)" /><stop offset="0.5" stopColor="rgba(255,150,40,0.25)" /><stop offset="1" stopColor="rgba(255,150,40,0)" /></radialGradient>
        <radialGradient id="dy-oil" cx="50%" cy="40%" r="60%"><stop offset="0" stopColor="#FFB84D" /><stop offset="1" stopColor="#6A2E08" /></radialGradient>
        <linearGradient id="dy-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#FFF6C8" /><stop offset="0.35" stopColor="#FFC73A" /><stop offset="0.8" stopColor="#F26A0B" /><stop offset="1" stopColor="#D8380A" /></linearGradient>
      </defs>
      <ellipse cx="72" cy="94" rx="52" ry="7" fill="rgba(0,0,0,0.28)" />
      <circle className="gt-diya-glow" cx="70" cy="2" r="46" fill="url(#dy-glow)" />
      <path d="M8 48 C14 86 40 96 70 96 C100 96 126 86 132 48 Z" fill="url(#dy-clay)" />
      <path d="M8 48 C14 86 40 96 70 96 C100 96 126 86 132 48 Z" fill="url(#dy-side)" />
      <path d="M2 40 C-2 44 2 50 10 50 L22 46 Z" fill="#B4521F" />
      <ellipse cx="70" cy="46" rx="62" ry="13" fill="#C9632B" />
      <ellipse cx="70" cy="46" rx="62" ry="13" fill="none" stroke="rgba(255,220,170,0.55)" strokeWidth="1.2" />
      <ellipse cx="70" cy="47" rx="54" ry="9.5" fill="url(#dy-oil)" />
      <ellipse cx="62" cy="45" rx="14" ry="2.6" fill="rgba(255,235,170,0.55)" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx={34 + i * 12} cy={68 + Math.sin((i / 6) * Math.PI) * 9} r="2.1" fill="#F4C96A" opacity="0.9" />
      ))}
      <path d="M44 62 Q70 74 96 62" fill="none" stroke="#F4C96A" strokeWidth="1.3" opacity="0.8" />
      <rect x="68.2" y="30" width="3.6" height="17" rx="1.6" fill="#2A1608" />
      <g className="gt-diya-flame">
        <path d="M70 34 C54 22 60 6 70 -22 C80 6 86 22 70 34 Z" fill="url(#dy-flame)" />
        <path d="M70 33 C62 25 65 14 70 2 C75 14 78 25 70 33 Z" fill="#FFE98A" opacity="0.9" />
        <ellipse cx="70" cy="31" rx="3.2" ry="5" fill="#5A7FE0" opacity="0.55" />
      </g>
    </svg>
  );
}

/* Traditional Maharashtrian Akash Kandil (Diwali lantern) with golden glow & ribbons. */
export function Kandil({ variant = 'crimson' }) {
  const isGold = variant === 'gold';
  const mainStart = isGold ? '#F4B63C' : '#C8281E';
  const mainEnd = isGold ? '#C96D12' : '#7A1C16';
  const sideColor = isGold ? '#B85D0E' : '#5E130E';

  return (
    <svg className="diwali-kandil" viewBox="0 0 110 210" role="presentation">
      <defs>
        <radialGradient id={`kd-glow-${variant}`} cx="50%" cy="42%" r="50%">
          <stop offset="0" stopColor="rgba(255, 200, 70, 0.65)" />
          <stop offset="0.55" stopColor="rgba(255, 140, 30, 0.2)" />
          <stop offset="1" stopColor="rgba(255, 140, 30, 0)" />
        </radialGradient>
        <linearGradient id={`kd-body-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={mainStart} />
          <stop offset="1" stopColor={mainEnd} />
        </linearGradient>
      </defs>
      {/* Warm Halo */}
      <circle cx="55" cy="78" r="52" fill={`url(#kd-glow-${variant})`} />
      {/* Hanging Cord & Brass Ring */}
      <line x1="55" y1="0" x2="55" y2="26" stroke="#7A1C16" strokeWidth="2" />
      <circle cx="55" cy="26" r="4" fill="none" stroke="#D9A94B" strokeWidth="2" />
      {/* Top Crown */}
      <polygon points="36,30 74,30 82,42 28,42" fill="#7A1C16" stroke="#D9A94B" strokeWidth="1.5" />
      {/* Lantern Octagonal Body */}
      <polygon points="28,42 82,42 96,76 82,110 28,110 14,76" fill={`url(#kd-body-${variant})`} stroke="#D9A94B" strokeWidth="1.8" />
      {/* Side Facets */}
      <polygon points="28,42 42,42 36,76 42,110 28,110 14,76" fill={sideColor} opacity="0.55" stroke="#D9A94B" strokeWidth="1" />
      <polygon points="82,42 68,42 74,76 68,110 82,110 96,76" fill={sideColor} opacity="0.55" stroke="#D9A94B" strokeWidth="1" />
      {/* Inner Illuminated Jali Diamond */}
      <polygon points="55,50 71,76 55,102 39,76" fill="#FFF3C4" stroke="#D9A94B" strokeWidth="1.5" />
      <polygon points="55,58 65,76 55,94 45,76" fill="#FFB52E" opacity="0.7" />
      <circle cx="55" cy="76" r="5" fill="#FFFDF6" />
      {/* Bottom Base */}
      <polygon points="28,110 82,110 72,122 38,122" fill="#7A1C16" stroke="#D9A94B" strokeWidth="1.5" />
      {/* Flowing Streamers / Tails */}
      <g className="kandil-tails">
        <path d="M40,122 C37,152 43,176 38,202" stroke="#D9381E" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M47,122 C46,154 50,178 46,205" stroke="#F4B63C" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M55,122 C55,156 55,182 55,208" stroke="#FFD966" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M63,122 C64,154 60,178 64,205" stroke="#F4B63C" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M70,122 C73,152 67,176 72,202" stroke="#D9381E" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}


