
import { cn } from "@/lib/utils";

type StatusType = "leading" | "active" | "pending" | "elected";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "leading":
        return {
          color: "text-emerald-700 dark:text-emerald-500",
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          label: "Leading"
        };
      case "elected":
        return {
          color: "text-blue-700 dark:text-blue-400",
          bg: "bg-blue-50 dark:bg-blue-500/10",
          label: "Elected"
        };
      case "pending":
        return {
          color: "text-amber-700 dark:text-amber-500",
          bg: "bg-amber-50 dark:bg-amber-500/10",
          label: "Pending"
        };
      case "active":
      default:
        return {
          color: "text-violet-700 dark:text-violet-400",
          bg: "bg-violet-50 dark:bg-violet-500/10",
          label: "Active"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        config.color,
        config.bg,
        className
      )}
    >
      {config.label}
    </span>
  );
}
