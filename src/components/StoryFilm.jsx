import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function StoryFilm() {
  return (
    <section className="story-film" id="story">
      <img src="/zakaas-story-kitchen.png" alt="Women making traditional Maharashtrian snacks in a home kitchen" loading="lazy" />
      <div className="story-film-wash" />
      <div className="story-single-copy">
        <p className="kicker">OUR STORY</p>
        <h2>MADE LIKE<br/><em>HOME.</em></h2>
        <p className="story-pullquote">
          “Classic Maharashtrian snacks, packed with the taste of home.”
        </p>
        <Link to="/about" className="story-cta">
          OUR STORY <ArrowUpRight size={13} />
        </Link>
      </div>
    </section>
  );
}
