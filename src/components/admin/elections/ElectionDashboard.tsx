import { useState, useEffect } from "react";
import { useVoteStore } from "@/store/voteStore";
import { useElectionStore } from "@/store/electionStore";
import { useCandidateStore } from "@/store/candidateStore";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { VoteDistributionChart } from "@/components/admin/dashboard/VoteDistributionChart";
import { Users, Vote, Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ElectionDashboardProps {
  electionId: string;
}

export function ElectionDashboard({ electionId }: ElectionDashboardProps) {
  const { elections } = useElectionStore();
  const { candidates, getCandidatesByElection } = useCandidateStore();
  const { votes, getVotesForCandidate } = useVoteStore();
  const [timeRemaining, setTimeRemaining] = useState("");

  const election = elections.find(e => e.id === electionId);
  const electionCandidates = getCandidatesByElection(electionId);
  
  // Calculate total eligible voters (from student data)
  const totalEligibleVoters = 1000; // This should come from your student data
  const totalVotesCast = votes.filter(v => v.electionId === electionId).length;
  const voterTurnout = (totalVotesCast / totalEligibleVoters) * 100;

  // Update time remaining
  useEffect(() => {
    if (!election) return;

    const updateTimeRemaining = () => {
      const now = new Date().getTime();
      const end = new Date(election.endDate).getTime();
      const timeLeft = end - now;

      if (timeLeft <= 0) {
        setTimeRemaining("Voting Ended");
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
  }, [election]);

  if (!election) return null;

  // Sort candidates by vote count
  const sortedCandidates = [...electionCandidates].sort((a, b) => {
    const votesA = getVotesForCandidate(a.id);
    const votesB = getVotesForCandidate(b.id);
    return votesB - votesA;
  });

  const leadingCandidate = sortedCandidates[0];
  const leadingVotes = leadingCandidate ? getVotesForCandidate(leadingCandidate.id) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Votes Cast"
          value={totalVotesCast}
          icon={Vote}
          iconBgClass="bg-blue-100"
          iconClass="text-blue-600"
          bgClass="bg-card"
          footer={
            <Progress 
              value={voterTurnout} 
              className="h-2 mt-2"
            />
          }
        />
        
        <StatCard
          title="Voter Turnout"
          value={`${voterTurnout.toFixed(1)}%`}
          icon={Users}
          iconBgClass="bg-green-100"
          iconClass="text-green-600"
          bgClass="bg-card"
          footer={
            <p className="text-xs text-muted-foreground mt-1">
              {totalVotesCast} of {totalEligibleVoters} voters
            </p>
          }
        />

        <StatCard
          title="Time Remaining"
          value={timeRemaining}
          icon={Clock}
          iconBgClass="bg-orange-100"
          iconClass="text-orange-600"
          bgClass="bg-card"
        />

        <StatCard
          title="Leading Candidate"
          value={leadingCandidate?.name || "N/A"}
          icon={TrendingUp}
          iconBgClass="bg-purple-100"
          iconClass="text-purple-600"
          bgClass="bg-card"
          footer={
            leadingCandidate && (
              <p className="text-xs text-muted-foreground mt-1">
                {leadingVotes} votes ({((leadingVotes / totalVotesCast) * 100).toFixed(1)}%)
              </p>
            )
          }
        />
      </div>

      {/* Candidate Standings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Candidate Standings</h3>
        <div className="space-y-4">
          {sortedCandidates.map((candidate, index) => {
            const voteCount = getVotesForCandidate(candidate.id);
            const votePercentage = (voteCount / totalVotesCast) * 100;
            
            return (
              <div key={candidate.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-sm font-medium",
                      index === 0 && "text-primary"
                    )}>
                      {candidate.name}
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                        Leading
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {voteCount} votes ({votePercentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress 
                  value={votePercentage} 
                  className={cn(
                    "h-2",
                    index === 0 && "bg-primary/20"
                  )}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Vote Distribution Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Voting Trends</h3>
        <VoteDistributionChart 
          data={sortedCandidates.map(candidate => ({
            name: candidate.name,
            votes: getVotesForCandidate(candidate.id)
          }))}
        />
      </Card>

      {/* Section-wise Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Vote Distribution by Year</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((year) => {
            const yearVotes = votes.filter(v => 
              v.electionId === electionId && 
              // This should use actual student data to determine voter's year
              Math.random() > 0.5
            ).length;
            
            return (
              <Card key={year} className="p-4">
                <h4 className="text-sm font-medium">Year {year}</h4>
                <p className="text-2xl font-bold mt-2">{yearVotes}</p>
                <Progress 
                  value={(yearVotes / totalVotesCast) * 100} 
                  className="h-1 mt-2"
                />
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}