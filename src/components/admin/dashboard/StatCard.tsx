
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgClass: string;
  iconClass: string;
  bgClass: string;
  footer?: React.ReactNode;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  iconBgClass,
  iconClass,
  bgClass,
  footer,
}: StatCardProps) => {
  return (
    <div className={`${bgClass} rounded-xl p-4`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className={`h-10 w-10 ${iconBgClass} rounded-full flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>
      </div>
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
};
