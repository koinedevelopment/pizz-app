import { LoginPage } from './../login/login';
import { FireService } from './../../services/fire-service';
import { User } from './../../model/user';
import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  user: User = new User();

  constructor(public nav: NavController, public fire: FireService, public alertCtrl: AlertController) {
    firebase.auth().onAuthStateChanged(result =>{
      if(result){
        this.user = result;
      }
    })
  }

  logout(){
    this.fire.logout().then(data => { 
      this.nav.setRoot(LoginPage);
    }, error => {
      console.log('error logout: '+error);
    })
  }

  confirmacaoLogout(sabor:any) {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Deseja mesmo desconectar da conta?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }
}
