export function MaharashtraRemixed() {
  const cityNodes = [
    { name: 'MUMBAI', role: 'CHAOS & STREET CRUNCH', tag: 'WEST' },
    { name: 'PUNE', role: 'THE BAKERY & SPICE EPICENTRE', tag: 'CENTRAL' },
    { name: 'NASHIK', role: 'ROASTED CHILLI & VALLEY HEAT', tag: 'NORTH' },
    { name: 'KOLHAPUR', role: 'HIGH-VOLTAGE RED MASALA', tag: 'SOUTH' },
    { name: 'NAGPUR', role: 'TARRI & ROASTED SEED FIRE', tag: 'EAST' },
  ];

  return (
    <section className="remixed-poster-section" id="maharashtra">
      <div className="remixed-inner">
        {/* Background graphic map fragment */}
        <div className="map-graphic-fragment" aria-hidden="true">
          <img
            src="/zakaas-maharashtra-map.png"
            alt=""
            className="map-art-texture"
            loading="lazy"
          />
          <div className="map-art-overlay" />
        </div>

        {/* Foreground Content */}
        <div className="remixed-content-layer">
          <div className="remixed-top-meta">
            <span className="remixed-tag">09 / CULTURAL CARTOGRAPHY</span>
            <span className="remixed-coords">MAHARASHTRA STATE GRID · 307,713 KM²</span>
          </div>

          <div className="remixed-headline-block">
            <h2 className="remixed-giant-title">
              <span>MAHARASHTRA,</span>
              <em className="accent-glow">REMIXED.</em>
            </h2>
            <p className="remixed-subtext">
              Five culinary hotbeds. One unrelenting craving. We mapped the flavour profiles that
              define Maharashtra and packaged them without dilution.
            </p>
          </div>

          {/* Tour-dates / Streetwear style city pills */}
          <div className="city-circuit-grid">
            {cityNodes.map((city, idx) => (
              <div className="city-circuit-card" key={city.name}>
                <div className="city-circuit-top">
                  <span className="city-idx">0{idx + 1}</span>
                  <span className="city-zone">{city.tag}</span>
                </div>
                <h4 className="city-name">{city.name}</h4>
                <p className="city-profile">{city.role}</p>
                <div className="city-status-dot" />
              </div>
            ))}
          </div>

          <div className="remixed-footer-bar">
            <div className="remixed-quote">
              “JAGAHA BADLI. SWAD NAHI.”
            </div>
            <div className="remixed-stamp">
              AUTHENTIC FLAVOUR ARCHIVE · VERIFIED ORIGIN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
