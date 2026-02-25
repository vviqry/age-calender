// Hasil kalkulasi umur
export interface AgeResult {
  years: number;
  months: number;
  days: number;
}

// State Zustand
export interface AgeState {
  birthDate: string;
  result: AgeResult | null;
  setBirthDate: (date: string) => void;
  setResult: (result: AgeResult | null) => void;
  reset: () => void;
}

// Wikipedia API response types
export interface WikiEvent {
  text: string;
  year: number;
  pages: WikiPage[];
}

export interface WikiPage {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls: {
    desktop: { page: string };
    mobile: { page: string };
  };
}

export interface WikiResponse {
  events: WikiEvent[];
}

// Form input
export interface DateInput {
  day: number;
  month: number;
  year: number;
}
