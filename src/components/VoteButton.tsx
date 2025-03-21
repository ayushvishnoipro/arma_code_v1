
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface VoteButtonProps {
  candidateId: string;
  candidateName: string;
  position: string;
  disabled?: boolean;
  className?: string;
  onVote?: (candidateId: string) => Promise<boolean>;
}

export function VoteButton({
  candidateId,
  candidateName,
  position,
  disabled = false,
  className,
  onVote,
}: VoteButtonProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const handleVote = async () => {
    if (hasVoted || disabled || !onVote) return;
    
    setIsVoting(true);
    try {
      const success = await onVote(candidateId);
      if (success) {
        setHasVoted(true);
        toast({
          title: "Vote Submitted",
          description: `You've successfully voted for ${candidateName} as ${position}.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Vote Error",
        description: "There was a problem submitting your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        hasVoted ? "bg-green-500 hover:bg-green-600" : "",
        className
      )}
      disabled={disabled || isVoting || hasVoted}
      onClick={handleVote}
    >
      {isVoting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Submitting...
        </>
      ) : hasVoted ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Voted
        </>
      ) : (
        "Vote Now"
      )}

      {!isVoting && !hasVoted && (
        <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-pulse-subtle" />
      )}
    </Button>
  );
}
