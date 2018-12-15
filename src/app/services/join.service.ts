import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Join } from '../contracts/join';

@Injectable({
  providedIn: 'root'
})
export class JoinService {
  constructor(private db: AngularFirestore) {}

  setNewJoinRequest(join: Join): Promise<DocumentReference> {
    return this.db.collection<Join>('join').add(join);
  }
}
