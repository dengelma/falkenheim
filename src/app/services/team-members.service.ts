import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TeamMembers } from '../contracts/team-members';

@Injectable()
export class TeamMembersService {
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

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
          return from(teamMember).pipe(
            map(x => {
              x.editMode = false;
              return x;
            })
          );
        })
      );
  }

  addNewTeamMember(teamMember: TeamMembers): Promise<firebase.firestore.DocumentReference> {
    if (teamMember.image) {
      const path = `${teamMember.storagePath}${teamMember.firstName}_${teamMember.name}_${teamMember.number}`;
      const storageReference: AngularFireStorageReference = this.storage.ref(path);
      const uploadTask: AngularFireUploadTask = storageReference.put(teamMember.image);
      return uploadTask.then(() => {
        storageReference.getDownloadURL().subscribe(url => {
          teamMember.image = url;
          return this.db.collection<TeamMembers>('team-members').add(teamMember);
        });
      });
    } else {
      return this.db.collection<TeamMembers>('team-members').add(teamMember);
    }
  }

  editTeamMember(teamMember: TeamMembers): Promise<void> {
    if (teamMember.image && teamMember.image instanceof Object) {
      const path = `${teamMember.storagePath}${teamMember.firstName}_${teamMember.name}_${teamMember.number}`;
      const storageReference: AngularFireStorageReference = this.storage.ref(path);
      const uploadTask: AngularFireUploadTask = storageReference.put(teamMember.image);
      return uploadTask.then(() => {
        storageReference.getDownloadURL().subscribe(url => {
          teamMember.image = url;
          return this.db
            .collection<TeamMembers>('team-members')
            .doc(teamMember.id)
            .update(teamMember);
        });
      });
    } else {
      return this.db
        .collection<TeamMembers>('team-members')
        .doc(teamMember.id)
        .update(teamMember);
    }
  }

  deleteTeamMember(teamMember: TeamMembers): Promise<void> {
    return this.db
      .collection<TeamMembers>('team-members')
      .doc(teamMember.id)
      .delete();
  }
}
