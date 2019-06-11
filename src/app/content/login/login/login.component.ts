import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { Login } from '../../../contracts/login';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'falkenheim-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginCredentials: Login = {
    mail: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService, private location: Location) {}

  public login(): void {
    this.authenticationService.signInEmailPassword(this.loginCredentials.mail, this.loginCredentials.password).then(result => {
      if (result) {
        this.location.back();
      } else {
        console.log('Das war wohl nix...');
      }
    });
  }

  public checkStatusOfElement(element: HTMLInputElement): boolean {
    return element.className.includes('ng-valid') || element.className.includes('ng-pristine');
  }
}
