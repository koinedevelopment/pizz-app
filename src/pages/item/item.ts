import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import {ItemService} from '../../services/item-service';
import {CartPage} from "../cart/cart";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  // item object
  public item: any;

  constructor(public nav: NavController, public itemService: ItemService, public alertController: AlertController) {
    // get sample data for item
    this.item = itemService.getItem(1);
  }

  // toggle favorite
  toggleFav(item) {
    item.faved = !item.faved;
  }

  // add item to cart
  addCart() {
    let prompt = this.alertController.create({
      title: 'Quanity',
      message: "",
      inputs: [
        {
          name: 'quantity',
          value: '1'
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
            // go to cart
            this.nav.setRoot(CartPage);
          }
        }
      ]
    });

    prompt.present();
  }
}
