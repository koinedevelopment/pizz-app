import {Injectable} from "@angular/core";
import {MENU} from "./mock-menu";

@Injectable()
export class MenuService {
  private menu: any;

  constructor() {
    this.menu = MENU;
  }

  getAll() {
    return this.menu;
  }

  getItem(id) {
    for (var i = 0; i < this.menu.length; i++) {
      if (this.menu[i].id === parseInt(id)) {
        return this.menu[i];
      }
    }
    return null;
  }

  remove(item) {
    this.menu.splice(this.menu.indexOf(item), 1);
  }
}
