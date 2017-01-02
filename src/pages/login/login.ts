import { QrcodePage } from './../qrcode/qrcode';
import { FireService } from './../../services/fire-service';
import {Component} from '@angular/core';
import {RegisterPage} from "../register/register";
import {HomePage} from "../home/home";
import {NavController, Events, LoadingController, AlertController} from 'ionic-angular';
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
 
  constructor(public nav: NavController, public fire: FireService, public events: Events,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public storage:Storage) {
        this.events.subscribe('login-event', user =>{
          //this.user = user[0];
          //this.loader.dismiss();   
          //this.navCtrl.setRoot(HomePage);
        })                 
  }

  ionViewDidLoad() {
    /*firebase.auth().onAuthStateChanged(result =>{
      if(result){
        console.log('logado');
      }
      else{
        console.log('não logado');
      }
    })*/
  }  

  // go to register page
  register() {
    this.nav.push(RegisterPage);
  }

  // login and go to home page
  login() {
    //this.nav.setRoot(QrcodePage);
  }

  loginWithFacebook(){
    console.log('loginWithFacebook');
    /*this.loader = this.loadingCtrl.create({
      content: "Logando",
    });
    this.loader.present();*/
    this.fire.loginWithFacebook();
    
  }

  loginWithGoogle(){
    console.log('loginWithGoogle');
    /*this.loader = this.loadingCtrl.create({
      content: "Logando",
    });
    this.loader.present();*/
    this.fire.loginWithGoogle();
  }
}
