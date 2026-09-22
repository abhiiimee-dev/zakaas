export function ProductFactStrip() {
  const facts = [
    { value: '100G', label: 'NET QUANTITY' },
    { value: 'TRADITIONAL', label: 'BHAJAN FLOUR RECIPE' },
    { value: 'FRESHLY PACKED', label: 'SMALL BATCHES' },
    { value: '100% VEG', label: 'PURE VEGETARIAN' },
    { value: 'NO ADDED', label: 'PRESERVATIVES' }
  ];

  return (
    <section className="zakaas-fact-strip" aria-label="Product facts">
      <div className="fact-strip-container">
        {facts.map((fact, idx) => (
          <div key={idx} className="fact-item">
            <span className="fact-strong">{fact.value}</span>
            <span className="fact-sub">{fact.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
