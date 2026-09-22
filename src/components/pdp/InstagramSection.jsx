import { useState, useEffect } from 'react';
import { ArrowUpRight, Play, Film, X, ExternalLink } from 'lucide-react';

export const ZAKAAS_REELS = [
  {
    id: 'Dc5tgRvPge-',
    title: 'Aur kuch khaoge sirrr 😋!!!!',
    tag: '#KitchenCraft',
    image: '/reels/reel-1.jpg',
    duration: '0:32',
    url: 'https://www.instagram.com/p/Dc5tgRvPge-/',
    caption: 'Behind the scenes at Zakaas kitchen — raw ingredients, fresh spirals, and authentic flavours.'
  },
  {
    id: 'DdEbKJqvbmZ',
    title: 'Not just snacks. An authentic Maharashtrian ritual.',
    tag: '#AuthenticTradition',
    image: '/reels/reel-2.jpg',
    duration: '0:24',
    url: 'https://www.instagram.com/p/DdEbKJqvbmZ/',
    caption: 'More than a snack, it is a feeling. Crisp, spiced, and rooted in tradition.'
  },
  {
    id: 'DdRp04iPbUg',
    title: 'Happy Ganesh Chaturthi from the Zakaas family',
    tag: '#GanpatiBappaMorya',
    image: '/reels/reel-3.jpg',
    duration: '0:18',
    url: 'https://www.instagram.com/p/DdRp04iPbUg/',
    caption: 'Festive snacking traditions — pure Bhajan flour Chakli, Shankarpali & Bhakarwadi.'
  }
];

export function InstagramSection({
  instagramUrl = 'https://www.instagram.com/zakaas.in/',
  reels = ZAKAAS_REELS
}) {
  const [activeModalReel, setActiveModalReel] = useState(null);

  // Load Instagram embed script when modal is opened
  useEffect(() => {
    if (!activeModalReel) return;

    const processEmbeds = () => {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.onload = processEmbeds;
      document.body.appendChild(script);
    } else {
      // Re-trigger embed processing for newly mounted blockquote
      setTimeout(processEmbeds, 100);
    }
  }, [activeModalReel]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalReel(null);
    };
    if (activeModalReel) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalReel]);

  return (
    <section className="zakaas-irl-section" aria-label="Zakaas real life and community reels">
      <div className="irl-container">
        {/* Header */}
        <div className="irl-header">
          <div>
            <span className="section-eyebrow">COMMUNITY & BEHIND THE SCENES</span>
            <h2 className="irl-title">ZAKAAS, IRL</h2>
            <p className="irl-subtitle">
              Authentic kitchen craft, festive rituals, and the sound of real Maharashtrian crunch.
            </p>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="irl-profile-link"
          >
            <span>WATCH ON @ZAKAAS.IN</span>
            <ArrowUpRight className="arrow-icon" />
          </a>
        </div>

        {/* 9:16 Vertical Reel Cards Grid */}
        <div className="irl-reels-grid">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="reel-card"
              role="button"
              tabIndex={0}
              onClick={() => setActiveModalReel(reel)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModalReel(reel);
                }
              }}
              aria-label={`Watch Reel: ${reel.title}`}
            >
              <div className="reel-media-wrapper">
                <img
                  src={reel.image}
                  alt={reel.title}
                  loading="lazy"
                  className="reel-cover-img"
                />

                <div className="reel-gradient-overlay" />

                {/* Top Badge: Duration & Reel Icon */}
                <div className="reel-top-row">
                  <span className="reel-badge">
                    <Film className="reel-film-icon" />
                    REEL
                  </span>
                  <span className="reel-duration">{reel.duration}</span>
                </div>

                {/* Center Play Button Interaction */}
                <div className="reel-play-circle" aria-hidden="true">
                  <Play className="play-triangle" fill="currentColor" />
                </div>

                {/* Bottom Caption & Tag */}
                <div className="reel-info">
                  <span className="reel-tag">{reel.tag}</span>
                  <p className="reel-title-text">{reel.title}</p>
                  <div className="reel-action-row">
                    <span className="reel-watch-btn">
                      Watch Reel <Play className="tiny-play-icon" fill="currentColor" />
                    </span>
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reel-direct-link"
                      onClick={(e) => e.stopPropagation()}
                      title="Open in Instagram"
                      aria-label="Open in Instagram"
                    >
                      <ArrowUpRight className="inline-arrow" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal for Instagram Reel */}
      {activeModalReel && (
        <div
          className="reel-modal-overlay"
          onClick={() => setActiveModalReel(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-reel-title"
        >
          <div
            className="reel-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="reel-modal-header">
              <div className="reel-modal-meta">
                <span className="reel-modal-badge">
                  <Film className="reel-film-icon" /> @zakaas.in
                </span>
                <span className="reel-modal-tag">{activeModalReel.tag}</span>
              </div>
              <button
                type="button"
                className="reel-modal-close-btn"
                onClick={() => setActiveModalReel(null)}
                aria-label="Close modal"
              >
                <X className="modal-close-icon" />
              </button>
            </div>

            {/* Modal Body: Instagram Official Embed Container */}
            <div className="reel-modal-body">
              <blockquote
                key={activeModalReel.id}
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={`${activeModalReel.url}?utm_source=ig_embed&utm_campaign=loading`}
                data-instgrm-version="14"
                style={{
                  background: '#191816',
                  border: 0,
                  borderRadius: 0,
                  margin: '0 auto',
                  maxWidth: '540px',
                  width: '100%'
                }}
              >
                <div style={{ padding: '24px', textAlign: 'center', color: '#fff' }}>
                  <p style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600 }}>
                    {activeModalReel.title}
                  </p>
                  <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#b5afa6' }}>
                    {activeModalReel.caption}
                  </p>
                  <a
                    href={activeModalReel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#c4301c',
                      color: '#fff',
                      padding: '12px 24px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Watch Full Reel on Instagram <ExternalLink size={14} />
                  </a>
                </div>
              </blockquote>
            </div>

            {/* Modal Footer */}
            <div className="reel-modal-footer">
              <span className="modal-footer-caption">{activeModalReel.title}</span>
              <a
                href={activeModalReel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-open-ig-btn"
              >
                Open in Instagram <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
