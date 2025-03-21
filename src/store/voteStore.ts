import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Vote {
  id: string;
  electionId: string;
  candidateId: string;
  studentId: string;
  timestamp: string;
}

interface VoteStore {
  votes: Vote[];
  addVote: (vote: Omit<Vote, "id" | "timestamp">) => void;
  hasVoted: (studentId: string, electionId: string) => boolean;
  getVotesForCandidate: (candidateId: string) => number;
}

export const useVoteStore = create<VoteStore>()(
  persist(
    (set, get) => ({
      votes: [],
      addVote: (vote) => 
        set((state) => ({
          votes: [...state.votes, {
            ...vote,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString()
          }]
        })),
      hasVoted: (studentId, electionId) => {
        const state = get();
        return state.votes.some(
          vote => vote.studentId === studentId && vote.electionId === electionId
        );
      },
      getVotesForCandidate: (candidateId) => {
        const state = get();
        return state.votes.filter(vote => vote.candidateId === candidateId).length;
      }
    }),
    {
      name: 'vote-store'
    }
  )
);