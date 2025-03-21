import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/dashboard/AdminDashboard";
import { ElectionsTab } from "@/components/admin/elections/ElectionsTab";
import { CandidatesTab } from "@/components/admin/candidates/CandidatesTab";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-transparent pb-16 pt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Admin Portal</h1>
            </div>

            {activeTab === "dashboard" && <AdminDashboard />}
            {activeTab === "elections" && <ElectionsTab />}
            {activeTab === "candidates" && <CandidatesTab />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
