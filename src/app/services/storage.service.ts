import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private afStorage: AngularFireStorage) {}

  upload(event): Observable<number> {
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    const ref = this.afStorage.ref(randomId);
    const task = ref.put(event.target.files[0]);
    return task.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
  }
}
