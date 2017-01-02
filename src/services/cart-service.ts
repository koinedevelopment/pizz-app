import {Injectable} from "@angular/core";
import {CART} from "./mock-cart";

@Injectable()
export class CartService {
  private cart: any;

  constructor() {
    this.cart = CART;
  }

  getAll() {
    return this.cart;
  }
}
