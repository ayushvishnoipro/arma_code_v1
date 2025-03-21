import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronDown, ChevronUp, Users } from "lucide-react";
import { VotingModal } from "./VotingModal";
import { useVoteStore } from "@/store/voteStore";
import { cn } from "@/lib/utils";

interface Election {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  totalVotes: number;
  eligibleYears: number[];
}

interface ElectionCardProps {
  election: Election;
  candidates: Array<{
    id: string;
    name: string;
    position: string;
    party?: string;
  }>;
  studentId: string;
  studentYear: number;
}

export const ElectionCard = ({ election, candidates, studentId, studentYear }: ElectionCardProps) => {
  const [showCandidates, setShowCandidates] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const { hasVoted, getVotesForCandidate } = useVoteStore();

  const hasStudentVoted = hasVoted(studentId, election.id);
  const isActive = election.status === 'active';
  const canVote = isActive && !hasStudentVoted;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-xl">{election.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(election.status)}`}>
            {election.status}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{election.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{formatDate(election.startDate)} - {formatDate(election.endDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Eligible Years: {election.eligibleYears.join(', ')}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={() => setShowCandidates(!showCandidates)}
        >
          {showCandidates ? (
            <>Hide Candidates <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>Show Candidates ({candidates.length}) <ChevronDown className="h-4 w-4" /></>
          )}
        </Button>

        {showCandidates && (
          <div className="space-y-3 pt-3">
            {candidates.map((candidate) => {
              const voteCount = getVotesForCandidate(candidate.id);
              return (
                <div
                  key={candidate.id}
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    canVote && "hover:border-primary cursor-pointer"
                  )}
                  onClick={() => canVote && setSelectedCandidate(candidate)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                      {candidate.party && (
                        <p className="text-sm text-muted-foreground">{candidate.party}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{voteCount} votes</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {hasStudentVoted && (
          <p className="text-sm text-center text-muted-foreground">
            You have already voted in this election
          </p>
        )}
      </div>

      {selectedCandidate && (
        <VotingModal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          electionId={election.id}
          studentId={studentId}
          candidate={selectedCandidate}
        />
      )}
    </div>
  );
};
