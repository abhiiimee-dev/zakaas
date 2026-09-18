export function ReviewsSection() {
  const reviews = [
    {
      quote: "Reminds me of my Aaji's steel tin in Kolhapur. The Bhakarwadi is spicy, crispy, and fresh.",
      author: "Pooja Deshmukh",
      city: "MUMBAI",
      tag: "VERIFIED SNACKER"
    },
    {
      quote: "Proper crunch in the Chakli without being overly oily. Sent a box to my brother in London!",
      author: "Rahul Kulkarni",
      city: "PUNE",
      tag: "BOUGHT 3 BOXES"
    },
    {
      quote: "The Shankarpali is perfectly sweet and flaky. ZAKAAS brings back pure festive memories.",
      author: "Ananya Joshi",
      city: "NAGPUR",
      tag: "FESTIVE GIFTING"
    }
  ];

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <p className="kicker">06 / PROOF OF TASTE</p>
        <h2>WHAT PEOPLE<br /><em>ARE SAYING.</em></h2>
      </div>

      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <article key={i} className="review-card">
            <div className="review-top">
              <span>0{i + 1} / {r.city}</span>
              <small>{r.tag}</small>
            </div>
            <p className="review-quote">“{r.quote}”</p>
            <div className="review-author">— {r.author}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
