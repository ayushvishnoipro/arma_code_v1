import { useState } from "react";
import { useElectionStore } from "@/store/electionStore";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ElectionDashboard } from "./ElectionDashboard";
import { CreateElectionDialog } from "./CreateElectionDialog";
import { ElectionsList } from "./ElectionsList";
import { EditElectionDialog } from "./EditElectionDialog";
import { useToast } from "@/components/ui/use-toast";
import { Election } from "@/types/election";

export const ElectionsTab = () => {
  const { elections, addElection, deleteElection, updateElection } = useElectionStore();
  const [selectedElection, setSelectedElection] = useState<string>(elections[0]?.id || "");
  const [editingElection, setEditingElection] = useState<Election | null>(null);
  const { toast } = useToast();

  const handleCreateElection = (electionData: Omit<Election, "id" | "totalVotes">) => {
    const newElection = {
      ...electionData,
      id: crypto.randomUUID(),
      totalVotes: 0,
      status: new Date(electionData.startDate) > new Date() ? "upcoming" : "active"
    };
    
    addElection(newElection);
    toast({
      title: "Success",
      description: "Election created successfully",
    });
  };

  const handleDeleteElection = (id: string) => {
    try {
      deleteElection(id);
      if (selectedElection === id) {
        setSelectedElection(elections.find(e => e.id !== id)?.id || "");
      }
      toast({
        title: "Success",
        description: "Election deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete election",
        variant: "destructive",
      });
    }
  };

  const handleUpdateElection = (id: string, updatedData: Partial<Election>) => {
    try {
      updateElection(id, updatedData);
      toast({
        title: "Success",
        description: "Election updated successfully",
      });
      setEditingElection(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update election",
        variant: "destructive",
      });
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
            elections={elections}
            onDelete={handleDeleteElection}
            onEdit={setEditingElection}
          />
        </Card>
      </TabsContent>

      {editingElection && (
        <EditElectionDialog
          election={editingElection}
          isOpen={!!editingElection}
          onClose={() => setEditingElection(null)}
          onUpdate={handleUpdateElection}
        />
      )}

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
