import { Component } from '@angular/core';

import { Join } from '../../contracts/join';
import { JoinService } from '../../services/join.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'falkenheim-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  joinRequestToSubmit: Join = {
    date: { seconds: new Date().getSeconds() },
    name: '',
    mail: '',
    experience: false
  };

  constructor(private joinService: JoinService, private notificationService: NotificationService) {}

  public checkStatusOfElement(element: HTMLInputElement): boolean {
    return element.className.includes('ng-valid') || element.className.includes('ng-pristine');
  }

  public onSubmit(): void {
    const dateToSubmit = new Date();
    this.joinRequestToSubmit.date.seconds = dateToSubmit.getTime() / 1000;
    this.joinService.setNewJoinRequest(this.joinRequestToSubmit).then(() => {
      this.notificationService.showNotification('Vielen Dank für dein Interesse! Die Anfrage wurde erfolgreich versendet.');
      this.clearJoinForm();
    });
  }

  private clearJoinForm(): void {
    this.joinRequestToSubmit = {
      date: { seconds: new Date().getSeconds() },
      name: '',
      mail: '',
      experience: false
    };
  }
}
