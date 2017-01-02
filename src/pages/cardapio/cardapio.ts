import { BebidasPage } from './../bebidas/bebidas';
import { DocesPage } from './../doces/doces';
import { SalgadasPage } from './../salgadas/salgadas';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Cardapio page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html'
})
export class CardapioPage {
  tab1Root: any = SalgadasPage;
  tab2Root: any = DocesPage;
  tab3Root: any = BebidasPage;

  constructor() {}

  ionViewDidLoad() {
  }  
}
