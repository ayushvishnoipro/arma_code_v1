
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  icon: "users" | "calendar";
  text: string;
  timeAgo: string;
}

export const ActivityItem = ({ icon, text, timeAgo }: ActivityItemProps) => {
  const Icon: LucideIcon = icon === "users" ? Users : Calendar;
  
  return (
    <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">{text}</p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
