import { useCandidateStore } from "@/store/candidateStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface ElectionCandidatesProps {
  electionId: string;
}

export const ElectionCandidates = ({ electionId }: ElectionCandidatesProps) => {
  const { candidates } = useCandidateStore();
  
  const electionCandidates = candidates.filter(
    candidate => candidate.electionId === electionId && candidate.status === "active"
  );

  if (electionCandidates.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No candidates registered yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {electionCandidates.map((candidate) => (
        <div 
          key={candidate.id} 
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
        >
          <Avatar>
            <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{candidate.name}</h4>
            <p className="text-sm text-muted-foreground">{candidate.position}</p>
          </div>
          <div className="ml-auto text-sm">
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
              {candidate.party}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};