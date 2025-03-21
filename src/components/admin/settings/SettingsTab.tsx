
import { Button } from "@/components/ui/button";

interface SettingItemProps {
  title: string;
  description: string;
  actionLabel?: string;
  actions?: React.ReactNode;
}

const SettingItem = ({ title, description, actionLabel, actions }: SettingItemProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted p-4 rounded-lg">
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {actions || (actionLabel && <Button variant="outline" size="sm">{actionLabel}</Button>)}
  </div>
);

export const SettingsTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="glass-card rounded-xl p-6">
        <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>
        
        <div className="grid gap-6">
          <div className="border-b pb-6">
            <h2 className="text-lg font-medium mb-4">System Configuration</h2>
            <div className="grid gap-4">
              <SettingItem 
                title="Maintenance Mode"
                description="Temporarily disable the voting system for maintenance."
                actions={
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Enable</Button>
                    <Button variant="outline" size="sm">Disable</Button>
                  </div>
                }
              />
              
              <SettingItem 
                title="Email Notifications"
                description="Configure email settings for notifications and alerts."
                actionLabel="Configure"
              />
              
              <SettingItem 
                title="System Logs"
                description="View and export system logs for troubleshooting."
                actionLabel="View Logs"
              />
            </div>
          </div>
          
          <div className="border-b pb-6">
            <h2 className="text-lg font-medium mb-4">User Management</h2>
            <div className="grid gap-4">
              <SettingItem 
                title="Admin Accounts"
                description="Manage administrator access and permissions."
                actionLabel="Manage"
              />
              
              <SettingItem 
                title="Voter Database"
                description="Import and manage eligible voter records."
                actionLabel="Import"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4">Security</h2>
            <div className="grid gap-4">
              <SettingItem 
                title="Two-Factor Authentication"
                description="Enforce additional authentication for admin accounts."
                actionLabel="Configure"
              />
              
              <SettingItem 
                title="Audit Logs"
                description="View detailed audit trail of system activities."
                actionLabel="View"
              />
              
              <SettingItem 
                title="Backup & Recovery"
                description="Configure automatic backups and recovery options."
                actionLabel="Configure"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
