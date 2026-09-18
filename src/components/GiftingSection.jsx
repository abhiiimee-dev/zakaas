import { ArrowUpRight, Gift, Sparkles, Box } from 'lucide-react';

export function GiftingSection({ onOpenBuilder }) {
  const giftMoments = [
    { title: 'FOR FAMILY', desc: 'When the WhatsApp group demands a real care package.', tag: '01' },
    { title: 'FOR FESTIVALS', desc: 'Diwali, Ganesh Utsav, or any excuse for a full table.', tag: '02' },
    { title: 'FOR FRIENDS', desc: 'Because nobody actually wants generic dry fruit boxes.', tag: '03' },
  ];

  return (
    <section className="gifting-home-section" id="gifting">
      <div className="gifting-home-container">
        <div className="gifting-headline-row">
          <div>
            <p className="kicker">10 / THE ART OF GIVING</p>
            <h2 className="gifting-display-title">
              SEND A LITTLE<br />
              <em>MAHARASHTRA.</em>
            </h2>
          </div>
          <div className="gifting-cta-side">
            <p className="gifting-intro-copy">
              Curate any 3 original snack packs into our signature rigid presentation box,
              complete with custom ribbon and your personal note.
            </p>
            <button
              type="button"
              className="gifting-main-trigger-btn"
              onClick={onOpenBuilder}
            >
              <Box size={18} />
              <span>BUILD A CUSTOM BOX</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        <div className="gifting-moments-grid">
          {giftMoments.map((moment) => (
            <div className="moment-card" key={moment.title}>
              <span className="moment-num">{moment.tag}</span>
              <h4 className="moment-title">{moment.title}</h4>
              <p className="moment-desc">{moment.desc}</p>
              <button
                type="button"
                className="moment-link-btn"
                onClick={onOpenBuilder}
              >
                <span>PACK THIS BOX</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}

          {/* Builder Feature Card */}
          <div className="moment-card builder-callout-card" onClick={onOpenBuilder} role="button" tabIndex={0}>
            <div className="callout-inner">
              <span className="callout-tag">INTERACTIVE BUILDER</span>
              <h4 className="callout-title">PICK 3 PACKS & ADD A NOTE</h4>
              <div className="callout-badge">
                <Sparkles size={14} />
                <span>OPENS BOX STUDIO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
