
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/components/CandidateCard";
import { VoteButton } from "@/components/VoteButton";
import { ElectionProgress } from "@/components/ElectionProgress";
import { useToast } from "@/hooks/use-toast";

const Vote = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sample ballot data
  const electionData = {
    id: electionId || "1",
    name: "Student Body Elections 2023-24",
    totalVotes: 1245,
    totalVoters: 3500,
    startDate: "Oct 15, 2023",
    endDate: "Oct 20, 2023",
    status: "active" as const,
    positions: [
      {
        id: "pos1",
        title: "Student Body President",
        description: "The president represents the student body and presides over the Student Government Association.",
        candidates: [
          {
            id: "1",
            name: "Alex Johnson",
            position: "Student Body President",
            party: "United Students",
            stats: { year: "Senior", department: "Political Science" },
            status: "active" as const
          },
          {
            id: "2",
            name: "Miguel Rodriguez",
            position: "Student Body President",
            party: "Progress Alliance",
            stats: { year: "Senior", department: "Communications" },
            status: "active" as const
          },
          {
            id: "3",
            name: "Sarah Chen",
            position: "Student Body President",
            party: "Student First",
            stats: { year: "Junior", department: "Business Administration" },
            status: "active" as const
          }
        ]
      },
      {
        id: "pos2",
        title: "Vice President",
        description: "The vice president assists the president and serves as the chairperson of the Student Senate.",
        candidates: [
          {
            id: "4",
            name: "Sophia Martinez",
            position: "Vice President",
            party: "United Students",
            stats: { year: "Junior", department: "Psychology" },
            status: "active" as const
          },
          {
            id: "5",
            name: "David Kim",
            position: "Vice President",
            party: "Progress Alliance",
            stats: { year: "Senior", department: "Computer Science" },
            status: "active" as const
          }
        ]
      },
      {
        id: "pos3",
        title: "Treasurer",
        description: "The treasurer oversees all financial activities of the Student Government Association.",
        candidates: [
          {
            id: "6",
            name: "James Wilson",
            position: "Treasurer",
            party: "United Students",
            stats: { year: "Sophomore", department: "Economics" },
            status: "active" as const
          },
          {
            id: "7",
            name: "Emma Davis",
            position: "Treasurer",
            party: "Student First",
            stats: { year: "Junior", department: "Accounting" },
            status: "active" as const
          },
          {
            id: "8",
            name: "Omar Hassan",
            position: "Treasurer",
            party: "Progress Alliance",
            stats: { year: "Senior", department: "Finance" },
            status: "active" as const
          }
        ]
      }
    ]
  };

  const steps = [
    { title: "Election Information", validateFn: () => true },
    ...electionData.positions.map(pos => ({
      title: pos.title,
      validateFn: () => !!selections[pos.id]
    })),
    { title: "Review & Submit", validateFn: () => Object.keys(selections).length === electionData.positions.length }
  ];

  const handleVote = async (positionId: string, candidateId: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setSelections(prev => ({ ...prev, [positionId]: candidateId }));
        resolve(true);
      }, 800);
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (steps[currentStep].validateFn()) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        toast({
          title: "Selection Required",
          description: "Please select a candidate before proceeding.",
          variant: "destructive",
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    if (steps[currentStep].validateFn()) {
      setIsSubmitting(true);
      
      // Simulate API submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        toast({
          title: "Vote Submitted Successfully",
          description: "Thank you for participating in the election!",
        });
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }, 2000);
    } else {
      toast({
        title: "Incomplete Ballot",
        description: "Please make selections for all positions before submitting.",
        variant: "destructive",
      });
    }
  };

  const getCurrentPosition = () => {
    if (currentStep === 0 || currentStep === steps.length - 1) {
      return null;
    }
    return electionData.positions[currentStep - 1];
  };

  return (
    <div className="min-h-screen pb-16 pt-6">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="mb-4 -ml-2"
              disabled={isSubmitting || isSuccess}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 0 ? "Back to Dashboard" : "Previous Step"}
            </Button>
            
            <h1 className="text-2xl font-display font-bold">{electionData.name}</h1>
            
            {!isSuccess && (
              <div className="mt-2 text-sm text-muted-foreground">
                <span>Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          {!isSuccess && (
            <div className="mb-8 glass-card rounded-xl p-4">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center min-w-max">
                    <div 
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                        currentStep > index
                          ? "bg-primary text-primary-foreground"
                          : currentStep === index
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > index ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div 
                        className={`h-0.5 w-6 ${
                          currentStep > index ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="glass-card rounded-xl p-6 md:p-8 animate-fade-in">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto flex items-center justify-center mb-6">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-3">Vote Submitted Successfully!</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Thank you for participating in the {electionData.name}. Your vote has been securely recorded.
                </p>
                <Button asChild>
                  <a href="/dashboard">Return to Dashboard</a>
                </Button>
              </div>
            ) : currentStep === 0 ? (
              <div>
                <h2 className="text-xl font-medium mb-4">Election Information</h2>
                <ElectionProgress
                  electionName={electionData.name}
                  totalVotes={electionData.totalVotes}
                  totalVoters={electionData.totalVoters}
                  startDate={electionData.startDate}
                  endDate={electionData.endDate}
                  status={electionData.status}
                  className="mb-6"
                />
                
                <div className="bg-muted p-4 rounded-lg flex gap-3 mb-6">
                  <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Voting Instructions</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>You must vote for one candidate for each position.</li>
                      <li>Once you submit your ballot, you cannot change your selections.</li>
                      <li>Your vote is anonymous and secure.</li>
                      <li>For technical issues, please contact the election administrator.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800 dark:text-amber-400 mb-1">Important Notice</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-500">
                      This election is binding and official. Your participation helps shape student governance.
                    </p>
                  </div>
                </div>
              </div>
            ) : currentStep === steps.length - 1 ? (
              <div>
                <h2 className="text-xl font-medium mb-4">Review Your Ballot</h2>
                <p className="text-muted-foreground mb-6">
                  Please review your selections carefully. You cannot change your votes after submission.
                </p>
                
                <div className="space-y-6 mb-8">
                  {electionData.positions.map((position) => {
                    const selectedCandidate = position.candidates.find(c => c.id === selections[position.id]);
                    return (
                      <div key={position.id} className="bg-muted rounded-lg p-4">
                        <h3 className="font-medium mb-2">{position.title}</h3>
                        {selectedCandidate ? (
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                              <Check className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{selectedCandidate.name}</p>
                              <p className="text-xs text-muted-foreground">{selectedCandidate.party}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-destructive">No selection made</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-muted p-4 rounded-lg flex gap-3 mb-8">
                  <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    By clicking "Submit Ballot", you confirm that these selections represent your official vote. This action cannot be undone.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
                    Review Again
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !steps[currentStep].validateFn()}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Ballot"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {getCurrentPosition() && (
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-medium mb-2">{getCurrentPosition()?.title}</h2>
                      <p className="text-muted-foreground">{getCurrentPosition()?.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {getCurrentPosition()?.candidates.map((candidate) => (
                        <div 
                          key={candidate.id}
                          className={`border rounded-xl transition-colors ${
                            selections[getCurrentPosition()?.id || ""] === candidate.id
                              ? "border-primary bg-primary/5 dark:bg-primary/10"
                              : "border-transparent hover:border-muted"
                          }`}
                        >
                          <div className="flex items-center justify-between p-4">
                            <CandidateCard
                              {...candidate}
                              className="border-0 shadow-none p-0 hover:shadow-none !bg-transparent"
                            />
                            <VoteButton
                              candidateId={candidate.id}
                              candidateName={candidate.name}
                              position={candidate.position}
                              onVote={() => handleVote(getCurrentPosition()?.id || "", candidate.id)}
                              className={selections[getCurrentPosition()?.id || ""] === candidate.id ? "bg-green-500 hover:bg-green-600" : ""}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
