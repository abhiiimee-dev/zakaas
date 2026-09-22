import { ArrowUpRight, Play, Film } from 'lucide-react';

export function InstagramSection({
  instagramUrl = 'https://www.instagram.com/zakaassnacks/',
  reels = [
    {
      id: 'reel-1',
      title: 'Making the signature Chakli spirals fresh at sunrise',
      tag: '#KitchenBTS',
      image: '/zakaas-story-kitchen.png',
      duration: '0:32',
      url: 'https://www.instagram.com/zakaassnacks/reels/'
    },
    {
      id: 'reel-2',
      title: 'The 4 PM cutting chai & Chakli crunch test',
      tag: '#ChaiRitual',
      image: '/zakaas-home-kitchen.png',
      duration: '0:18',
      url: 'https://www.instagram.com/zakaassnacks/reels/'
    },
    {
      id: 'reel-3',
      title: 'Slow-roasting traditional Bhajan flour with cumin & ajwain',
      tag: '#CraftInEveryBatch',
      image: '/zakaas-story-film.png',
      duration: '0:45',
      url: 'https://www.instagram.com/zakaassnacks/reels/'
    },
    {
      id: 'reel-4',
      title: 'Listen to the golden snap — freshly packed 100g pouches',
      tag: '#SoundOfCrunch',
      image: '/zakaas-chakli.jpg',
      duration: '0:22',
      url: 'https://www.instagram.com/zakaassnacks/reels/'
    }
  ]
}) {
  return (
    <section className="zakaas-irl-section" aria-label="Zakaas real life and community reels">
      <div className="irl-container">
        {/* Header */}
        <div className="irl-header">
          <div>
            <span className="section-eyebrow">COMMUNITY & BEHIND THE SCENES</span>
            <h2 className="irl-title">ZAKAAS, IRL</h2>
            <p className="irl-subtitle">
              Raw kitchen craft, afternoon chai tables, and the sound of authentic crunch.
            </p>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="irl-profile-link"
          >
            <span>WATCH ON @ZAKAASSNACKS</span>
            <ArrowUpRight className="arrow-icon" />
          </a>
        </div>

        {/* Vertical 9:16 Reel Cards Grid */}
        <div className="irl-reels-grid">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-card"
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
                  <span className="reel-cta-text">
                    Watch on Instagram <ArrowUpRight className="inline-arrow" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
