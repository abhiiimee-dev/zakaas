export function ProductFactStrip({ facts = [] }) {
  const defaultFacts = [
    { label: 'NET WEIGHT', value: '100g' },
    { label: 'PRODUCT', value: '100% VEGETARIAN' },
    { label: 'PREPARATION', value: 'SMALL BATCH CRAFTED' },
    { label: 'ORIGIN', value: 'MAHARASHTRA INSPIRED' }
  ];

  const items = facts.length ? facts : defaultFacts;

  return (
    <section className="zakaas-fact-strip" aria-label="Product facts">
      <div className="zakaas-fact-strip-inner">
        {items.map((item, idx) => (
          <div key={idx} className="zakaas-fact-col">
            <span className="fact-value">{item.value}</span>
            <span className="fact-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
