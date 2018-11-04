import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'falkenheim-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  linkContainer: boolean[] = [false, false];

  constructor() {}

  ngOnInit() {}

  openLinkContainer(position: number) {
    for (let i = 0; i <= this.linkContainer.length - 1; i++) {
      if (position === i) {
        this.linkContainer[i] = !this.linkContainer[i];
      } else {
        this.linkContainer[i] = false;
      }
    }
  }
}
