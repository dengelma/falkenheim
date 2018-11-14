
export interface MatchReport {
  date: {seconds: number};
  match: string;
  report: string;
  participating: string;
  prevented?: string;
  supervisor?: string;
  link?: string;
}
