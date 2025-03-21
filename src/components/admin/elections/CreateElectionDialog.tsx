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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Election } from "@/types/election";

interface CreateElectionDialogProps {
  onCreateElection: (election: Omit<Election, "id" | "totalVotes">) => void;
}

export const CreateElectionDialog = ({ onCreateElection }: CreateElectionDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    positions: 1,
    eligibleYears: [] as number[],
    candidates: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }

    if (formData.eligibleYears.length === 0) {
      toast({
        title: "Invalid Selection",
        description: "Please select at least one eligible year",
        variant: "destructive"
      });
      return;
    }

    const status = new Date(formData.startDate) > new Date() ? "upcoming" : "active";
    
    onCreateElection({
      ...formData,
      status,
    });

    setOpen(false);
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      positions: 1,
      eligibleYears: [],
      candidates: []
    });

    toast({
      title: "Success",
      description: "Election created successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Election</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Election</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Election Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({...prev, startDate: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({...prev, endDate: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Eligible Years *</Label>
            <div className="grid grid-cols-5 gap-4">
              {[1,2,3,4,5].map((year) => (
                <div key={year} className="flex items-center space-x-2">
                  <Checkbox
                    id={`year-${year}`}
                    checked={formData.eligibleYears.includes(year)}
                    onCheckedChange={(checked) => {
                      setFormData(prev => ({
                        ...prev,
                        eligibleYears: checked 
                          ? [...prev.eligibleYears, year]
                          : prev.eligibleYears.filter(y => y !== year)
                      }));
                    }}
                  />
                  <Label htmlFor={`year-${year}`}>{year}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">Create Election</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};