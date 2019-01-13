import { Component, OnInit } from '@angular/core';

import { Join } from '../../contracts/join';
import { JoinService } from '../../services/join.service';

@Component({
  selector: 'falkenheim-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  joinRequestToSubmit: Join = {
    date: { seconds: new Date().getSeconds() },
    name: '',
    mail: '',
    experience: false
  };

  constructor(private joinService: JoinService) {}

  ngOnInit() {}

  checkStatusOfElement(element: HTMLInputElement) {
    return (
      element.className.includes('ng-valid') ||
      element.className.includes('ng-pristine')
    );
  }

  onSubmit() {
    const dateToSubmit = new Date();
    this.joinRequestToSubmit.date.seconds = dateToSubmit.getTime() / 1000;
    this.joinService.setNewJoinRequest(this.joinRequestToSubmit).then(() => {
      console.log(
        'Vielen Dank für dein Interesse! Die Anfrage wurde erfolgreich versendet.'
      );
      this.clearJoinForm();
    });
  }

  clearJoinForm() {
    this.joinRequestToSubmit = {
      date: { seconds: new Date().getSeconds() },
      name: '',
      mail: '',
      experience: false
    };
  }
}
