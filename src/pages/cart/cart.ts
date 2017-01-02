import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CartService} from '../../services/cart-service';
import {CheckoutPage} from "../checkout/checkout";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  // cart data
  public cart: any;

  constructor(public nav: NavController, public cartService: CartService) {
    // set sample data
    this.cart = cartService.getAll();
  }

  // plus quantity
  plusQty(item) {
    item.quantity++;
  }

  // minus quantity
  minusQty(item) {
    if (item.quantity > 1)
      item.quantity--;
  }

  // remove item from cart
  remove(index) {
    this.cart.items.splice(index, 1);
  }

  // click buy button
  buy() {
    this.nav.push(CheckoutPage);
  }
}
