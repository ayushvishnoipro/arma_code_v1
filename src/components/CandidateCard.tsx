import { useState } from "react";
import { ChevronRight, User, Award, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { VoteModal } from "@/components/elections/VoteModal";

interface CandidateCardProps {
  id: string;
  name: string;
  position: string;
  image?: string;
  party?: string;
  stats?: {
    year?: string;
    department?: string;
    achievements?: number;
  };
  status?: "leading" | "active" | "pending" | "elected";
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CandidateCard({
  id,
  name,
  position,
  image,
  party,
  stats,
  status = "active",
  onClick,
  className,
  style,
}: CandidateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);

  const handleVote = async (candidateId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Here you would typically make an API call to record the vote
    console.log(`Voted for candidate: ${candidateId}`);
  };

  return (
    <>
      <div
        className={cn(
          "glass-card group rounded-xl p-5 transition-all duration-300 hover:shadow-md",
          isHovered && "scale-[1.02]",
          className
        )}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full subtle-ring bg-muted flex items-center justify-center">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            ) : (
              <User size={24} className="text-muted-foreground" />
            )}
            {status === "leading" && (
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent flex items-center justify-center shadow-sm">
                <Award size={12} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-base leading-tight">{name}</h3>
              {status && <StatusBadge status={status} />}
            </div>
            
            <p className="text-sm text-muted-foreground">{position}</p>
            
            {party && (
              <div className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
                {party}
              </div>
            )}
          </div>
        </div>
        
        {stats && (
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {stats.year && (
              <div className="rounded-lg bg-muted p-2">
                <span className="block text-muted-foreground">Year</span>
                <span className="font-medium">{stats.year}</span>
              </div>
            )}
            
            {stats.department && (
              <div className="rounded-lg bg-muted p-2">
                <span className="block text-muted-foreground">Department</span>
                <span className="font-medium">{stats.department}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <Button 
            size="sm" 
            variant="ghost" 
            className="gap-1 h-8"
            onClick={() => setShowVoteModal(true)}
          >
            <Award className="h-4 w-4" />
            <span className="text-xs">Vote</span>
          </Button>
          
          <Button 
            size="sm" 
            onClick={onClick}
            className="gap-1 h-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
          >
            <span className="text-xs">View Profile</span>
            <ChevronRight className={`h-3 w-3 transition-transform duration-300 ${
              isHovered ? "translate-x-0.5" : ""
            }`} />
          </Button>
        </div>
      </div>

      <VoteModal 
        isOpen={showVoteModal}
        onClose={() => setShowVoteModal(false)}
        candidate={{
          id,
          name,
          position,
          party
        }}
        onVote={handleVote}
      />
    </>
  );
}
