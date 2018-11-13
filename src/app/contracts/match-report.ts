export interface MatchReport {
  date: string;
  /*date: Date;*/
  match: string;
  report: string;
  participating: string;
  prevented?: string;
  supervisor?: string;
  link?: string;
}
