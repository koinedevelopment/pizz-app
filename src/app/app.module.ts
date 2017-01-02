import { PizzaDetalhesPage } from './../pages/pizza-detalhes/pizza-detalhes';
import { DataService } from './../services/data-service';
import { BebidasPage } from './../pages/bebidas/bebidas';
import { DocesPage } from './../pages/doces/doces';
import { SalgadasPage } from './../pages/salgadas/salgadas';
import { CardapioPage } from './../pages/cardapio/cardapio';
import { QrcodePage } from './../pages/qrcode/qrcode';
import { FireService } from './../services/fire-service';
import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {AngularFireModule} from 'angularfire2';
import { Storage } from '@ionic/storage';

// import services
import {MenuService} from '../services/menu-service';
import {CategoryService} from '../services/category-service';
import {ItemService} from '../services/item-service';
import {CartService} from '../services/cart-service';
import {PostService} from '../services/post-service';
import {ChatService} from '../services/chat-service';
// end import services
// end import services

// import pages
import {AboutPage} from '../pages/about/about';
import {AddressPage} from '../pages/address/address';
import {CartPage} from '../pages/cart/cart';
import {CategoriesPage} from '../pages/categories/categories';
import {CategoryPage} from '../pages/category/category';
import {ChatDetailPage} from '../pages/chat-detail/chat-detail';
import {ChatsPage} from '../pages/chats/chats';
import {CheckoutPage} from '../pages/checkout/checkout';
import {FavoritePage} from '../pages/favorite/favorite';
import {HomePage} from '../pages/home/home';
import {ItemPage} from '../pages/item/item';
import {LoginPage} from '../pages/login/login';
import {NewsPage} from '../pages/news/news';
import {OfferPage} from '../pages/offer/offer';
import {RegisterPage} from '../pages/register/register';
import {SettingPage} from '../pages/setting/setting';
import {UserPage} from '../pages/user/user';
// end import pages

export const firebaseConfig = {
  apiKey: "AIzaSyAIMHqUTlyxobJgz6vFP2fAe5AJ17KCg-A",
  authDomain: "pizz-cc946.firebaseapp.com",
  databaseURL: "https://pizz-cc946.firebaseio.com",
  storageBucket: "pizz-cc946.appspot.com",
  messagingSenderId: "229381592184"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    CheckoutPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
    QrcodePage,
    CardapioPage,
    SalgadasPage,
    DocesPage,
    BebidasPage,
    PizzaDetalhesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false,
      //tabsPlacement: 'top',
      tabsHideOnSubPages: true
    }),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    CheckoutPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
    QrcodePage,
    CardapioPage,
    SalgadasPage,
    DocesPage,
    BebidasPage,
    PizzaDetalhesPage
  ],
  providers: [
    MenuService,
    CategoryService,
    ItemService,
    CartService,
    PostService,
    ChatService,
    FireService,
    //{provide: Storage, useFactory: provideStorage}
    Storage,
    DataService
    /* import services */
  ]
})
export class AppModule {
}
