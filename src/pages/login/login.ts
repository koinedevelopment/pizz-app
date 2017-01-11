import { DataService } from './../../services/data-service';
import { QrcodePage } from './../qrcode/qrcode';
import { FireService } from './../../services/fire-service';
import {Component} from '@angular/core';
import {RegisterPage} from "../register/register";
import {HomePage} from "../home/home";
import { NavController, Events, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loader;
  email:string = "";
  senha:string = "";

  constructor(public nav: NavController, public fire: FireService, public events: Events,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public storage:Storage, public toastCtrl: ToastController, public data: DataService) {   
  }

  ionViewDidLoad() {
  }  

  register() {
    this.nav.push(RegisterPage);
  }

  loginWithEmailAndPassword(){
    if(this.email != "" && this.senha != ""){
      this.fire.loginWithEmailAndPassword(this.email, this.senha);    
    }
  }

  loginWithFacebook(){
    this.fire.loginWithFacebook();
    
  }

  loginWithGoogle(){
    this.fire.loginWithGoogle();
  }
}
