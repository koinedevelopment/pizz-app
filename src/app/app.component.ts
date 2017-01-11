import { DataService } from './../services/data-service';
import { User } from './../model/user';
import { FireService } from './../services/fire-service';
import { QrcodePage } from './../pages/qrcode/qrcode';
import {Component, Inject} from '@angular/core';
import { Platform, Events, AlertController } from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';

import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';

// import pages
import {HomePage} from '../pages/home/home';
import {CategoriesPage} from '../pages/categories/categories';
import {FavoritePage} from '../pages/favorite/favorite';
import {CartPage} from '../pages/cart/cart';
import {OfferPage} from '../pages/offer/offer';
import {UserPage} from '../pages/user/user';
import {SettingPage} from '../pages/setting/setting';
import {NewsPage} from '../pages/news/news';
import {AboutPage} from '../pages/about/about';
import {LoginPage} from '../pages/login/login';
import {ChatsPage} from '../pages/chats/chats';
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  user: User = new User();

  inicializacao:boolean = true;

  public pages = [
    {
      title: 'Início',
      icon: 'ios-home-outline',
      count: 0,
      component: QrcodePage
    },

    {
      title: 'Minha Conta',
      icon: 'ios-person-outline',
      count: 0,
      component: UserPage
    }

    /*{
      title: 'Configurações',
      icon: 'ios-settings-outline',
      count: 0,
      component: SettingPage
    },

    {
      title: 'Sobre o Pizz',
      icon: 'ios-information-circle-outline',
      count: 0,
      component: AboutPage
    },

    {
      title: 'Sair',
      icon: 'ios-exit-outline',
      count: 0,
    },*/
    // import menu


  ];

  constructor(public platform: Platform, @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public fire: FireService, public events: Events, public alertCtrl: AlertController,
              public data: DataService) {
    firebaseApp.auth().onAuthStateChanged(result =>{
      if(result){
        this.inicializacao = false;
        if(result.emailVerified == true){
          this.user = result;        
          this.nav.setRoot(QrcodePage);
        }
        else{
          this.logout();
          //this.nav.setRoot(LoginPage);
        }        
      }
      else if(this.inicializacao){
        this.inicializacao = false;
        this.nav.setRoot(LoginPage);
      }
    })
    
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
  
  openPage(page) {
    if(page.title == 'Início'){
      this.nav.setRoot(page.component);
    }
    else{
      this.nav.push(page.component);
    }
  }

  viewMyProfile() {
    this.nav.push(UserPage);
  }

  logout(){
    this.fire.logout().then(data => { 
      if(this.data.createUser){
        this.showAlert('Confirmação de Cadastro','Foi enviado um link de ativação para seu email.');
      }
      else{
        this.showAlert('Erro de autenticação','Verifique seu endereço de email para confirmar sua conta e liberar o acesso ao aplicativo.');
      }
      this.data.createUser = false;
      //this.events.publish('login-erro', "Verifique seu endereço de email para confirmar sua conta.");
    }, error => {
      console.log('error logout: '+error);
    })
  }

  //refatorar depois
  showAlert(titulo:string, mensagem:string){
    let alert = this.alertCtrl.create({
      title: ''+titulo,
      subTitle: ''+mensagem,
      buttons: ['OK']
    });
    alert.present();
  }
  
}


