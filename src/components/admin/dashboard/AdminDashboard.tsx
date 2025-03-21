import { useState, useEffect } from "react";
import { useElectionStore } from "@/store/electionStore";
import { useCandidateStore } from "@/store/candidateStore";
import { useVoteStore } from "@/store/voteStore";
import { StatCard } from "./StatCard";
import { VoteDistributionChart } from "./VoteDistributionChart";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Vote, Award, BarChart, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElectionDetailsModal } from "./ElectionDetailsModal";

export const AdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const { elections } = useElectionStore();
  const { candidates } = useCandidateStore();
  const { votes } = useVoteStore();
  const [selectedElection, setSelectedElection] = useState<typeof elections[0] | null>(null);

  const activeElections = elections.filter(e => e.status === "active").length;
  const totalCandidates = candidates.length;
  const totalVotes = votes.length;
  const totalEligibleVoters = 1000; // This should come from your student data
  const voterTurnout = (totalVotes / totalEligibleVoters) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Elections"
          value={activeElections}
          icon={Vote}
          iconBgClass="bg-blue-100"
          iconClass="text-blue-600"
          bgClass="bg-card"
        />
        
        <StatCard
          title="Total Candidates"
          value={totalCandidates}
          icon={Users}
          iconBgClass="bg-green-100"
          iconClass="text-green-600"
          bgClass="bg-card"
        />

        <StatCard
          title="Total Votes"
          value={totalVotes}
          icon={Award}
          iconBgClass="bg-purple-100"
          iconClass="text-purple-600"
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
          icon={BarChart}
          iconBgClass="bg-orange-100"
          iconClass="text-orange-600"
          bgClass="bg-card"
          footer={
            <p className="text-xs text-muted-foreground mt-1">
              {totalVotes} of {totalEligibleVoters} eligible voters
            </p>
          }
        />
      </div>

      {/* Recent Elections */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Elections</h2>
        <div className="space-y-4">
          {elections.slice(0, 5).map((election) => (
            <div 
              key={election.id} 
              className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedElection(election)}
            >
              <div>
                <h3 className="font-medium">{election.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                  election.status === 'active' ? 'bg-green-100 text-green-800' :
                  election.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {election.status}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Voting Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Vote Distribution</h2>
          <VoteDistributionChart 
            data={elections.map(election => ({
              name: election.name,
              votes: votes.filter(v => v.electionId === election.id).length
            }))}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Year-wise Participation</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((year) => {
              const yearVotes = Math.floor(Math.random() * 200); // Replace with actual data
              return (
                <div key={year} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Year {year}</span>
                    <span className="text-sm text-muted-foreground">{yearVotes} votes</span>
                  </div>
                  <Progress value={(yearVotes / 200) * 100} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {selectedElection && (
        <ElectionDetailsModal
          election={selectedElection}
          isOpen={!!selectedElection}
          onClose={() => setSelectedElection(null)}
        />
      )}
    </div>
  );
};