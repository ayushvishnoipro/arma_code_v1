import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Users, Vote, Award, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useVoteStore } from "@/store/voteStore";
import { useCandidateStore } from "@/store/candidateStore";
import { VoteDistributionChart } from "./VoteDistributionChart";

interface ElectionDetailsModalProps {
  election: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    eligibleYears: number[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ElectionDetailsModal({ election, isOpen, onClose }: ElectionDetailsModalProps) {
  const { votes } = useVoteStore();
  const { getCandidatesByElection } = useCandidateStore();
  const [timeRemaining, setTimeRemaining] = useState("");
  const candidates = getCandidatesByElection(election.id);

  // Calculate voting statistics
  const totalEligibleVoters = 1000; // Replace with actual count from your data
  const electionVotes = votes.filter(v => v.electionId === election.id);
  const totalVotes = electionVotes.length;
  const voterTurnout = (totalVotes / totalEligibleVoters) * 100;
  const remainingVoters = totalEligibleVoters - totalVotes;

  // Update time remaining
  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date().getTime();
      const end = new Date(election.endDate).getTime();
      const timeLeft = end - now;

      if (timeLeft <= 0) {
        setTimeRemaining("Election Ended");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000);
    return () => clearInterval(interval);
  }, [election.endDate]);

  // Calculate year-wise turnout
  const yearWiseTurnout = election.eligibleYears.map(year => ({
    year,
    votes: votes.filter(v => v.electionId === election.id).length, // Replace with actual year-wise data
    total: Math.floor(totalEligibleVoters / election.eligibleYears.length)
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{election.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Election Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Vote className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Total Votes</span>
              </div>
              <p className="text-2xl font-bold">{totalVotes}</p>
              <Progress value={voterTurnout} className="h-2" />
            </Card>

            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Remaining Voters</span>
              </div>
              <p className="text-2xl font-bold">{remainingVoters}</p>
              <p className="text-xs text-muted-foreground">Out of {totalEligibleVoters}</p>
            </Card>

            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Voter Turnout</span>
              </div>
              <p className="text-2xl font-bold">{voterTurnout.toFixed(1)}%</p>
              <Progress value={voterTurnout} className="h-2" />
            </Card>

            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Time Remaining</span>
              </div>
              <p className="text-2xl font-bold">{timeRemaining}</p>
              <p className="text-xs text-muted-foreground">
                Ends {new Date(election.endDate).toLocaleDateString()}
              </p>
            </Card>
          </div>

          {/* Candidate Standings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Candidate Standings</h3>
            <div className="space-y-4">
              {candidates.map((candidate) => {
                const candidateVotes = votes.filter(v => v.candidateId === candidate.id).length;
                const percentage = (candidateVotes / totalVotes) * 100 || 0;
                
                return (
                  <div key={candidate.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.position}</p>
                      </div>
                      <p className="text-sm font-medium">
                        {candidateVotes} votes ({percentage.toFixed(1)}%)
                      </p>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Year-wise Turnout */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Year-wise Turnout</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {yearWiseTurnout.map(({ year, votes, total }) => (
                <Card key={year} className="p-4">
                  <h4 className="text-sm font-medium">Year {year}</h4>
                  <p className="text-2xl font-bold mt-2">{votes}</p>
                  <p className="text-xs text-muted-foreground">out of {total}</p>
                  <Progress 
                    value={(votes / total) * 100} 
                    className="h-1 mt-2" 
                  />
                </Card>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}