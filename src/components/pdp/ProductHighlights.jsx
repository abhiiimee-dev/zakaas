import {
  Utensils,
  Sparkles,
  Flame,
  PackageCheck,
  Coffee,
  Users,
  ShieldCheck,
  Heart,
  Gift,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  utensils: Utensils,
  sparkles: Sparkles,
  flame: Flame,
  'package-check': PackageCheck,
  coffee: Coffee,
  users: Users,
  'shield-check': ShieldCheck,
  heart: Heart,
  gift: Gift,
  default: CheckCircle2
};

export function ProductHighlights({ highlights = [] }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="zakaas-highlights-grid" aria-label="Product highlights">
      {highlights.map((item, idx) => {
        const IconComponent = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : iconMap.default;
        const text = typeof item === 'string' ? item : item.title;

        return (
          <div key={item.id || idx} className="zakaas-highlight-item">
            <span className="zakaas-highlight-icon-wrap" aria-hidden="true">
              <IconComponent className="zakaas-highlight-icon" />
            </span>
            <span className="zakaas-highlight-text">{text}</span>
          </div>
        );
      })}
    </div>
  );
}
