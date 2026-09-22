import { useMemo } from 'react';
import { PackageCheck, Truck, MapPin } from 'lucide-react';

export function DeliveryEstimate() {
  const { startFormatted, endFormatted } = useMemo(() => {
    const today = new Date();
    
    // Add 3 to 5 days
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 3);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 5);

    const options = { month: 'short', day: 'numeric' };
    const startStr = startDate.toLocaleDateString('en-IN', options);
    const endStr = endDate.toLocaleDateString('en-IN', options);

    return {
      startFormatted: startStr,
      endFormatted: endStr
    };
  }, []);

  return (
    <div className="zakaas-delivery-estimate-card">
      <div className="zakaas-delivery-estimate-header">
        <span className="zakaas-estimate-label">ESTIMATED ARRIVAL:</span>
        <span className="zakaas-estimate-dates">
          Delivery between <strong>{startFormatted} – {endFormatted}</strong>
        </span>
      </div>

      <div className="zakaas-timeline-row">
        <div className="zakaas-timeline-step is-complete">
          <span className="zakaas-step-bullet"><PackageCheck /></span>
          <span className="zakaas-step-label">Order Packed</span>
        </div>
        <div className="zakaas-timeline-line is-active" />
        <div className="zakaas-timeline-step is-active">
          <span className="zakaas-step-bullet"><Truck /></span>
          <span className="zakaas-step-label">Shipped in 24h</span>
        </div>
        <div className="zakaas-timeline-line" />
        <div className="zakaas-timeline-step">
          <span className="zakaas-step-bullet"><MapPin /></span>
          <span className="zakaas-step-label">Delivered Fresh</span>
        </div>
      </div>
    </div>
  );
}
