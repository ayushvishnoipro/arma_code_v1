import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useVoteStore } from "@/store/voteStore";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  electionId: string;
  studentId: string;
  candidate: {
    id: string;
    name: string;
    position: string;
    party?: string;
  };
}

export function VotingModal({
  isOpen,
  onClose,
  electionId,
  studentId,
  candidate,
}: VotingModalProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const { addVote } = useVoteStore();
  const { toast } = useToast();

  const handleVote = async () => {
    try {
      setIsVoting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addVote({
        electionId,
        candidateId: candidate.id,
        studentId,
      });

      setHasVoted(true);
      
      setTimeout(() => {
        onClose();
        setHasVoted(false);
        toast({
          title: "Vote Recorded",
          description: `You have successfully voted for ${candidate.name}`,
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Vote</DialogTitle>
          <DialogDescription>
            Please review your selection before confirming your vote.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!hasVoted ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 py-4"
            >
              <div className="flex items-start space-x-4 p-4 rounded-lg border">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  {candidate.party && (
                    <p className="text-sm mt-1 text-muted-foreground">{candidate.party}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isVoting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVote}
                  disabled={isVoting}
                >
                  {isVoting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Recording Vote...
                    </>
                  ) : (
                    "Confirm Vote"
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="rounded-full bg-green-100 p-3 mb-4"
              >
                <Check className="h-8 w-8 text-green-600" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold text-center"
              >
                Vote Recorded Successfully!
              </motion.h3>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}