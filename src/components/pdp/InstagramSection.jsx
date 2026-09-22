import { ArrowUpRight } from 'lucide-react';

export function InstagramSection({ instagramUrl = 'https://www.instagram.com/zakaassnacks/' }) {
  return (
    <section className="zakaas-irl-section" aria-label="Zakaas real life and community">
      <div className="irl-container">
        <div className="irl-header">
          <div>
            <span className="section-eyebrow">COMMUNITY</span>
            <h2 className="irl-title">ZAKAAS, IRL</h2>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="irl-profile-link"
          >
            <span>@ZAKAASSNACKS ON INSTAGRAM</span>
            <ArrowUpRight className="arrow-icon" />
          </a>
        </div>

        <div className="irl-authentic-strip">
          <p className="irl-statement">
            Afternoon cutting chai, family tea tables, and unapologetically loud crunch across India.
            Tag your tea moments with <strong>#Zakaas</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
