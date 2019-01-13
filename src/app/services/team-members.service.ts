import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TeamMembers } from '../contracts/team-members';

@Injectable()
export class TeamMembersService {
  constructor(private db: AngularFirestore) {}

  getTeamMembers(): Observable<TeamMembers> {
    return this.db
      .collection<TeamMembers>('team-members')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        }),
        switchMap(teamMember => {
          return from(teamMember);
        }),
        map(teamMember => {
          teamMember.editMode = false;
          return teamMember;
        })
      );
  }

  addNewTeamMember(teamMember: TeamMembers): Promise<firebase.firestore.DocumentReference> {
    return this.db.collection<TeamMembers>('team-members').add(teamMember);
  }

  editTeamMember(teamMember: TeamMembers): Promise<void> {
    return this.db
      .collection<TeamMembers>('team-members')
      .doc(teamMember.id)
      .update(teamMember);
  }
}
