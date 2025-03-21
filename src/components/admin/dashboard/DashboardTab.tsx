
import { Users, Calendar, BarChart3, Activity } from "lucide-react";
import { StatCard } from "./StatCard";
import { VoteDistributionChart } from "./VoteDistributionChart";
import { CandidatePieChart } from "./CandidatePieChart";
import { ActivityItem } from "./ActivityItem";

// Define data interfaces
interface VoteData {
  name: string;
  votes: number;
}

interface CandidateData {
  name: string;
  votes: number;
  color: string;
}

export const DashboardTab = () => {
  // Sample vote data for charts
  const voteData: VoteData[] = [
    { name: "Oct 15", votes: 325 },
    { name: "Oct 16", votes: 480 },
    { name: "Oct 17", votes: 230 },
    { name: "Oct 18", votes: 420 },
    { name: "Oct 19", votes: 380 },
    { name: "Oct 20", votes: 290 }
  ];

  // Sample candidate data for pie chart
  const candidateData: CandidateData[] = [
    { name: "Alex Johnson", votes: 480, color: "#3B82F6" },
    { name: "Miguel Rodriguez", votes: 300, color: "#8B5CF6" },
    { name: "Sarah Chen", votes: 220, color: "#EC4899" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-xl p-6">
        <h1 className="text-2xl font-display font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Voters"
            value="3,500"
            icon={Users}
            bgClass="bg-primary/10"
            iconBgClass="bg-primary/20"
            iconClass="text-primary"
            footer={<p className="text-xs text-green-600 dark:text-green-400">+12% from last election</p>}
          />
          
          <StatCard 
            title="Active Elections"
            value="2"
            icon={Calendar}
            bgClass="bg-secondary/10"
            iconBgClass="bg-secondary/20"
            iconClass="text-secondary"
            footer={<p className="text-xs text-muted-foreground">Ending Oct 20, 2023</p>}
          />
          
          <StatCard 
            title="Votes Today"
            value="380"
            icon={BarChart3}
            bgClass="bg-accent/10"
            iconBgClass="bg-accent/20"
            iconClass="text-accent"
            footer={<p className="text-xs text-amber-600 dark:text-amber-400">-5% from yesterday</p>}
          />
          
          <StatCard 
            title="Voter Turnout"
            value="42%"
            icon={Activity}
            bgClass="bg-muted"
            iconBgClass="bg-muted-foreground/20"
            iconClass="text-muted-foreground"
            footer={<p className="text-xs text-green-600 dark:text-green-400">+8% from last election</p>}
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Vote Distribution</h2>
          <VoteDistributionChart data={voteData} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">President Race</h2>
          <CandidatePieChart data={candidateData} />
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem 
              icon="users"
              text="50 new votes recorded"
              timeAgo="Just now"
            />
            <ActivityItem 
              icon="calendar"
              text="Election settings updated"
              timeAgo="15 minutes ago"
            />
            <ActivityItem 
              icon="users"
              text="30 new votes recorded"
              timeAgo="30 minutes ago"
            />
            <ActivityItem 
              icon="calendar"
              text="Election settings updated"
              timeAgo="45 minutes ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
