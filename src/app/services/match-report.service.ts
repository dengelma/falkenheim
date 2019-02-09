import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MatchReport } from '../contracts/match-report';

@Injectable()
export class MatchReportService {
  constructor(private db: AngularFirestore) {}

  getMatchReports(): Observable<MatchReport> {
    return this.db
      .collection<MatchReport>('match-reports')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }),
        switchMap(matchReports => {
          return from(matchReports);
        }),
        map(matchReport => {
          matchReport.editMode = false;
          return matchReport;
        })
      );
  }

  setNewMatchReport(
    matchReport: MatchReport
  ): Promise<firebase.firestore.DocumentReference> {
    return this.db.collection<MatchReport>('match-reports').add(matchReport);
  }

  editMatchReport(matchReport: MatchReport): Promise<void> {
    return this.db
      .collection<MatchReport>('match-reports')
      .doc(matchReport.id)
      .update(matchReport);
  }
}
