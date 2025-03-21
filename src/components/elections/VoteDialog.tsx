import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useVoteStore } from "@/store/voteStore";
import { useCandidateStore } from "@/store/candidateStore";
import { Check } from "lucide-react";

interface VoteDialogProps {
  electionId: string;
  position: string;
  disabled?: boolean;
  voterId: string;
}

export const VoteDialog = ({ electionId, position, disabled, voterId }: VoteDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  
  const { candidates } = useCandidateStore();
  const { addVote, hasVoted } = useVoteStore();

  const eligibleCandidates = candidates.filter(
    (candidate) => candidate.position === position && candidate.status === "active"
  );

  const handleVote = () => {
    if (!selectedCandidate) {
      toast({
        title: "Selection Required",
        description: "Please select a candidate to vote",
        variant: "destructive"
      });
      return;
    }

    addVote({
      electionId,
      candidateId: selectedCandidate,
      voterId,
      timestamp: new Date().toISOString()
    });

    setOpen(false);
    toast({
      title: "Vote Recorded",
      description: "Your vote has been successfully recorded",
    });
  };

  const alreadyVoted = hasVoted(voterId, electionId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          disabled={disabled || alreadyVoted}
          variant={alreadyVoted ? "secondary" : "default"}
        >
          {alreadyVoted ? "Already Voted" : "Vote Now"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cast Your Vote</DialogTitle>
          <DialogDescription>
            Select a candidate for {position}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {eligibleCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedCandidate === candidate.id
                  ? "border-primary bg-primary/10"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.party}</p>
                </div>
                {selectedCandidate === candidate.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleVote}>
            Confirm Vote
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};