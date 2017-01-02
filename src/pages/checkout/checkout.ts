import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  constructor(public nav: NavController, public alertController: AlertController) {
  }

  // edit address
  editAddress() {
    let prompt = this.alertController.create({
      title: 'Address',
      message: "",
      inputs: [
        {
          name: 'address',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    prompt.present();
  }

  // place order button click
  buy() {
    // show alert
    let alert = this.alertController.create({
      title: 'Info',
      subTitle: 'Your order has been sent.',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            // back to home page
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });

    alert.present();
  }
}
