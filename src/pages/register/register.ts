import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public nav: NavController) {
  }

  // register and go to home page
  register() {
    this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
