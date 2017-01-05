import { QrCode } from './../../model/qrcode';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { CardapioPage } from './../cardapio/cardapio';
import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import localForage from "localforage";
import * as firebase from 'firebase';

/*
  Generated class for the Qrcode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html'
})
export class QrcodePage {
  
  qrcode = new QrCode();
  _qrcode = {};
  user;
  loader;

  constructor(public nav: NavController, public alertCtrl:AlertController, 
              public zone: NgZone, public af: AngularFire, public loadingCtrl: LoadingController) {   
      localForage.getItem('qrcode').then(result => {
        this.qrcode = result;
        if(this.qrcode != null && this.qrcode !== ""){
          this.showConfirm();
        }
      }, error => {
        console.log('getItem: '+error);
      })  
  }

  ionViewDidLoad() {     
    
  }
  
  scannear(){
    BarcodeScanner.scan().then((barcodeData) => {
      if(barcodeData.text != null && barcodeData.text !== ""){ 
        this.loader = this.loadingCtrl.create({
          content: "Localizando Mesa",
        });
        this.loader.present();  
        let values = barcodeData.text.split('|');
        let mesas = firebase.database().ref('/mesasPorPizzaria/'+values[0]+'/'+values[1]);
        mesas.on('value', snap =>{
          if(snap.val() != null){
            this._qrcode = {
                    numeroMesa: snap.val().numeroMesa,
                    pizzariaID: values[0],
                    pizzariaNome: snap.val().pizzariaNome
                  };
            this.qrcode = this._qrcode;
            localForage.setItem('qrcode', this.qrcode).then(result => {
                    this.loader.dismiss();
                    this.zone.run(() => {
                        this.nav.setRoot(CardapioPage);
                    });
                  }, error => {
                    console.log('localForage.setItem: '+error);
                  })
          }
          else{
            this.loader.dismiss();
            alert('Código inválido. Procurar a administração da pizzaria.');
          }
        });
      }
    }, (err) => {
      console.log('BarcodeScanner.scan().then: '+err);
    })    
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Você está no mesmo lugar?',
      message: 'Identificamos sua última localização na pizzaria/mesa '+this.qrcode.pizzariaNome+'/'+
                this.qrcode.numeroMesa+'. Você ainda se encontra nela?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            localForage.setItem('qrcode', "").then(result => {
            }, error => {
            })
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.zone.run(() => {
              this.nav.setRoot(CardapioPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
