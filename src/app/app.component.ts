import { Component } from '@angular/core';

@Component({
  selector: 'falkenheim-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contentClicked = false;

  constructor() {}

  emitClick() {
    this.contentClicked = !this.contentClicked;
  }
}
