import { useEffect, useRef } from 'react';

const FIREWORK_PALETTE = [
  ['#FFD966', '#FFB300', '#FFF7D6'], // Gold & Sparkler White
  ['#FF7A1A', '#FFAB40', '#FFE082'], // Marigold & Saffron
  ['#E8412A', '#FF8A65', '#FFD54F'], // Kumkum Red & Amber
];

export function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId = null;
    const particles = [];
    const rockets = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const createBurst = (x, y, palette, count = 56, isGrand = false) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.18;
        const speed = (isGrand ? 3.5 : 2.2) + Math.random() * (isGrand ? 6.5 : 4.8);
        const color = palette[Math.floor(Math.random() * palette.length)];
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.012,
          size: 1.8 + Math.random() * 2.2,
          color,
          trail: [{ x, y }],
          glitter: Math.random() > 0.45,
        });
      }
    };

    const launchCelebration = (detail = {}) => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isGrand = Boolean(detail.grand);

      const targets = isGrand
        ? [
            { x: w * 0.25, y: h * 0.28, delay: 0 },
            { x: w * 0.5, y: h * 0.22, delay: 140 },
            { x: w * 0.75, y: h * 0.26, delay: 280 },
            { x: w * 0.38, y: h * 0.34, delay: 460 },
            { x: w * 0.64, y: h * 0.3, delay: 620 },
          ]
        : [
            { x: w * 0.72, y: h * 0.24, delay: 0 },
            { x: w * 0.42, y: h * 0.28, delay: 160 },
            { x: w * 0.84, y: h * 0.34, delay: 320 },
          ];

      targets.forEach((t, idx) => {
        setTimeout(() => {
          const palette = FIREWORK_PALETTE[idx % FIREWORK_PALETTE.length];
          rockets.push({
            x: t.x + (Math.random() - 0.5) * 60,
            y: h * 0.92,
            tx: t.x,
            ty: t.y,
            vy: -13 - Math.random() * 3,
            palette,
            isGrand,
            trail: [],
          });
          startLoop();
        }, t.delay);
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        r.x += (r.tx - r.x) * 0.08;
        r.y += r.vy;
        r.vy *= 0.98;

        // Draw rocket tail
        ctx.save();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          const a = (j + 1) / r.trail.length;
          ctx.fillStyle = `rgba(255, 215, 110, ${a * 0.85})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8 * a, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        if (r.y <= r.ty || Math.abs(r.vy) < 2) {
          createBurst(r.x, r.y, r.palette, r.isGrand ? 68 : 52, r.isGrand);
          rockets.splice(i, 1);
        }
      }

      // Update burst particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        p.vx *= 0.965;
        p.vy = p.vy * 0.965 + 0.085; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        // Sparkle trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha * 0.45);
          ctx.lineWidth = p.size * 0.7;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Glowing head
        const flicker = p.glitter ? 0.65 + Math.random() * 0.35 : 1;
        ctx.globalAlpha = Math.max(0, p.alpha * flicker);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (rockets.length > 0 || particles.length > 0) {
        animId = requestAnimationFrame(tick);
      } else {
        animId = null;
      }
    };

    const startLoop = () => {
      if (!animId) animId = requestAnimationFrame(tick);
    };

    const onAddBag = () => launchCelebration({ grand: false });
    const onAddGift = () => launchCelebration({ grand: true });

    window.addEventListener('zakaas:add-to-bag', onAddBag);
    window.addEventListener('zakaas:fireworks', onAddGift);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('zakaas:add-to-bag', onAddBag);
      window.removeEventListener('zakaas:fireworks', onAddGift);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="zakaas-fireworks-canvas"
      aria-hidden="true"
    />
  );
}
