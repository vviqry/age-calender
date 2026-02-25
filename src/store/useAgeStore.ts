import { create } from 'zustand';
import type { AgeResult, AgeState, WikiEvent } from '../types/age.types';

interface ExtendedAgeState extends AgeState {
  historicalFacts: WikiEvent[];
  isLoading: boolean;
  error: string | null;
  setHistoricalFacts: (facts: WikiEvent[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useAgeStore = create<ExtendedAgeState>((set) => ({
  birthDate: '',
  result: null,
  historicalFacts: [],
  isLoading: false,
  error: null,
  setBirthDate: (date) => set({ birthDate: date }),
  setResult: (result: AgeResult | null) => set({ result }),
  setHistoricalFacts: (facts) => set({ historicalFacts: facts }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    birthDate: '',
    result: null,
    historicalFacts: [],
    isLoading: false,
    error: null,
  }),
}));

export default useAgeStore;
