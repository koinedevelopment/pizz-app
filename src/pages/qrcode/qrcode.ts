import { QrCode } from './../../model/qrcode';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { CardapioPage } from './../cardapio/cardapio';
import { Component, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

  constructor(public nav: NavController, public alertCtrl:AlertController, 
              public zone: NgZone, public af: AngularFire) {       
    //this.mesas = af.database.list('/mesas', { preserveSnapshot: true});
  }

  ionViewDidLoad() {
    localForage.getItem('qrcode').then(result => {
      this.qrcode = result;
      if(this.qrcode != null && this.qrcode !== ""){
        this.showConfirm();
      }
    }, error => {
      console.log('getItem: '+error);
    })    
  }
  
  scannear(){
    BarcodeScanner.scan().then((barcodeData) => {
      if(barcodeData.text != null && barcodeData.text !== ""){   
        let values = barcodeData.text.split('|');
        let mesas = firebase.database().ref('/mesasPorRestaurante/'+values[0]+'/'+values[1]);
        mesas.on('value', snap =>{
          if(snap.val() != null){
            this._qrcode = {
                    numeroMesa: snap.val().numero,
                    pizzariaID: values[0],
                    pizzariaNome: snap.val().pizzariaNome
                  };
            this.qrcode = this._qrcode;
            localForage.setItem('qrcode', this.qrcode).then(result => {
                    this.zone.run(() => {
                        this.nav.setRoot(CardapioPage);
                    });
                  }, error => {
                    console.log('localForage.setItem: '+error);
                  })
          }
          else{
            alert('Código inválido. Procurar a administração da pizzaria.');
            /*localForage.setItem('qrcode', "").then(result => {
            }, error => {
            })*/
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
