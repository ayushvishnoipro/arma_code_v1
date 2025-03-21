import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CandidateCard } from "@/components/CandidateCard";
import { useElectionStore } from "@/store/electionStore";
import { useCandidateStore } from "@/store/candidateStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Candidate {
  id: string;
  name: string;
  position: string;
  party: string;
  electionId: string;
}

interface ElectionGroup {
  electionName: string;
  electionId: string;
  status: string;
  candidates: Candidate[];
}

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { elections } = useElectionStore();
  const { candidates } = useCandidateStore();

  // Group candidates by election
  const groupedCandidates: ElectionGroup[] = elections.map(election => ({
    electionName: election.name,
    electionId: election.id,
    status: election.status,
    candidates: candidates.filter(c => c.electionId === election.id)
  })).filter(group => group.candidates.length > 0);

  // Filter candidates based on search and position
  const filteredGroups = groupedCandidates.map(group => ({
    ...group,
    candidates: group.candidates.filter(candidate => 
      (candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       candidate.position.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (positionFilter === "all" || candidate.position === positionFilter)
    )
  })).filter(group => group.candidates.length > 0);

  const toggleSection = (electionId: string) => {
    setOpenSections(prev => 
      prev.includes(electionId) 
        ? prev.filter(id => id !== electionId)
        : [...prev, electionId]
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-transparent pb-16 pt-24">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-display font-bold">Candidates</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Input 
                type="search" 
                placeholder="Search candidates by name or position..." 
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter by Position</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setPositionFilter("all")}>
                  All Positions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter("President")}>
                  President
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter("Vice President")}>
                  Vice President
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter("Treasurer")}>
                  Treasurer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter("Secretary")}>
                  Secretary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="space-y-6">
            {filteredGroups.map((group) => (
              <Collapsible 
                key={group.electionId}
                open={openSections.includes(group.electionId)}
                onOpenChange={() => toggleSection(group.electionId)}
                className="border rounded-lg p-4"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">{group.electionName}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                      group.status === 'active' ? 'bg-green-100 text-green-800' :
                      group.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {group.status}
                    </span>
                  </div>
                  {openSections.includes(group.electionId) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.candidates.map((candidate, index) => (
                      <CandidateCard 
                        key={candidate.id}
                        {...candidate}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => {}}
                        className="h-full"
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            {filteredGroups.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No candidates found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
