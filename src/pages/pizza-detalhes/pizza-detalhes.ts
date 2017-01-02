import { DataService } from './../../services/data-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PizzaDetalhes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pizza-detalhes',
  templateUrl: 'pizza-detalhes.html'
})
export class PizzaDetalhesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PizzaDetalhesPage');
    //console.log('dataService-PizzaDetalhesPage: '+this.dataService.sabor.descricao);
  }

}
