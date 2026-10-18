import { Diya } from './DiwaliArt';

export function ReviewsSection() {
  const reviews = [
    {
      id: 'rev-1',
      image: '/reviews/customer-bhakarwadi.jpg',
      quote: "The crunch is unreal. Perfect balance of fiery spice, tangy amchur, and sesame masala. Kept a pack on my desk and it vanished before lunch!",
      author: "Tanmay Shinde",
      city: "PUNE",
      tag: "VERIFIED SNACKER",
      photoTag: "REAL SNACKER · BHAKARWADI",
      product: "Bhakarwadi 100g"
    },
    {
      id: 'rev-2',
      quote: "Reminds me of my Aaji's steel tin in Kolhapur. The Bhakarwadi pinwheels are spicy, crispy, and packed with whole-spice warmth.",
      author: "Pooja Deshmukh",
      city: "MUMBAI",
      tag: "VERIFIED SNACKER",
      product: "Bhakarwadi 100g"
    },
    {
      id: 'rev-3',
      image: '/reels/reel-1.jpg',
      quote: "Proper crunch in the Chakli with toasted sesame and ajwain in every bite. Sent a 6-pack festive box to my brother and it arrived intact!",
      author: "Rahul Kulkarni",
      city: "PUNE",
      tag: "BOUGHT 3 BOXES",
      photoTag: "CHAI & CHAKLI RITUAL",
      product: "Chakli 100g"
    },
    {
      id: 'rev-4',
      quote: "The Shankarpada diamonds are crisp, flaky, and just the right amount of sweet for evening tea. Brings back festive memories for our family.",
      author: "Ananya Joshi",
      city: "NAGPUR",
      tag: "FESTIVE GIFTING",
      product: "Shankarpada 100g"
    },
    {
      id: 'rev-5',
      quote: "Every Friday evening cutting chai now feels like Shivaji Park. The moment you tear open the pouch, roasted spices fill the room.",
      author: "Aditya & Neha K.",
      city: "BENGALURU",
      tag: "WEEKLY RITUAL",
      product: "Trio Gift Box"
    },
    {
      id: 'rev-6',
      quote: "You can taste the roasted cumin and sesame immediately in the Chakli. Real texture, real crunch, zero shortcuts.",
      author: "Kavita Rao",
      city: "HYDERABAD",
      tag: "VERIFIED BUYER",
      product: "Chakli 100g"
    }
  ];

  // Duplicate for seamless infinite continuous marquee motion
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section className="reviews-section" aria-label="Customer reviews and proof of taste">
      <div className="gt-toran" aria-hidden="true" />

      <div className="reviews-header">
        <div className="reviews-header-left">
          <div className="reviews-kicker-row">
            <span className="reviews-diya-mini"><Diya /></span>
            <span className="gt-deva reviews-deva-pill">॥ चवीची खात्री · ग्राहक अनुभव ॥</span>
            <p className="kicker" style={{ margin: 0 }}>04 / PROOF OF TASTE</p>
          </div>
          <h2 className="reviews-royal-heading">
            <span className="reviews-heading-top">What People</span>
            <em className="reviews-heading-em">Are Saying.</em>
          </h2>
        </div>

        <div className="reviews-header-badge">
          <span className="reviews-rating-stars">★★★★★</span>
          <span className="reviews-rating-val">4.9 / 5</span>
          <span className="badge-dot">·</span>
          <span className="reviews-rating-count">1,200+ SNACKERS DELIGHTED</span>
        </div>
      </div>

      <div className="reviews-marquee-wrapper" tabIndex={0} aria-label="Continuously moving customer reviews, hover to pause">
        <div className="reviews-marquee-track">
          {marqueeItems.map((r, i) => {
            const hasPhoto = Boolean(r.image);

            return (
              <article
                key={`${r.id}-${i}`}
                className={`review-card ${hasPhoto ? 'has-photo' : 'text-only'}`}
              >
                {hasPhoto && (
                  <div className="review-photo-col">
                    <img
                      src={r.image}
                      alt={`${r.author} enjoying ZAKAAS snacks`}
                      loading="eager"
                      decoding="sync"
                    />
                    {r.photoTag && <span className="review-photo-pill">{r.photoTag}</span>}
                  </div>
                )}

                <div className="review-content-col">
                  <div className="review-top">
                    <span className="review-city">{r.city}</span>
                    <span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span>
                    <small className="review-tag">{r.tag}</small>
                  </div>

                  <p className="review-quote">“{r.quote}”</p>

                  <div className="review-bottom">
                    <div className="review-author">— {r.author}</div>
                    {r.product && <div className="review-product">{r.product}</div>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
