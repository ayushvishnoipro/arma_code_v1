import { useState } from "react";
import { useElectionStore } from "@/store/electionStore";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ElectionDashboard } from "./ElectionDashboard";
import { CreateElectionDialog } from "./CreateElectionDialog";
import { ElectionsList } from "./ElectionsList";

export const ElectionsTab = () => {
  const { elections, addElection, deleteElection } = useElectionStore();
  const [selectedElection, setSelectedElection] = useState<string>(
    elections[0]?.id || ""
  );

  const handleCreateElection = (electionData: any) => {
    const newElection = {
      ...electionData,
      totalVotes: 0,
      status: new Date(electionData.startDate) > new Date() ? "upcoming" : "active"
    };
    
    addElection(newElection);
  };

  const handleDeleteElection = (id: string) => {
    deleteElection(id);
    if (selectedElection === id) {
      setSelectedElection(elections.find(e => e.id !== id)?.id || "");
    }
  };

  return (
    <Tabs defaultValue="list" className="space-y-6">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="list">Elections List</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        <CreateElectionDialog onCreateElection={handleCreateElection} />
      </div>

      <TabsContent value="list" className="space-y-6">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Manage Elections</h2>
            <p className="text-muted-foreground">Create and manage your elections</p>
          </div>
          <ElectionsList 
            elections={elections.map(election => ({
              ...election,
              status: election.status as any
            }))}
            onDelete={handleDeleteElection}
          />
        </Card>
      </TabsContent>

      <TabsContent value="dashboard">
        {selectedElection ? (
          <ElectionDashboard electionId={selectedElection} />
        ) : (
          <Card className="p-6 text-center text-muted-foreground">
            Select an election to view its dashboard
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};
