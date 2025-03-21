import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  VoteIcon, 
  UserSquare2, 
  BarChart, 
  Settings, 
  LogOut 
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'elections', label: 'Elections', icon: VoteIcon },
  { id: 'candidates', label: 'Candidates', icon: UserSquare2 },
 
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
    <aside className="lg:w-64 glass-card rounded-xl p-4 h-fit lg:sticky lg:top-24">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-white font-semibold text-sm">CE</span>
        </div>
        <h2 className="font-display font-semibold">Admin Portal</h2>
      </div>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </nav>
      
      <div className="pt-6 mt-6 border-t">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
