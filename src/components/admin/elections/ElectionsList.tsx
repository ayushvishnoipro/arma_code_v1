import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Trash2, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface Election {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "leading" | "active" | "pending" | "elected";
  totalVotes: number;
  positions: number;
}

interface ElectionsListProps {
  elections: Election[];
  onDelete: (id: string) => void;
}

export const ElectionsList = ({ elections, onDelete }: ElectionsListProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Election Deleted",
      description: "The election has been successfully deleted.",
    });
    setDeleteId(null);
  };

  const electionToDelete = elections.find(e => e.id === deleteId);

  return (
    <>
      <div className="space-y-4">
        {elections.map((election) => (
          <div 
            key={election.id} 
            className="bg-muted rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{election.name}</h3>
                <StatusBadge status={election.status} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                <span>{election.startDate} - {election.endDate}</span>
                <span className="mx-2">•</span>
                <span>{election.positions} positions</span>
                <span className="mx-2">•</span>
                <span>{election.totalVotes} votes</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button variant="outline" size="sm">View</Button>
              <Button variant="outline" size="sm">Edit</Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setDeleteId(election.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Election</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Are you sure you want to delete this election?</p>
              {electionToDelete && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">{electionToDelete.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {electionToDelete.totalVotes} votes recorded
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2 text-destructive mt-4">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">This action cannot be undone.</span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete Election
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
