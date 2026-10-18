/* Festive fairy lights for the home page: draped swags of glowing bulbs under the nav,
   plus curtain-light strands down both sides. Purely decorative inline SVG. */
const COLORS = ['#FFC24A', '#FF7A1A', '#FFE9A8', '#E8412A'];

// Point on the quadratic swag (0,3) -> (80,52) -> (160,3)
const swagPoint = (t) => {
  const x = 2 * (1 - t) * t * 80 + t * t * 160;
  const y = (1 - t) * (1 - t) * 3 + 2 * (1 - t) * t * 52 + t * t * 3;
  return [x, y];
};
const SWAG_T = [0.07, 0.19, 0.31, 0.43, 0.57, 0.69, 0.81, 0.93];

function Bulb({ x, y, color, i }) {
  return (
    <g className={`dd-bulb dd-tw-${i % 3}`}>
      <circle cx={x} cy={y + 9} r="13" fill={color} opacity="0.28" filter="url(#dd-blur)" />
      <rect x={x - 2.2} y={y - 1} width="4.4" height="5" rx="1" fill="#5A3A12" />
      <ellipse cx={x} cy={y + 9} rx="4.2" ry="6.2" fill={color} />
      <ellipse cx={x - 1.3} cy={y + 7} rx="1.2" ry="2.2" fill="#fff" opacity="0.7" />
    </g>
  );
}

function Swag({ k }) {
  return (
    <svg className="dd-swag" width="160" height="66" viewBox="0 0 160 66">
      <path d="M0 3 Q80 52 160 3" fill="none" stroke="#3A1E0C" strokeWidth="1.6" />
      {SWAG_T.map((t, i) => {
        const [x, y] = swagPoint(t);
        return <Bulb key={t} x={x} y={y} color={COLORS[(i + k) % COLORS.length]} i={i + k} />;
      })}
    </svg>
  );
}

function Curtain({ side, offset, count, k }) {
  const h = count * 30 + 10;
  return (
    <svg className={`dd-curtain dd-curtain-${side}`} style={{ [side === 'l' ? 'left' : 'right']: offset }} width="30" height={h} viewBox={`0 0 30 ${h}`}>
      <line x1="15" y1="0" x2="15" y2={h - 6} stroke="#3A1E0C" strokeWidth="1.4" />
      {Array.from({ length: count }).map((_, i) => (
        <Bulb key={i} x={15} y={4 + i * 30} color={COLORS[(i + k) % COLORS.length]} i={i + k} />
      ))}
    </svg>
  );
}

export function DiwaliDecor() {
  return (
    <div className="dd-wrap" aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }} focusable="false">
        <defs><filter id="dd-blur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" /></filter></defs>
      </svg>
      <div className="dd-swags">
        {Array.from({ length: 18 }).map((_, k) => <Swag key={k} k={k} />)}
      </div>
      <Curtain side="l" offset="1.6vw" count={9} k={0} />
      <Curtain side="l" offset="4.4vw" count={6} k={2} />
      <Curtain side="l" offset="7.2vw" count={3} k={1} />
      <Curtain side="r" offset="1.6vw" count={9} k={3} />
      <Curtain side="r" offset="4.4vw" count={6} k={1} />
      <Curtain side="r" offset="7.2vw" count={3} k={2} />
    </div>
  );
}
