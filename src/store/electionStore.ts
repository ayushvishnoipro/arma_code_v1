import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Election } from '@/types/election';

interface ElectionStore {
  elections: Election[];
  addElection: (election: Omit<Election, "id">) => void;
  updateElection: (id: string, election: Partial<Election>) => void;
  deleteElection: (id: string) => void;
}

export const useElectionStore = create<ElectionStore>()(
  persist(
    (set) => ({
      elections: [],
      addElection: (election) =>
        set((state) => ({
          elections: [...state.elections, { ...election, id: crypto.randomUUID() }]
        })),
      updateElection: (id, updates) =>
        set((state) => ({
          elections: state.elections.map((election) =>
            election.id === id ? { ...election, ...updates } : election
          )
        })),
      deleteElection: (id) =>
        set((state) => ({
          elections: state.elections.filter((election) => election.id !== id)
        })),
    }),
    {
      name: 'election-store'
    }
  )
);