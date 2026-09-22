export function ProductTrustStrip({ claims = [] }) {
  if (!claims || claims.length === 0) return null;

  return (
    <div className="zakaas-trust-strip" aria-label="Product value and claims">
      {claims.map((claim, idx) => (
        <span key={idx} className="zakaas-trust-pill">
          <span className="trust-dot" aria-hidden="true" />
          {claim}
        </span>
      ))}
    </div>
  );
}
