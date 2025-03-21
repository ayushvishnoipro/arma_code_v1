import { useState, useEffect } from "react";
import { Filter, Info, TrendingUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useElectionStore } from "@/store/electionStore";
import { useCandidateStore } from "@/store/candidateStore";
import { format } from "date-fns";

const Results = () => {
  const { elections } = useElectionStore();
  const { candidates } = useCandidateStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ongoing");

  // Get current ongoing election
  const ongoingElection = elections.find(e => e.status === 'active');
  
  // Get completed elections
  const completedElections = elections.filter(e => e.status === 'completed');

  // Filter completed elections based on search
  const filteredElections = completedElections.filter(election =>
    election.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-transparent pb-16 pt-24">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-display font-bold">Election Results</h1>
          </div>
          
          {ongoingElection && (
            <Card className="mb-8 bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Current Election Status
                </CardTitle>
                <CardDescription>
                  {ongoingElection.name} is currently active
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Ends on {format(new Date(ongoingElection.endDate), 'PPP')}</p>
                    <p className="text-sm text-muted-foreground">Results will be available after the election ends.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {completedElections.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Input 
                    type="search" 
                    placeholder="Search past elections..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {filteredElections.map((election) => (
                <Card key={election.id} className="mb-6">
                  <CardHeader>
                    <CardTitle>{election.name}</CardTitle>
                    <CardDescription>
                      Completed on {format(new Date(election.endDate), 'PPP')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {election.positions.map((position) => {
                        const positionCandidates = candidates
                          .filter(c => c.electionId === election.id && c.position === position)
                          .sort((a, b) => b.votes - a.votes);
                        
                        const winner = positionCandidates[0];
                        const totalVotes = positionCandidates.reduce((sum, c) => sum + c.votes, 0);

                        return (
                          <div key={position} className="space-y-4">
                            <h3 className="text-lg font-semibold">{position}</h3>
                            {winner && (
                              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                                <Trophy className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">{winner.name}</p>
                                  <p className="text-sm text-muted-foreground">{winner.party}</p>
                                  <p className="text-sm">
                                    {winner.votes} votes ({((winner.votes / totalVotes) * 100).toFixed(1)}%)
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              {positionCandidates.slice(1).map((candidate) => (
                                <div key={candidate.id} className="flex items-center justify-between p-2">
                                  <div>
                                    <p className="font-medium">{candidate.name}</p>
                                    <p className="text-sm text-muted-foreground">{candidate.party}</p>
                                  </div>
                                  <p className="text-sm">
                                    {candidate.votes} votes ({((candidate.votes / totalVotes) * 100).toFixed(1)}%)
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {completedElections.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No completed elections yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
