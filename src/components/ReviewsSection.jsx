export function ReviewsSection() {
  const reviews = [
    {
      id: 'rev-1',
      image: '/reviews/customer-bhakarwadi.jpg',
      quote: "The crunch is unreal. Perfect balance of fiery spice and coconut stuffing. Kept a pack on my desk and it vanished before lunch!",
      author: "Tanmay Shinde",
      city: "PUNE",
      tag: "VERIFIED SNACKER",
      photoTag: "REAL SNACKER · BHAKARWADI",
      product: "Bhakarwadi 200g"
    },
    {
      id: 'rev-2',
      quote: "Reminds me of my Aaji's steel tin in Kolhapur. The Bhakarwadi is spicy, crispy, and fresh without heavy commercial grease.",
      author: "Pooja Deshmukh",
      city: "MUMBAI",
      tag: "VERIFIED SNACKER",
      product: "Signature Bhakarwadi"
    },
    {
      id: 'rev-3',
      image: '/reels/reel-1.jpg',
      quote: "Proper crunch in the Chakli without being oily. Sent a festive box to my brother in London and it arrived intact & aromatic!",
      author: "Rahul Kulkarni",
      city: "PUNE",
      tag: "BOUGHT 3 BOXES",
      photoTag: "CHAI & CHAKLI RITUAL",
      product: "Spiced Chakli"
    },
    {
      id: 'rev-4',
      quote: "The Shankarpali is perfectly sweet and flaky with pure ghee aroma. ZAKAAS brings back authentic festive memories for our family.",
      author: "Ananya Joshi",
      city: "NAGPUR",
      tag: "FESTIVE GIFTING",
      product: "Sweet Shankarpali"
    },
    {
      id: 'rev-5',
      quote: "Every Friday evening cutting chai now feels like Shivaji Park. The moment you tear open the pouch, roasted spices fill the room.",
      author: "Aditya & Neha K.",
      city: "BENGALURU",
      tag: "WEEKLY RITUAL",
      product: "Celebration Hamper"
    },
    {
      id: 'rev-6',
      quote: "You can taste the slow-roasted bhajan flour immediately. Real texture, real crunch, zero shortcuts. Subscribing for our monthly box.",
      author: "Kavita Rao",
      city: "HYDERABAD",
      tag: "VERIFIED BUYER",
      product: "Bhajan Flour Chakli"
    }
  ];

  // Duplicate for seamless infinite continuous marquee motion
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section className="reviews-section" aria-label="Customer reviews and proof of taste">
      <div className="reviews-header">
        <div className="reviews-header-left">
          <p className="kicker">06 / PROOF OF TASTE</p>
          <h2>WHAT PEOPLE<br /><em>ARE SAYING.</em></h2>
        </div>
        <div className="reviews-header-badge">
          <span>★ 4.9 / 5 RATING</span>
          <span className="badge-dot">·</span>
          <span>1,200+ SNACKERS DELIGHTED</span>
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
