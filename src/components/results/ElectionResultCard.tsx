import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { format } from "date-fns";
import type { ElectionResult } from "@/types/election";

interface ElectionResultCardProps {
  result: ElectionResult;
}

export const ElectionResultCard = ({ result }: ElectionResultCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{result.name}</CardTitle>
        <CardDescription>
          Completed on {format(new Date(result.endDate), 'PPP')}
          <span className="ml-2">• {result.totalVotes} total votes</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {result.positions.map((position) => (
            <div key={position.name} className="space-y-4">
              <h3 className="text-lg font-semibold">{position.name}</h3>
              {position.winner && (
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <Trophy className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{position.winner.name}</p>
                    <p className="text-sm text-muted-foreground">{position.winner.party}</p>
                    <p className="text-sm">
                      {position.winner.votes} votes ({position.winner.percentage}%)
                    </p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                {position.candidates
                  .filter(c => c.id !== position.winner?.id)
                  .map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-2">
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.party}</p>
                      </div>
                      <p className="text-sm">
                        {candidate.votes} votes ({candidate.percentage}%)
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};