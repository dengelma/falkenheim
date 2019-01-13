export interface MatchReport {
  id?: string;
  date: number;
  match: string;
  result: string;
  report: string;
  participating: string;
  prevented?: string;
  supervisor?: string;
  link?: string;
  editMode?: boolean;
}
