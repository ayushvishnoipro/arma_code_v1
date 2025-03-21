
import { BarChart3, Users, Calendar, Award, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ElectionProgressProps {
  electionName: string;
  totalVotes: number;
  totalVoters: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "ended";
  className?: string;
}

export function ElectionProgress({
  electionName,
  totalVotes,
  totalVoters,
  startDate,
  endDate,
  status,
  className,
}: ElectionProgressProps) {
  const progressPercentage = Math.min(100, Math.round((totalVotes / totalVoters) * 100));
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          color: "text-blue-500",
          bg: "bg-blue-100 dark:bg-blue-900/30",
          icon: <Calendar className="h-4 w-4" />,
          label: "Upcoming",
        };
      case "active":
        return {
          color: "text-green-500",
          bg: "bg-green-100 dark:bg-green-900/30",
          icon: <Clock className="h-4 w-4" />,
          label: "In Progress",
        };
      case "ended":
        return {
          color: "text-purple-500",
          bg: "bg-purple-100 dark:bg-purple-900/30",
          icon: <Award className="h-4 w-4" />,
          label: "Completed",
        };
      default:
        return {
          color: "text-gray-500",
          bg: "bg-gray-100 dark:bg-gray-800",
          icon: null,
          label: status,
        };
    }
  };
  
  const statusConfig = getStatusConfig(status);

  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{electionName}</h3>
        <div className={cn("flex items-center px-2 py-1 rounded-full text-xs font-medium", statusConfig.bg, statusConfig.color)}>
          {statusConfig.icon}
          <span className="ml-1">{statusConfig.label}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1.5">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Voter Turnout</span>
            </div>
            <div className="font-medium">{progressPercentage}%</div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Users className="h-3.5 w-3.5" />
              <span>Participation</span>
            </div>
            <div className="font-medium">
              {totalVotes} / {totalVoters} voters
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Period</span>
            </div>
            <div className="font-medium text-xs">
              {startDate} - {endDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
