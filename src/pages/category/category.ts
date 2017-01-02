import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CategoryService} from '../../services/category-service';
import {ItemPage} from "../item/item";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  // category object
  public category: any;

  constructor(public nav: NavController, public categoryService: CategoryService) {
    // get first category as sample data
    this.category = categoryService.getItem(1);
  }

  // view item detail
  viewItem(id) {
    this.nav.push(ItemPage, {id: id})
  }
}
