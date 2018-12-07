import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatchReport } from '../contracts/match-report';

@Injectable()
export class MatchReportService {
  constructor(private db: AngularFirestore) {}

  getMatchReports() {
    return this.db.collection<MatchReport>('match-reports').valueChanges();
  }

  setNewMatchReport(matchReport: MatchReport) {
    this.db.collection<MatchReport>('match-reports').add(matchReport);
  }
}
