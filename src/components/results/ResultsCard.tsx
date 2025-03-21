
import { ChevronDown, ChevronUp, Trophy } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ElectionResult {
  id: string;
  title: string;
  date: string;
  totalVotes: number;
  positions: {
    name: string;
    winner: {
      name: string;
      party: string;
      votes: number;
      percentage: number;
    };
    runnerUp?: {
      name: string;
      party: string;
      votes: number;
      percentage: number;
    };
  }[];
}

interface ResultsCardProps {
  result: ElectionResult;
}

export const ResultsCard = ({ result }: ResultsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 sm:p-6 border-b">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="font-medium text-lg">{result.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {result.date} • {result.totalVotes} total votes
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <span>Hide Details</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Show Details</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          
          {/* Winner of main position */}
          <div className="flex items-center gap-3 mt-4 p-3 bg-primary/5 rounded-lg">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{result.positions[0].winner.name}</p>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {result.positions[0].winner.percentage}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {result.positions[0].name} • {result.positions[0].winner.party}
              </p>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="p-4 sm:p-6 space-y-4">
            <h4 className="font-medium text-sm uppercase text-muted-foreground">All Positions</h4>
            
            {result.positions.map((position, index) => (
              <div key={index} className="space-y-3">
                <h5 className="font-medium">{position.name}</h5>
                
                <div className="space-y-2">
                  {/* Winner */}
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Trophy className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="font-medium">{position.winner.name}</p>
                        <p className="text-xs text-muted-foreground">{position.winner.party}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{position.winner.votes} votes</p>
                      <p className="text-xs text-muted-foreground">{position.winner.percentage}%</p>
                    </div>
                  </div>
                  
                  {/* Runner up */}
                  {position.runnerUp && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">2</span>
                        </div>
                        <div>
                          <p className="font-medium">{position.runnerUp.name}</p>
                          <p className="text-xs text-muted-foreground">{position.runnerUp.party}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{position.runnerUp.votes} votes</p>
                        <p className="text-xs text-muted-foreground">{position.runnerUp.percentage}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
