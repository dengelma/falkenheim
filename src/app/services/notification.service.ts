import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  isShown: boolean;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification: Notification = {
    isShown: false,
    text: 'Hier könnte Ihr Text stehen'
  };

  private notification$$ = new BehaviorSubject<Notification>(this.notification);
  public notification$: Observable<Notification>;

  constructor() {
    this.notification$ = this.notification$$.asObservable();
  }

  showNotification(text: string, timeout: number = 3000) {
    this.notification.text = text;
    this.notification.isShown = true;

    this.notification$$.next({
      isShown: true,
      text: text
    });

    setTimeout(() => {
      this.notification$$.next({
        isShown: false,
        text: text
      });
    }, timeout);
  }
}
