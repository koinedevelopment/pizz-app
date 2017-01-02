import { User } from './../model/user';
import { FireService } from './../services/fire-service';
import { QrcodePage } from './../pages/qrcode/qrcode';
import {Component, Inject} from '@angular/core';
import { Platform } from 'ionic-angular';
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

  public pages = [
    {
      title: 'Início',
      icon: 'ios-home-outline',
      count: 0,
      component: QrcodePage
    },

    {
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
    },
    // import menu


  ];

  constructor(public platform: Platform, @Inject(FirebaseApp) firebaseApp: firebase.app.App,
              public fire: FireService) {
    firebaseApp.auth().onAuthStateChanged(result =>{
      if(result){
        this.user = result;
        this.nav.setRoot(QrcodePage);
      }
      else{
        this.nav.setRoot(LoginPage);
      }
    })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Sair'){
      this.logout();
    }
    else if(page.title == 'Início'){
      this.nav.setRoot(page.component);
    }
    else{
      this.nav.push(page.component);
    }
  }

  // view my profile
  viewMyProfile() {
    this.nav.push(UserPage);
  }

  logout(){
    this.fire.logout().then(data => { 
      this.nav.setRoot(LoginPage);
    }, error => {
      console.log('error logout: '+error);
    })

}
}


