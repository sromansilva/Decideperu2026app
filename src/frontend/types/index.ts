// Types for the DecidePerú 2026 application

export type Screen = 
  | 'auth'
  | 'home' 
  | 'calendar' 
  | 'candidates' 
  | 'candidate-profile' 
  | 'government-plan' 
  | 'voter-info' 
  | 'poll-workers' 
  | 'news' 
  | 'news-detail' 
  | 'profile';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  logo: string;
  image: string;
  slogan: string;
  category: 'presidency' | 'congress' | 'regional';
  votes?: number;
  percentage?: number;
  proposals?: string[];
  experience?: Array<{
    year: string;
    position: string;
    organization: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  date: string;
  category: string;
  image: string;
  verified: boolean;
}

export interface Event {
  title: string;
  date: string;
  fullDate?: string;
  description?: string;
  location?: string;
  time?: string;
  participants?: string;
  icon: any;
  color: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'event';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
}

export interface GovernmentPlanSection {
  id: string;
  title: string;
  icon: any;
  proposals: string[];
  budget?: string;
  timeline?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  dni?: string;
  avatar?: string;
  votingStatus: 'habilitado' | 'pendiente' | 'inhabilitado';
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}