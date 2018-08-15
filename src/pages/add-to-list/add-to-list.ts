import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { shoppingItem} from '../../models/shopping-item';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

/**
 * Generated class for the AddToListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-to-list',
  templateUrl: 'add-to-list.html',
})
export class AddToListPage {
  shoppingItem = {} as shoppingItem;
  shoppingItemRef$: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: shoppingItem){
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemQuantity: Number(this.shoppingItem.itemQuantity)
    });
    this.shoppingItem = {} as shoppingItem
    this.navCtrl.pop();
  }
}
