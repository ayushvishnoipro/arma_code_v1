import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Candidate {
  id: string;
  name: string;
  position: string;
  party?: string;
  electionId: string;
}

interface CandidateStore {
  candidates: Candidate[];
  addCandidate: (candidate: Omit<Candidate, "id">) => void;
  getCandidatesByElection: (electionId: string) => Candidate[];
  deleteCandidate: (id: string) => void;
}

export const useCandidateStore = create<CandidateStore>()(
  persist(
    (set, get) => ({
      candidates: [
        // Add sample data
        {
          id: "1",
          name: "John Doe",
          position: "President",
          party: "Progressive Party",
          electionId: "1"
        },
        {
          id: "2",
          name: "Jane Smith",
          position: "Vice President",
          party: "Unity Party",
          electionId: "1"
        }
      ],
      addCandidate: (candidate) =>
        set((state) => ({
          candidates: [...state.candidates, { ...candidate, id: crypto.randomUUID() }]
        })),
      getCandidatesByElection: (electionId) => {
        const state = get();
        return state.candidates.filter(candidate => candidate.electionId === electionId);
      },
      deleteCandidate: (id: string) => 
        set((state) => ({
          candidates: state.candidates.filter((candidate) => candidate.id !== id)
        }))
    }),
    {
      name: 'candidate-store'
    }
  )
);