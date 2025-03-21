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

export interface ElectionResult {
  name: string;
  endDate: string | Date;
  totalVotes: number;
  positions: {
    name: string;
    winner?: {
      id: string;
      name: string;
      party: string;
      votes: number;
      percentage: number;
    };
    candidates: {
      id: string;
      name: string;
      party: string;
      votes: number;
      percentage: number;
    }[];
  }[];
}