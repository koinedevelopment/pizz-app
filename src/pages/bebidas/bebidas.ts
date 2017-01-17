import { QrcodePage } from './../qrcode/qrcode';
import { DataService } from './../../services/data-service';
import { PizzaDetalhesPage } from './../pizza-detalhes/pizza-detalhes';
import { QrCode } from './../../model/qrcode';
import { User } from './../../model/user';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
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
  saboresRef: FirebaseListObservable<any>;
  pedidos: FirebaseListObservable<any>; 
  user: User = new User();
  loading = true;
  saboresList = [];
  saboresFilter = [];
  
  constructor(public nav: NavController, af: AngularFire, public alertCtrl: AlertController,
              public toastCtrl: ToastController, public dataService: DataService, public zone: NgZone) {
    
    localForage.getItem('qrcode').then(result => {
      
      this.qrcode = result;

      this.pedidos = af.database.list('/pedidosPorPizzaria/'+this.qrcode.pizzariaID); 
    
      this.saboresRef = af.database.list('saboresPorPizzaria/'+this.qrcode.pizzariaID+'/sabores', {
        query: {
          orderByChild: 'tipo_disponivel',
          equalTo: 'true_bebida',
          },
        preserveSnapshot: true
      });
      this.saboresRef.subscribe(snapshots => {
        this.loading = false;

        let _sabores = [];
        snapshots.forEach(snapshot => {
          _sabores.push(snapshot.val());
        });       
        this.saboresFilter = _sabores;
        this.saboresList = _sabores;
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
  }

  darUmPizz(sabor:any){
    this.pedidos.push({
      usuario:this.user.displayName,
      numeroMesa: this.qrcode.numeroMesa,
      pizzariaNome: this.qrcode.pizzariaNome,
      pizzariaKey: this.qrcode.pizzariaID, 
      sabor: sabor,
      timestamp: new Date().getTime(),
      atendido: false
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
    this.dataService.displayName = this.user.displayName;
    this.dataService.numeroMesa = this.qrcode.numeroMesa;
    this.dataService.pizzariaID = this.qrcode.pizzariaID;
    this.dataService.pizzariaNome = this.qrcode.pizzariaNome;
    this.dataService.sabor = _sabor;
    this.nav.push(PizzaDetalhesPage);
  }

  initializeItems() {
    this.saboresFilter = this.saboresList; 
  }

  getItems(ev: any) {    
    this.initializeItems();
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.saboresFilter = this.saboresFilter.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }    
  }

  confirmacaoSairMesa() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja mesmo sair da mesa?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            localForage.setItem('qrcode', "").then(result => {
              this.zone.run(() => {
                this.nav.setRoot(QrcodePage);
              });
            }, error => {
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
