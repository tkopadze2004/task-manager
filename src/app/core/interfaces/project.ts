import { Board } from './board';

export interface Project {
  id?: number;
  name: string;
  abbreviation: string;
  description: string;
  color: string;
  boards?: Board[];
}
