export interface Election {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "completed";
  positions: string[];
  eligibleYears: number[];
  totalVotes: number;
}

export interface CreateElectionData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  positions: string[];
  eligibleYears: number[];
}