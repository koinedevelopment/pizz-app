import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { CardapioPage } from './../cardapio/cardapio';
import { DataService } from './../../services/data-service';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

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

  pedidos: FirebaseListObservable<any>; 

  constructor(public nav: NavController, public navParams: NavParams, public dataService: DataService,
              public zone: NgZone, public alertCtrl: AlertController, public af: AngularFire, public toastCtrl: ToastController) {

    this.pedidos = af.database.list('/pedidosPorPizzaria/'+this.dataService.pizzariaID);  
  }

  ionViewDidLoad() {
  }

  darUmPizz(sabor:any){
    this.pedidos.push({
      usuario:this.dataService.displayName,
      numeroMesa: this.dataService.numeroMesa,
      pizzariaNome: this.dataService.pizzariaNome,
      pizzariaKey: this.dataService.pizzariaID,
      sabor: sabor,
      timestamp: new Date().getTime(),
      atendido: false
    });
    this.zone.run(() => {
        this.nav.setRoot(CardapioPage);
    });
    this.presentToast();
  }

  confirmacaoPedido(sabor:any) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmação da Solicitação',
      message: 'Confirma o pedido de '+sabor+' ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.darUmPizz(sabor);
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Pedido enviado.',
      duration: 3000
    });
    toast.present();
  }
}
