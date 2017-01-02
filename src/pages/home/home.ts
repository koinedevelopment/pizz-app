import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {MenuService} from '../../services/menu-service';
import {CategoryPage} from "../category/category";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // slides for slider
  public slides = [
    "assets/img/categories/fruit.jpg",
    "assets/img/categories/pizza.jpg",
    "assets/img/categories/sushi.jpg"
  ];

  // list of categories
  public categories: any;

  constructor(public nav: NavController, public menuService: MenuService) {
    // set data for categories
    this.categories = menuService.getAll();
  }

  // view a category
  viewCategory(categoryId) {
    this.nav.push(CategoryPage, {id: categoryId});
  }
}
