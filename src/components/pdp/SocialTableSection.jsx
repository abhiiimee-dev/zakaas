import { ArrowUpRight } from 'lucide-react';

function InstagramIcon({ className = 'social-icon' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SocialTableSection() {
  const posts = [
    {
      image: '/zakaas-story-kitchen.png',
      tag: '#CuttingChaiCompanion',
      handle: '@zakaassnacks'
    },
    {
      image: '/zakaas-home-kitchen.png',
      tag: '#EveningCrunchRitual',
      handle: '@zakaassnacks'
    },
    {
      image: '/zakaas-story-film.png',
      tag: '#PassThePlate',
      handle: '@zakaassnacks'
    },
    {
      image: '/zakaas-chakli.jpg',
      tag: '#MaharashtraInEveryBite',
      handle: '@zakaassnacks'
    }
  ];

  return (
    <section className="zakaas-social-section" aria-label="Community tea-time moments">
      <div className="social-header">
        <div>
          <span className="social-kicker">06 / ZAKAAS IRL</span>
          <h2 className="social-title">
            FROM THE<br />
            <em>ZAKAAS TABLE.</em>
          </h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-handle-btn"
        >
          <InstagramIcon className="social-icon" />
          <span>FOLLOW @ZAKAASSNACKS</span>
          <ArrowUpRight className="arrow-icon" />
        </a>
      </div>

      <div className="social-photo-grid">
        {posts.map((post, idx) => (
          <div key={idx} className="social-photo-card">
            <img src={post.image} alt={post.tag} loading="lazy" />
            <div className="social-photo-overlay">
              <span className="social-tag">{post.tag}</span>
              <span className="social-source">{post.handle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
