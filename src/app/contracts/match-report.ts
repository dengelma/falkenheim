export interface MatchReport {
  id?: string;
  date: { seconds: number };
  match: string;
  report: string;
  participating: string;
  prevented?: string;
  supervisor?: string;
  link?: string;
  editMode?: boolean;
}
