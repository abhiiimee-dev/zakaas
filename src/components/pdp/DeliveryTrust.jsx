import { Banknote, Truck, Clock } from 'lucide-react';

export function DeliveryTrust() {
  const trustItems = [
    {
      icon: Banknote,
      title: 'COD Available',
      subtitle: 'Pay at your doorstep'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On qualifying orders'
    },
    {
      icon: Clock,
      title: 'Delivery in 3–5 Days',
      subtitle: 'Airtight, sealed delivery'
    }
  ];

  return (
    <div className="zakaas-delivery-trust-strip" aria-label="Shipping and trust assurances">
      {trustItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="zakaas-trust-col">
            <span className="zakaas-trust-icon-box" aria-hidden="true">
              <Icon className="zakaas-trust-icon" />
            </span>
            <div className="zakaas-trust-col-text">
              <span className="zakaas-trust-col-title">{item.title}</span>
              <span className="zakaas-trust-col-sub">{item.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
