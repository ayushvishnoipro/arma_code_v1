
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Vote, ShieldCheck, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/components/CandidateCard";
import { ElectionProgress } from "@/components/ElectionProgress";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Sample data for candidates
  const featuredCandidates = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "Student Body President",
      party: "United Students",
      stats: {
        year: "Senior",
        department: "Political Science"
      },
      status: "leading" as const
    },
    {
      id: "2",
      name: "Sophia Martinez",
      position: "Vice President",
      party: "Progress Alliance",
      stats: {
        year: "Junior",
        department: "Business"
      },
      status: "active" as const
    },
    {
      id: "3",
      name: "Michael Chen",
      position: "Treasurer",
      party: "Student First",
      stats: {
        year: "Sophomore",
        department: "Economics"
      },
      status: "active" as const
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-slate-900/20 pb-16 pt-16 md:pt-20 lg:pt-28">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className={`space-y-4 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                <span>Election in progress: Student Body 2023-24</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance">
                <span className="title-gradient">Modern</span> College Elections Made Simple
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A secure, transparent, and user-friendly platform designed for campus democracy. 
                Vote for your representatives with confidence and ease.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="gap-2 h-12 px-6">
                  <Link to="/login">
                    <Vote className="h-5 w-5" />
                    <span>Vote Now</span>
                  </Link>
                </Button>
                
                <Button variant="outline" asChild size="lg" className="gap-2 h-12 px-6">
                  <Link to="/candidates">
                    <span>View Candidates</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl translate-x-1/3"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground">
              Built with modern design principles and a focus on security and usability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Secure Voting</h3>
              <p className="text-muted-foreground">
                End-to-end encryption and authentication ensures your vote is secure and counted accurately.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-3">Live Results</h3>
              <p className="text-muted-foreground">
                View real-time voting statistics and results as they come in, ensuring complete transparency.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Efficient Process</h3>
              <p className="text-muted-foreground">
                Vote in minutes with our streamlined interface, designed for speed and accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Elections */}
      <section className="py-16 bg-muted/30 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-display font-bold">Active Elections</h2>
            <Button variant="outline" asChild size="sm">
              <Link to="/elections">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ElectionProgress
              electionName="Student Body Elections 2023-24"
              totalVotes={1245}
              totalVoters={3500}
              startDate="Oct 15, 2023"
              endDate="Oct 20, 2023"
              status="active"
              className="animate-scale-in"
            />
            
            <ElectionProgress
              electionName="Department Representative Elections"
              totalVotes={567}
              totalVoters={1200}
              startDate="Oct 10, 2023"
              endDate="Oct 18, 2023"
              status="active"
              className="animate-scale-in"
            />
          </div>
        </div>
      </section>

      {/* Featured Candidates */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-display font-bold">Featured Candidates</h2>
            <Button variant="outline" asChild size="sm">
              <Link to="/candidates">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCandidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                {...candidate}
                onClick={() => console.log(`View candidate ${candidate.id}`)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto overflow-hidden relative">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Ready to Make Your Voice Heard?</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of students who are shaping the future of their campus through democratic participation.
              </p>
              <Button asChild size="lg" className="gap-2 h-12 px-6">
                <Link to="/login">
                  <Vote className="h-5 w-5" />
                  <span>Cast Your Vote</span>
                </Link>
              </Button>
            </div>
            
            {/* Decorative gradient */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-semibold text-sm">CE</span>
              </div>
              <span className="font-display font-semibold">CollegeElect</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/elections" className="hover:text-foreground transition-colors">Elections</Link>
              <Link to="/candidates" className="hover:text-foreground transition-colors">Candidates</Link>
              <Link to="/results" className="hover:text-foreground transition-colors">Results</Link>
              <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CollegeElect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
