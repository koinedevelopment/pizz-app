import { PizzaDetalhesPage } from './../pizza-detalhes/pizza-detalhes';
import { DataService } from './../../services/data-service';
import { Sabor } from './../../model/sabor';
import { QrCode } from './../../model/qrcode';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import localForage from "localforage";
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the Salgadas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-salgadas',
  templateUrl: 'salgadas.html',
})
export class SalgadasPage {

  qrcode = new QrCode();
  sabores: FirebaseListObservable<any>;
  pedidos: FirebaseListObservable<any>; 
  user: User = new User();
  loading = true;
  loader;

  constructor(public nav: NavController, af: AngularFire, public alertCtrl: AlertController,
              public toastCtrl: ToastController, public dataService: DataService, public loadingCtrl: LoadingController) {

    localForage.getItem('qrcode').then(result => {

      /*this.loader = this.loadingCtrl.create({
        //content: "Logando",
      });
      this.loader.present();*/
      
      this.qrcode = result;

      this.pedidos = af.database.list('/pedidosPorPizzaria/'+this.qrcode.pizzariaID);    
    
      this.sabores = af.database.list('saboresPorPizzaria/'+this.qrcode.pizzariaID+'/sabores', {
        query: {
          orderByChild: 'tipo_disponivel',
          equalTo: 'true_salgada',
          }
      });
      this.sabores.subscribe(() => this.loading = false);

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
  }

  darUmPizz(sabor:any){
    this.pedidos.push({
      usuario:this.user.displayName,
      numeroMesa: this.qrcode.numeroMesa,
      pizzariaNome: this.qrcode.pizzariaNome,
      pizzariaKey: this.qrcode.pizzariaID,
      sabor: sabor,
      data: new Date().toString(),
      timestamp: new Date().getTime()
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
    let imagem = sabor.imageURL;
    if(sabor.imageURL == null || sabor.imageURL == ""){
      imagem = "assets/img/sem-foto.jpg";
    }
    let _sabor = {
        descricao: sabor.descricao,
        tipo: sabor.tipo,
        ingredientes: sabor.ingredientes,
        imageURL: imagem
    };
    this.dataService.sabor = _sabor;
    this.nav.push(PizzaDetalhesPage);
  }
}
