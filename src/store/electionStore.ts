import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Election } from '@/types/election';

interface ElectionStore {
  elections: Election[];
  addElection: (election: Election) => void;
  updateElection: (id: string, updatedElection: Partial<Election>) => void;
  deleteElection: (id: string) => void;
}

export const useElectionStore = create<ElectionStore>()(
  persist(
    (set) => ({
      elections: [],
      addElection: (election) => 
        set((state) => ({ 
          elections: [...state.elections, election] 
        })),
      updateElection: (id, updatedElection) =>
        set((state) => ({
          elections: state.elections.map((election) =>
            election.id === id
              ? { ...election, ...updatedElection }
              : election
          ),
        })),
      deleteElection: (id) =>
        set((state) => ({
          elections: state.elections.filter((election) => election.id !== id),
        })),
    }),
    {
      name: 'election-store',
    }
  )
);