import { DataService } from './../../services/data-service';
import { PizzaDetalhesPage } from './../pizza-detalhes/pizza-detalhes';
import { QrCode } from './../../model/qrcode';
import { User } from './../../model/user';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import localForage from "localforage";
import * as firebase from 'firebase';

/*
  Generated class for the Bebidas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bebidas',
  templateUrl: 'bebidas.html'
})
export class BebidasPage {

  qrcode = new QrCode();
  sabores: FirebaseListObservable<any>;
  pedidos: FirebaseListObservable<any>; 
  user: User = new User();
  
  constructor(public nav: NavController, af: AngularFire, public alertCtrl: AlertController,
              public toastCtrl: ToastController, public dataService: DataService) {
    
    localForage.getItem('qrcode').then(result => {
      
      this.qrcode = result;

      this.pedidos = af.database.list('/pedidos');
    
      this.sabores = af.database.list('saboresPorPizzaria/'+this.qrcode.pizzariaID+'/sabores', {
        query: {
          orderByChild: 'tipo_disponivel',
          equalTo: 'true_bebida',
          }
      });

    }, error => {
      console.log('getItem: '+error);
    })

    firebase.auth().onAuthStateChanged(result =>{
      if(result){
        this.user = result;
      }
    })
  }

  ionViewDidLoad() {
    console.log('Hello BebidasPage Page');
  }

  darUmPizz(sabor:any){
    this.pedidos.push({
      usuario:this.user.displayName,
      mesa: this.qrcode.numeroMesa,
      pizzariaNome: this.qrcode.pizzariaNome,
      pizzariaID: this.qrcode.pizzariaID, 
      sabor: sabor,
      data: new Date().toString()
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

  exibirDetalhes(sabor: any){
    let _sabor = {
        descricao: sabor.descricao,
        tipo: sabor.tipo,
        ingredientes: sabor.ingredientes,
        imageURL: sabor.imageURL
    };
    this.dataService.sabor = _sabor;
    this.nav.push(PizzaDetalhesPage);
  }
}