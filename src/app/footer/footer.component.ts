import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'falkenheim-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
  }
}
