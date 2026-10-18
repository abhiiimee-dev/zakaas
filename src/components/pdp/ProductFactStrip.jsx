export function ProductFactStrip({ product }) {
  const handle = (product?.handle || product?.id || '').toLowerCase();
  const isBhakarwadiOrShankarpada =
    handle.includes('bhakarwadi') || handle.includes('shankarp');

  const facts = [
    { value: '100G', label: 'NET WEIGHT' },
    { value: 'ROASTED', label: 'BHAJAN FLOUR' },
    ...(!isBhakarwadiOrShankarpada
      ? [{ value: 'COLD-PRESSED', label: 'GROUNDNUT OIL' }]
      : []),
    { value: 'WHOLE', label: 'CUMIN & AJWAIN' },
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
