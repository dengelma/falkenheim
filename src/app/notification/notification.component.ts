import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'falkenheim-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isShown = false;

  textToDisplay = 'Hier könnte ihre Werbung stehen';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification: Notification) => {
      this.isShown = notification.isShown;
      this.textToDisplay = notification.text;
    });
  }
}
