
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Vote, 
  Award, 
  Clock, 
  Bell, 
  ChevronRight,
  Calendar,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElectionProgress } from "@/components/ElectionProgress";
import { CandidateCard } from "@/components/CandidateCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Sample upcoming elections
  const activeElections = [
    {
      id: "1",
      name: "Student Body Elections 2023-24",
      totalVotes: 1245,
      totalVoters: 3500,
      startDate: "Oct 15, 2023",
      endDate: "Oct 20, 2023",
      status: "active" as const
    },
    {
      id: "2",
      name: "Department Representative Elections",
      totalVotes: 567,
      totalVoters: 1200,
      startDate: "Oct 10, 2023",
      endDate: "Oct 18, 2023",
      status: "active" as const
    }
  ];

  // Sample candidates
  const candidates = [
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
    }
  ];

  // Sample notifications
  const notifications = [
    {
      id: "1",
      title: "New Election Announced",
      message: "Student Body Elections 2023-24 has been scheduled for Oct 15-20, 2023.",
      time: "2 days ago",
      isRead: false
    },
    {
      id: "2",
      title: "Your Vote Confirmed",
      message: "Your vote for Department Representative has been recorded successfully.",
      time: "1 week ago",
      isRead: true
    },
    {
      id: "3",
      title: "Reminder: Voting Closes Soon",
      message: "The Department Representative election ends in 2 days. Don't forget to cast your vote!",
      time: "3 days ago",
      isRead: false
    }
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: "1",
      title: "Candidate Debate",
      date: "Oct 12, 2023",
      time: "6:00 PM",
      location: "Main Auditorium"
    },
    {
      id: "2",
      title: "Election Results Announcement",
      date: "Oct 21, 2023",
      time: "12:00 PM",
      location: "Student Center"
    }
  ];

  return (
    <div className="min-h-screen pb-16 pt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Student!</p>
            </div>
            <Button className="gap-2">
              <Bell className="h-4 w-4" />
              <span>{notifications.filter(n => !n.isRead).length} new</span>
            </Button>
          </div>

          {/* Dashboard tabs */}
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="elections">Elections</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 animate-fade-in">
              {/* Active Elections */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Vote className="h-5 w-5 text-primary" />
                    <h2 className="font-medium">Active Elections</h2>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/elections">View All</Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeElections.map((election) => (
                    <ElectionProgress
                      key={election.id}
                      electionName={election.name}
                      totalVotes={election.totalVotes}
                      totalVoters={election.totalVoters}
                      startDate={election.startDate}
                      endDate={election.endDate}
                      status={election.status}
                    />
                  ))}
                </div>
              </div>
              
              {/* Candidate Spotlight */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="font-medium">Candidate Spotlight</h2>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/candidates">View All</Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      {...candidate}
                      onClick={() => console.log(`View candidate ${candidate.id}`)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h2 className="font-medium">Upcoming Events</h2>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-muted rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 mt-1">
                          <span>{event.date}, {event.time}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Elections Tab */}
            <TabsContent value="elections" className="space-y-6 animate-fade-in">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Vote className="h-5 w-5 text-primary" />
                    <h2 className="font-medium">Your Voting Status</h2>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {activeElections.map((election) => (
                    <div key={election.id} className="bg-muted rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">{election.name}</h3>
                        <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                          Active
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-4">
                        <div>Voting Period: {election.startDate} - {election.endDate}</div>
                        <div className="mt-1">Remaining Time: 3 days, 6 hours</div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button asChild>
                          <Link to={`/vote/${election.id}`}>
                            Cast Your Vote
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h2 className="font-medium">Past Elections</h2>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <BarChart3 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Past Elections</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your voting history will appear here after you participate in elections.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="animate-fade-in">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <h2 className="font-medium">Notifications</h2>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={isLoading || notifications.every(n => n.isRead)}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 1000);
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Marking...
                      </>
                    ) : (
                      "Mark All Read"
                    )}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`rounded-lg p-4 transition-colors ${
                          notification.isRead ? "bg-muted" : "bg-primary/5 dark:bg-primary/10"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-base">{notification.title}</h3>
                              {!notification.isRead && (
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <Bell className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No Notifications</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        You're all caught up! Check back later for updates.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
