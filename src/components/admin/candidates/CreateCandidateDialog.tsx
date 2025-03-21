import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Candidate } from "@/store/candidateStore";
import { useElectionStore } from "@/store/electionStore";

interface CreateCandidateDialogProps {
  onCreateCandidate: (candidate: Omit<Candidate, "id" | "votes">) => void;
}

export const CreateCandidateDialog = ({ onCreateCandidate }: CreateCandidateDialogProps) => {
  const { toast } = useToast();
  const { elections } = useElectionStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    electionId: "",
    position: "",
    party: "",
    stats: {
      year: "",
      department: ""
    },
    status: "pending" as const
  });

  // Filter only upcoming or active elections
  const availableElections = elections.filter(
    election => ["upcoming", "active"].includes(election.status)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.electionId || !formData.position || !formData.party) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onCreateCandidate(formData);
    setOpen(false);
    setFormData({
      name: "",
      electionId: "",
      position: "",
      party: "",
      stats: {
        year: "",
        department: ""
      },
      status: "pending"
    });

    toast({
      title: "Success",
      description: "Candidate added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Candidate</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="election">Election *</Label>
            <Select 
              value={formData.electionId}
              onValueChange={(value) => setFormData(prev => ({...prev, electionId: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select election" />
              </SelectTrigger>
              <SelectContent>
                {availableElections.map((election) => (
                  <SelectItem key={election.id} value={election.id}>
                    {election.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              required
              value={formData.position}
              onChange={(e) => setFormData(prev => ({...prev, position: e.target.value}))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="party">Party *</Label>
            <Input
              id="party"
              required
              value={formData.party}
              onChange={(e) => setFormData(prev => ({...prev, party: e.target.value}))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select 
                value={formData.stats.year}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev, 
                  stats: { ...prev.stats, year: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      Year {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.stats.department}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  stats: { ...prev.stats, department: e.target.value }
                }))}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">Add Candidate</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};