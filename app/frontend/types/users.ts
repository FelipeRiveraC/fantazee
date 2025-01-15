import { createRoot } from 'react-dom/client';
import type { TravelEvaluation } from 'types/travels';
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  travel_evaluations: TravelEvaluation[];
}